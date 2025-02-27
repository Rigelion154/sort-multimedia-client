import React, {useState} from "react";
import {fetchFolderItems} from "../api/requests/fetchFolderItems.ts";
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {AxiosError} from "axios";
import {DESTINATION_PLACEHOLDER, SOURCE_PLACEHOLDER} from "../constants.ts";
import {Alert, Button, TextField} from "@mui/material";

interface IFolderInputProps {
    type: "source" | 'destination'
}

interface IFileItem {
    fileName: string,
    isDirectory: boolean,
    createdAt: string
}

interface IFolderData {
    hasErrors: boolean;
    folderPath: string
    filesStatList: IFileItem[]
}

const SourceInputField = ({type}: IFolderInputProps) => {
    const [folderPath, setFolderPath] = useState<string>('')
    const [folderData, setFolderData] = useState<IFolderData | null>(null)
    const [error, setError] = useState('')
    const PLACEHOLDER = type === 'source' ? SOURCE_PLACEHOLDER : DESTINATION_PLACEHOLDER
    const isDisabled = !!error || !folderPath

    const getFolderItems = async (folderPath: string) => {
        try {
            const response = await fetchFolderItems({folderPath, type})
            setFolderData(response)
            setFolderPath(response?.folderPath)
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorData: { hasErrors: boolean, message: string } = error.response?.data
                setError(errorData.message)
                setFolderData(null)
                setFolderPath('')
            }
        }

    }

    const handleFolderClick = async (item: IFileItem) => {
        const isSlashed = folderData?.folderPath.endsWith('/') ? '' : '/'

        if (item.isDirectory) {
            await getFolderItems(folderData?.folderPath + isSlashed + item.fileName)
        }
    }

    const handlePrevFolderClick = async () => {
        const currentPath = folderData?.folderPath;

        if (currentPath) {
            // Разделяем путь по слэшу и удаляем пустые элементы
            const pathParts = currentPath.split('/').filter(Boolean);

            // Если путь содержит больше одного сегмента (не корневой)
            if (pathParts.length > 1) {
                // Убираем последний сегмент пути
                const prevPath = pathParts.slice(0, -1).join('/') + '/'; // Добавляем слэш в конце
                await getFolderItems(prevPath);
            } else {
                const prevPath = pathParts[0] + '/';
                await getFolderItems(prevPath);
            }
        } else {
            setError('Текущий путь не определен.');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFolderPath(e.target.value)
        setError('')
    }

    return (
        <div className='flex flex-col gap-2' style={{minWidth: '420px'}}>
            <div className='flex items-center gap-1'>
                <TextField
                    className='flex-grow'
                    size='small'
                    label={PLACEHOLDER} variant="outlined"
                    color='primary'
                    value={folderPath}
                    onChange={handleInputChange}
                />

                <Button
                    onClick={() => getFolderItems(folderPath)}
                    className='h-[100%]'
                    variant="contained"
                    color='success'
                    disabled={isDisabled}
                >
                    Применить
                </Button>
            </div>

            <div className='w-[100%] h-[100%] border border-green-600 rounded-sm p-2'>
                {error && <Alert severity="warning">{error}</Alert>}
                {folderData && <>
                    {folderData.folderPath && <div onClick={handlePrevFolderClick}><FileUploadIcon color='success' />...</div>}
                    {folderData.filesStatList?.map((item, index) =>
                        <div key={index} className='flex gap-1' onClick={() => handleFolderClick(item)}>
                            {item.isDirectory && <FolderOutlinedIcon color='primary'/>}
                            {!item.isDirectory && <InsertDriveFileOutlinedIcon color='success'/>}
                            <span>{item.fileName}</span>
                        </div>
                    )}
                </>}
            </div>
        </div>
    );
};

export default SourceInputField;