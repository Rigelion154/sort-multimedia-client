import {observer} from "mobx-react-lite";
import React, {useEffect} from "react";
import Button from "react-bootstrap/esm/Button";
import {Alert, FormControl, FormLabel} from "react-bootstrap";

import {DESTINATION_LABEL, SOURCE_LABEL, START_PATH} from "../../constants";
import {ESorterPath, sorterStore} from "../../store/SorterStore.ts";

import FieldList from "./FieldList.tsx";

interface IFolderInputProps {
    pathType: ESorterPath
}

const FolderInputField = observer(({pathType}: IFolderInputProps) => {
    const {sourcePath, destinationPath, sourceData, destinationData, sourceError, destinationError,} = sorterStore
    const {setFolderError, setPath, getSourceFiles} = sorterStore
    const folderPath = pathType === ESorterPath.sourcePath ? sourcePath : destinationPath
    const folderData = pathType === ESorterPath.sourcePath ? sourceData : destinationData
    const error = pathType === ESorterPath.sourcePath ? sourceError : destinationError


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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await getSourceFiles(pathType, folderPath)
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
            <form onSubmit={handleSubmit}>
                <FormLabel>
                    {pathType === ESorterPath.sourcePath ? SOURCE_LABEL : DESTINATION_LABEL}
                </FormLabel>
                <div className='d-flex align-items-center gap-1'>
                    <FormControl className='rounded-1 text-success fw-bold shadow-none' autoComplete='off'
                                 value={folderPath}
                                 onClick={handleInputClick}
                                 onChange={handleInputChange}/>
                    <Button variant='success' className='rounded-1' disabled={!!error || !folderPath} type='submit'>
                        Применить
                    </Button>
                </div>
            </form>

            <div className='flex-grow-1 border border-2 border-white rounded-1 p-2 overflow-auto'
                 style={{maxHeight: '80vh'}}>
                {error && <Alert variant="warning">{error.message}</Alert>}
                {sourceData && <FieldList {...{pathType}} />}
            </div>
        </div>
    );
});

export default FolderInputField;