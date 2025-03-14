import {observer} from "mobx-react-lite";
import {Alert, Button} from "@mui/material";

import FolderInputField from "./FolderInputField/FolderInputField.tsx";
import SideMenu from "./SideMenu/SideMenu.tsx";
import {useState} from "react";
import {fetchGallerySort} from "../api/requests/fetchGallerySort.ts";
import {ESorterPath, sorterStore} from "../store/SorterStore.ts";

const MainForm = observer(() => {
    const {sourcePath, destinationPath} = sorterStore
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

    return <div className='flex flex-col items-center h-screen p-5 gap-3 relative'>
        <SideMenu/>
        <div className='flex justify-center gap-5 h-[90%]'>
            <FolderInputField pathType={ESorterPath.sourcePath}/>
            <FolderInputField pathType={ESorterPath.destinationPath}/>
        </div>
        {error && <Alert severity="warning">{error}</Alert>}
        <Button variant='contained' onClick={handleSort}>Начать сортировку</Button>
    </div>
})

export default MainForm;