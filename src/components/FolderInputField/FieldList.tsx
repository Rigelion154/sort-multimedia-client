import FileUploadIcon from "@mui/icons-material/FileUpload";

import {IFileItem} from "./types";

import {FILE_ICONS, LOCKED_TITLE} from "../../constants";
import {ESorterPath, sorterStore} from "../../store/SorterStore.ts";
import {observer} from "mobx-react-lite";

interface IInputFieldProps {
    // folderData: IFolderData;
    // getFolderItems: (folderPath: string) => Promise<void>
    pathType: ESorterPath
}

const FieldList = observer(({pathType}: IInputFieldProps) => {
    const {sourceData, destinationData, getSourceFiles} = sorterStore
    const folderData = pathType === ESorterPath.sourcePath ? sourceData : destinationData
    const prevPath = folderData?.folderPath.split('\\').filter(Boolean);

    const handlePrevFolderClick = async () => {
        if (prevPath && prevPath.length > 1) {
            const currentPath = prevPath.slice(0, -1).join('\\');
            await getSourceFiles(pathType, currentPath);
        }
    };

    const handleFolderClick = async (item: IFileItem) => {
        if (item.isDirectory) {
            await getSourceFiles(pathType, folderData?.folderPath + item.fileName)
        }
    }

    console.log(folderData)

    return (
        <>
            {prevPath && prevPath.length > 1 && (
                <div onClick={handlePrevFolderClick} className='folder__item'>
                    <FileUploadIcon color='success'/>...
                </div>
            )}

            {folderData && folderData.filesStatList.map((item, index) => (
                <div key={index} className='folder__item' onClick={() => handleFolderClick(item)}>
                    {FILE_ICONS[item.filetype]}
                    <span className='folder__item_title'
                          title={`${item.fileName}${item.isLocked ? LOCKED_TITLE : ''}`}>{item.fileName}</span>
                </div>
            ))}
        </>
    );
});

export default FieldList;