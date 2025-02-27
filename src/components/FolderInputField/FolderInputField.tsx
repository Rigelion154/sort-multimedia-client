import React, {useCallback, useEffect, useState} from "react";
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

    const getFolderItems = useCallback(async (path: string) => {
        const isSlashed = path.endsWith('\\') ? '' : '\\';
        const response = await fetchFolderItems({folderPath: path + isSlashed, type});

        if (response.hasErrors) {
            setError((response as IFolderError).message);
            setFolderData(null);
            setFolderPath('');
        } else {
            setFolderData(response as IFolderData);
            setFolderPath((response as IFolderData).folderPath);
        }
    }, [type]);

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

    useEffect(() => {
        if (!folderData) {
            (async () => await getFolderItems(folderPath))()
        }
    }, [folderData, folderPath, getFolderItems])

    return (
        <div className='field__wrapper'>
            <div className='flex items-center gap-1'>
                <TextField
                    className='flex-grow'
                    size='small'
                    label={PLACEHOLDER} variant="outlined"
                    autoComplete='off'
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            color: "white",
                            fontWeight: "bold",
                            letterSpacing: '1px !important',
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "white",
                                borderWidth: "2px",
                            },
                        },
                        "& .MuiInputLabel-outlined": {
                            color: "white",
                            fontWeight: "bold",
                        },
                    }}
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

            <div className='grow border-2 border-white  rounded-sm p-2 overflow-auto'>
                {error && <Alert severity="warning">{error}</Alert>}
                {folderData && <FieldList {...{folderData, getFolderItems}} />}
            </div>
        </div>
    );
};

export default FolderInputField;