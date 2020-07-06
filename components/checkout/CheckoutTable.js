import { Button, Divider, Flex, Icon, Link, Stack, Spinner, Collapse, Tooltip, Box } from '@chakra-ui/core'
import { Chip } from '@material-ui/core'
import { observer } from 'mobx-react'
import { Document } from 'firestorter'
import { observable } from 'mobx'
import moment from 'moment'
import { ButtonLink } from '../experimental'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { sessions } from '../../stores/SessionStore'
import { ROUTES } from 'constants/routes'
import { toDto, Session } from '../../models'
import { CheckoutStatus } from 'constants'
import { notify } from 'components/experimental/Toasts'

// <CheckoutTable /> is a class component that has a live connection to the firebase
// 'sessions' Collection. It is an inexpensive reactive component that displays the
// documents available through a paginated table. It is reactive so that when somebody
// else is editing a document, you will see the table update with the status change.
// It is the springboard for checking out a document, unlocking, or uploading a new
// document to firestore for editing. It is also offers a way to download documents.


// Using a dynamic import with `ssr: false` option fixes most Mui issues
const MaterialTable = dynamic(() => import('material-table'),
    { ssr: false, loading: () => <Spinner /> }
)

const columns = [
    { field: 'Icon', searchable: false, export: false, render: () => <Icon maxW={20} name="calendar" /> },
    { title: 'Document', field: 'title', type: 'string', searchable: true },
    { title: 'Status', field: 'status', type: 'string', searchable: false, render: row => <StatusChip status={row.status} /> },
    { title: 'Last Edited', field: 'date_modified', type: 'string', searchable: false },
    { title: 'Author', field: 'author', type: 'string', searchable: false },
    { title: 'Uploaded', field: 'date_uploaded', type: 'string', searchable: false, hidden: true },
    { title: 'Cloud Location', field: 'docx', type: 'string', searchable: false, hidden: true },
    { title: 'Slug', field: 'slug', searchable: false, hidden: true },
    { title: 'Excerpt', field: 'excerpt', searchable: false, hidden: true },
    { title: 'ID', field: 'id', searchable: false, hidden: true },
]

const DEFAULT_AUTHOR = 9;
const queryLimit = 10;

export const CheckoutTable = observer(() => {
    const { isLoading, hasDocs } = sessions;

    let tableData = []

    if (hasDocs) {

        // Make an empty table when there are no documents that match a query
        const docsButNoData = sessions.docs.some(doc => !doc.hasData)
        if (docsButNoData) {
            tableData = new Array(5)
        }

        // Modify data coming from Firebase and make a data array for the table
        sessions.docs.reduce((array, doc, idx) => {
            let { id, data } = doc
            let { status, date_modified, date_uploaded, contributors } = data
            // console.log('contributors :>> ', contributors);
            let now = moment()
            if (date_modified) {
                date_modified = moment.unix(date_modified.seconds)
                date_modified = moment.duration(date_modified.diff(now))
                date_modified = date_modified.humanize(true)
            }
            if (date_uploaded) {
                date_uploaded = moment.unix(date_uploaded.seconds)
                date_uploaded = moment.duration(date_uploaded.diff(now))
                date_uploaded = date_uploaded.humanize(true)
            }
            // status = status || 'in-progress'
            array.push({
                ...data,
                id,
                status,
                date_modified,
                date_uploaded,
                author: contributors,
            })
            return array //!important, return the final data set for the table            
            // .filter(s => s.authorId === DEFAULT_AUTHOR) // Works, but would like this as a .query =ref=>... down the road.
        }, tableData)
    }

    return (
        <MaterialTable
            title="Checkout"
            data={tableData}
            columns={columns}
            isLoading={isLoading}
            detailPanel={row => <TableDetails {...row} />}
            options={{
                pageSize: 7,
                pageSizeOptions: [5, 7, 10],
                selection: false,
                draggable: true,
                grouping: false,
                exportButton: true,
                exportAllData: true,
                exportFileName: `TPOT Letters ${new Date().toDateString()}`,
                columnsButton: false,
                detailPanelType: 'single',
                detailPanelColumnAlignment: 'right',
                emptyRowsWhenPaging: false,
                showSelectAllCheckbox: false,
                showTextRowsSelected: false,
            }}
            localization={{
                toolbar: {
                    exportTitle: 'Export Table',
                    exportName: 'Save as CSV',
                    searchTooltip: 'Search by Document Name',
                    searchPlaceholder: 'Search'
                }
            }}
            actions={[
                {
                    isFreeAction: true,
                    tooltip: 'Refresh Table',
                    icon: 'refresh',
                    onClick: () => console.log('refresh')
                },
            ]}
        />
    )
})

