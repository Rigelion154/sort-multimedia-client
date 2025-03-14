import {observer} from "mobx-react-lite";
import React, {useEffect} from "react";
import {Alert, Button, TextField} from "@mui/material";

import {DESTINATION_LABEL, SOURCE_LABEL, START_PATH} from "../../constants";
import {ESorterPath, sorterStore} from "../../store/SorterStore.ts";

import FieldList from "./FieldList.tsx";

interface IFolderInputProps {
    pathType: ESorterPath
}

const FolderInputField = observer(({pathType}: IFolderInputProps) => {
    const {
        sourcePath,
        destinationPath,
        sourceData,
        destinationData,
        sourceError,
        destinationError,
        setFolderError,
        setPath,
        getSourceFiles
    } = sorterStore
    const folderPath = pathType === ESorterPath.sourcePath ? sourcePath : destinationPath
    const folderData = pathType === ESorterPath.sourcePath ? sourceData : destinationData
    const error = pathType === ESorterPath.sourcePath ? sourceError : destinationError

    // console.log(folderPath, pathType)
    // console.log(sourceData, sourceData)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPath(pathType, e.target.value)
        setFolderError(pathType, null)
    }

    const handleInputClick = () => {
        if (!folderPath) {
            setPath(pathType, START_PATH)
            setFolderError(pathType, null)
        }
    }

    useEffect(() => {
        if (!folderData && !error) {
            (async () => {
                await getSourceFiles(pathType, folderPath)
            })()
        }
    }, [error, folderData, folderPath, getSourceFiles, pathType])

    return (
        <div className='field__wrapper'>
            <div className='flex items-center gap-1'>
                <TextField
                    className='flex-grow'
                    size='small'
                    label={pathType === ESorterPath.sourcePath ? SOURCE_LABEL : DESTINATION_LABEL}
                    variant="outlined"
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
                    onClick={() => getSourceFiles(pathType, folderPath)}
                    className='h-[100%]'
                    variant="contained"
                    color='success'
                    disabled={!!error || !folderPath}
                >
                    Применить
                </Button>
            </div>

            <div className='grow border-2 border-white  rounded-sm p-2 overflow-auto'>
                {error && <Alert severity="warning">{error.message}</Alert>}
                {sourceData && <FieldList {...{pathType}} />}
            </div>
        </div>
    );
});

export default FolderInputField;