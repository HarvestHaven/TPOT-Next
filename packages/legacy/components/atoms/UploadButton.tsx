import React, { FC } from 'react';
import { uploadLocalFile } from '../../functions/upload';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@chakra-ui/core/dist/Button';
import { notify } from '../../components/Toasts';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/router';
import * as ROUTES from '../../constants/routes'
import { Tooltip } from '@chakra-ui/core';

interface Props {
    label?: string,
    callback?: () => void
}

const UploadButton: FC<Props> = (props) => {

    const { user } = useAuth();
    const router = useRouter();
    const { label } = props;

    return (
        <Tooltip
            aria-label="upload-tooltip"
            label="Upload a Document"
        >
            <Button onClick={() => {
                if (!user && router.pathname !== ROUTES.LANDING) {
                    notify("You need to login to perform this action!", 'success')
                    router.push(ROUTES.LANDING)
                }
            }} >
                {label}
                <input
                    // multiple // multi-upload not recommended
                    accept=".docx"
                    type="file"
                    id="upload-button-input"
                    style={{ display: 'none' }}
                    onChange={async (event) => {
                        const { email, displayName } = user;

                        const files = event.target.files;
                        let file = files[0];
                        if (!file)
                            return;

                        let { document } = (await uploadLocalFile(file, email))
                        console.info(`Uploaded by user ${email}`);
                        notify('Document uploaded successfully!', 'success');

                        if (!document?.id)
                            return

                        const PATH = ROUTES.EDIT
                        router.push(`${PATH}/[doc]`, `${PATH}/${document.id}`)
                    }} />
                <label htmlFor="upload-button-input" style={{ margin: 12 }}>
                    <CloudUploadIcon />
                </label>
            </Button>
        </Tooltip>
    )
};

export default UploadButton