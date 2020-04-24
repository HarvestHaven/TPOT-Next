import React from 'react'
import { useRouter } from 'next/router'
import Box from '@material-ui/core/Box'
import { Tabs, Tab } from '@material-ui/core'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined'
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined'
import ViewQuiltOutlinedIcon from '@material-ui/icons/ViewQuiltOutlined'
import * as ROUTES from '../constants/routes'

const HeaderTabs = () => {
    const router = useRouter()
    const splitroute = router.pathname.split('/')
    const route = splitroute[splitroute.length - 1]
    let stop = 1
    switch (route) {
        case 'scribe':
            stop = 0
            break
        case 'edit':
            stop = 1
            break
        case 'checkout':
            stop = 2
            break
        default:
            stop = 1
            break
    }

    return (
        <Box maxWidth={500} color="white">
            <Tabs
                value={stop}
                indicatorColor="primary"
                textColor="inherit"
                variant="fullWidth"
                aria-label="action tabs example"
            >
                <LinkTab icon={<ViewQuiltOutlinedIcon />} label="Overview" href={ROUTES.SCRIBE} />
                <LinkTab icon={<CreateOutlinedIcon />} label="Editor" href={ROUTES.EDIT} />
                <LinkTab icon={<ShoppingCartOutlinedIcon />} label="Checkout" href={ROUTES.CHECKOUT} />
            </Tabs>
        </Box>
    )
}

const LinkTab = ({ icon, label, href }) => {
    const router = useRouter()
    return (
        <Tab
            {...{ icon, label }}
            component="a"
            onClick={(e) => router.push(href)}
        />
    )
}

export default HeaderTabs