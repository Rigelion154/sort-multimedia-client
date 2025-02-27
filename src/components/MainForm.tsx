import {Button} from "@mui/material";

import FolderInputField from "./FolderInputField/FolderInputField.tsx";

const MainForm = () => (
    <div className='flex flex-col items-center h-screen p-5 gap-3'>
        <div className='flex justify-center gap-5 h-[90%] grow'>
            <FolderInputField type='source'/>
            <FolderInputField type='destination'/>
        </div>
        <Button variant='contained'>Начать сортировку</Button>
    </div>
)

export default MainForm;