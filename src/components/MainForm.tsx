import {observer} from "mobx-react-lite";

import FolderInputField from "./FolderInputField/FolderInputField.tsx";
import {useState} from "react";
import {fetchGallerySort} from "../api/requests/fetchGallerySort.ts";
import {ESorterPath, sorterStore} from "../store/SorterStore.ts";
import {Alert, Button} from "react-bootstrap";
import SideMenu from "./SideMenu/SideMenu.tsx";
import {FILE_ICONS} from "../constants";

const MainForm = observer(() => {
    const {sourcePath, destinationPath, menuToggle} = sorterStore
    const [error, setError] = useState('')

    const handleSort = async () => {
        const response = await fetchGallerySort({sourcePath, destinationPath})

        if (response.hasErrors) {
            setError(response.message)
        }

        if (!response.hasErrors) {
            sorterStore.setFolderData(ESorterPath.sourcePath, response?.newSourceFiles ?? null)
            sorterStore.setFolderData(ESorterPath.destinationPath, response?.newDestinationFiles ?? null)
        }
    }

    return (
        <div className='d-flex flex-column flex-wrap p-3 align-items-center position-relative gap-3'
             style={{minHeight: '100vh'}}>
            <SideMenu/>

            <div className='d-flex flex-wrap justify-center flex-grow-1 gap-3'>
                <FolderInputField pathType={ESorterPath.sourcePath}/>
                <FolderInputField pathType={ESorterPath.destinationPath}/>
            </div>

            <div>
                {error && <Alert variant="warning">{error}</Alert>}
                <Button variant='primary' className='rounded-1' onClick={handleSort}>Начать сортировку</Button>
            </div>

            <Button
                variant='outline-light'
                className='position-fixed start-0 bottom-0 mb-4 ms-2 rounded-1 border-0 p-2'
                style={{zIndex: 5}}
                onClick={menuToggle}
            >
                {FILE_ICONS.settings}
            </Button>
        </div>
    )
})

export default MainForm;