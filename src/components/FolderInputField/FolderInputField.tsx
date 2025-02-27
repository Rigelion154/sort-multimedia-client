import React, {useState} from "react";
import {Alert, Button, TextField} from "@mui/material";

import {EFolderInputType, IFolderData, IFolderError} from "./types";

import {DESTINATION_LABEL, SOURCE_LABEL, START_PATH} from "../../constants";
import {fetchFolderItems} from "../../api/requests/fetchFolderItems.ts";

import FieldList from "./FieldList.tsx";

interface IFolderInputProps {
    type: keyof typeof EFolderInputType
}

const FolderInputField = ({type}: IFolderInputProps) => {
    const PLACEHOLDER = type === 'source' ? SOURCE_LABEL : DESTINATION_LABEL
    const [folderPath, setFolderPath] = useState<string>(START_PATH)
    const [folderData, setFolderData] = useState<IFolderData | null>(null)
    const [error, setError] = useState('')

    const getFolderItems = async (folderPath: string) => {
        const isSlashed = folderPath.endsWith('/') ? '' : '/'
        const response = await fetchFolderItems({folderPath: folderPath + isSlashed, type})

        if (response.hasErrors) {
            const errorData = response as IFolderError
            setFolderData(null)
            setFolderPath('')
            setError(errorData.message)
        }

        if (!response.hasErrors) {
            const data = response as IFolderData
            setFolderData(data)
            setFolderPath(data.folderPath)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFolderPath(e.target.value)
        setError('')
    }

    const handleInputClick = () => {
        if (!folderPath) {
            setFolderPath(START_PATH)
            setError('')
        }
    }

    return (
        <div className='field__wrapper'>
            <div className='flex items-center gap-1'>
                <TextField
                    className='flex-grow'
                    size='small'
                    label={PLACEHOLDER} variant="outlined"
                    color='primary'
                    value={folderPath}
                    onChange={handleInputChange}
                    onClick={handleInputClick}
                />

                <Button
                    onClick={() => getFolderItems(folderPath)}
                    className='h-[100%]'
                    variant="contained"
                    color='success'
                    disabled={!!error || !folderPath}
                >
                    Применить
                </Button>
            </div>

            <div className='grow border border-green-600 rounded-sm p-2 overflow-auto'>
                {error && <Alert severity="warning">{error}</Alert>}
                {folderData && <FieldList {...{folderData, getFolderItems}} />}
            </div>
        </div>
    );
};

export default FolderInputField;