const TableDetails = ({ id, slug, excerpt, docx, date_uploaded, filename, status }) => {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()

    console.log('status :>> ', status);

    useEffect(() => {
        const timer = setTimeout(() => setIsOpen(true), 0)
        return () => clearTimeout(timer)
    }, []);

    const checkout = async () => {
        let document = new Document(`sessions/${id}`, { mode: 'off' });
        await document.fetch()

        if (document.hasData && document.status !== 'checked-out') {
            await document.update({
                status: "checked-out"
            })
        }
        router.push(ROUTES.DOC(id))
    }

    const unlock = async () => {
        let document = new Document(`sessions/${id}`, { mode: 'off' });
        await document.fetch()

        if (document.hasData) {
            await document.update({
                status: "in-progress"
            })
        }

        notify("Document successfully unlocked.  You may now check it out", 'success');
    }

    return (
        <Collapse isOpen={isOpen} alignContent="center" transition="all 1s ease-in-out">
            <Flex justifyContent="center">
                <Flex height={150} flexGrow={1} maxW={800} px={6} py={2}>
                    <Stack w="50%">
                        <Stack direction="row">
                            <Box minW="80px" fontWeight="bold">Slug</Box>
                            <Box>{slug}</Box>
                        </Stack>
                        <Stack direction="row">
                            <Box minW="80px" fontWeight="bold">Excerpt</Box>
                            <Box overflowX="hidden" overflowY="scroll">{excerpt}</Box>
                        </Stack>
                    </Stack>
                    <Divider orientation="vertical" m={4} />
                    <Stack w="50%">
                        <Stack direction="row">
                            <Box minW="80px" fontWeight="bold">Document</Box>
                            <Link href={docx} isExternal color="blue.500">
                                {filename} <Icon name="external-link" mx="2px" />
                            </Link>
                        </Stack>
                        <Stack direction="row">
                            <Box minW="80px" fontWeight="bold">Uploaded</Box>
                            <Box overflowX="hidden" overflowY="scroll">{date_uploaded}</Box>
                        </Stack>
                        <Stack flexGrow={1} justifyContent="flex-end" alignItems="flex-end" direction="row">
                            <Tooltip label="Allow editing the paper if available" placement="bottom">
                                <Button
                                    leftIcon="unlock"
                                    isDisabled={status !== 'checked-out'}
                                    onClick={() => unlock()}
                                >
                                    Unlock
                                </Button>
                            </Tooltip>
                            <Tooltip label="Edit this paper" placement="bottom">
                                <Button
                                    onClick={() => checkout()}
                                    leftIcon="edit"
                                    variantColor="primary"
                                >
                                    Start Editing
                                </Button>
                            </Tooltip>
                        </Stack>
                    </Stack>
                </Flex>
            </Flex>
        </Collapse>
    )
}

export const statusMap = {
    'in-progress': 'In Progress',
    'not-started': 'Not Started',
    'checked-out': 'Checked Out',
    'published': 'Published',
}

export const labelColors = {
    'in-progress': '#c3e3ff',
    'not-started': '#ffe8c6',
    'checked-out': '#ffc6c8',
    'published': '#c6ffc6',
}

export const StatusChip = ({ status }) => {
    const label = statusMap[status] || 'Unknown'
    const color = labelColors[status]
    return (
        <Chip {...{ label }} style={{ background: color }} />
    )
}

export default CheckoutTable;