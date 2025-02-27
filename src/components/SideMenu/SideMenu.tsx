import {List, ListItem} from "@mui/material";


const SideMenu = () => {
    return (
        <div className='fixed start-[30px] top-[20px] w-[350px] border-2 text-white font-bold rounded-md'>
            <List>
                <ListItem>
                    Расширения для фото:
                </ListItem>
                <ListItem>
                    [ 'jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp' ]
                </ListItem>
                <ListItem>
                    Расширения для видео:
                </ListItem>
                <ListItem>
                    [ 'mp4', 'mov', 'avi', 'mkv', 'webm' ]
                </ListItem>
            </List>
        </div>
    );
};

export default SideMenu;