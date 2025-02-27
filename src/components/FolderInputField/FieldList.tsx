import FileUploadIcon from "@mui/icons-material/FileUpload";

import {IFileItem, IFolderData} from "./types";

import {FILE_ICONS, LOCKED_TITLE} from "../../constants";

interface IInputFieldProps {
    folderData: IFolderData;
    getFolderItems: (folderPath: string) => Promise<void>
}

const FieldList = ({folderData, getFolderItems}: IInputFieldProps) => {
    const prevPath = folderData.folderPath.split('/').filter(Boolean);

    const handlePrevFolderClick = async () => {
        if (prevPath.length > 1) {
            const currentPath = prevPath.slice(0, -1).join('/');
            await getFolderItems(currentPath);
        }
    };

    const handleFolderClick = async (item: IFileItem) => {
        if (item.isDirectory) {
            await getFolderItems(folderData.folderPath + item.fileName)
        }
    }

    return (
        <>
            {prevPath && prevPath.length > 1 && (
                <div onClick={handlePrevFolderClick} className='folder__item'>
                    <FileUploadIcon color='success'/>...
                </div>
            )}

            {folderData.filesStatList.map((item, index) => (
                <div key={index} className='folder__item' onClick={() => handleFolderClick(item)}>
                    {FILE_ICONS[item.filetype]}
                    <span className='folder__item_title' title={`${item.fileName}${item.isLocked ? LOCKED_TITLE : ''}`}>{item.fileName}</span>
                </div>
            ))}
        </>
    );
};

export default FieldList;