import {FormLabel} from "react-bootstrap";
import {PHOTO_EXTENSION_LABEL} from "../../constants";


const ExtensionForm = ({extensions}: { extensions: string[] }) => {
    return (
        <div>
            {/*{!isPhotoEdit &&*/}
            {/*    <Button variant='warning' size='sm' className='p-1 lh-1 me-2'*/}
            {/*            onClick={() => setIsPhotoEdit(true)}>*/}
            {/*        {FILE_ICONS.edit}*/}
            {/*    </Button>}*/}

            {/*{isPhotoEdit &&*/}
            {/*    <Button variant='success' size='sm' className='p-1 lh-1 me-2'*/}
            {/*            onClick={() => {*/}
            {/*                setIsPhotoEdit(false)*/}
            {/*                if (photoString) {*/}
            {/*                    setExtension("photoExtension", photoString)*/}
            {/*                }*/}
            {/*                setPhotoString('')*/}
            {/*            }}>*/}
            {/*        {FILE_ICONS.check}*/}
            {/*    </Button>}*/}


            <FormLabel>{PHOTO_EXTENSION_LABEL}</FormLabel>


            <div className='rounded-1 border border-white p-2 px-3 fw-bold lh-sm'>
                {extensions.join(', ')}
            </div>


            {/*{isPhotoEdit &&*/}
            {/*    <FormControl*/}
            {/*        className='fw-bold text-success rounded-1 shadow-none'*/}
            {/*        value={photoString}*/}
            {/*        disabled={!isPhotoEdit}*/}
            {/*        onChange={(e) => {*/}
            {/*            const extensionRegex = /^[a-zA-Zа-яА-Я0-9]*$/;*/}
            {/*            if (extensionRegex.test(e.target.value)) {*/}
            {/*                setPhotoString(e.target.value)*/}
            {/*            }*/}
            {/*        }}*/}
            {/*    />}*/}
        </div>
    );
};

export default ExtensionForm;