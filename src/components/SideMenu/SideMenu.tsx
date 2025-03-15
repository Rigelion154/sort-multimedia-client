import {sorterStore} from "../../store/SorterStore.ts";
import {observer} from "mobx-react-lite";
import ExtensionForm from "./ExtensionForm.tsx";


const SideMenu = observer(() => {
    const {photoExtension, videoExtension, isMenuShow} = sorterStore
    return (
        <div className={`${isMenuShow ? 'show' : ''} side__menu shadow-lg`}>
            <ExtensionForm extensions={photoExtension}/>
            <ExtensionForm extensions={videoExtension}/>
        </div>
    );
});

export default SideMenu;