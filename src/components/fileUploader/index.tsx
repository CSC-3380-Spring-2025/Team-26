import * as React from 'react';
import { FileUploaderRegular } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';


interface IFileUploaderProps {
    
}

const FileUploader: React.FunctionComponent<IFileUploaderProps> = (props) => {
    return (
        <div>
            <FileUploaderRegular
            sourceList="local, camera, gdrive"
            cameraModes="photo, video"
            classNameUploader="uc-light"
            pubkey="62c8077c3253e9e01d7d"
            />
        </div>
    );
};

export default FileUploader;