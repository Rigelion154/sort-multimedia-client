import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import ImageIcon from "@mui/icons-material/Image";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import SdCardAlertIcon from "@mui/icons-material/SdCardAlert";

export const BASE_URL = ' http://localhost:8535/api/v1/'
export const START_PATH = 'C:\\'
export const SOURCE_LABEL = 'Укажите путь к исходным данным'
export const DESTINATION_LABEL = 'Укажите путь к конечной папке'
export const LOCKED_TITLE = '. Файл заблокирован или используется!'
export const FILE_ICONS = {
    'directory': <FolderOutlinedIcon color='primary'/>,
    'file': <InsertDriveFileOutlinedIcon color='success'/>,
    'image': <ImageIcon color='secondary'/>,
    'video': <VideoFileIcon color='success'/>,
    'warning': <SdCardAlertIcon color='warning'/>,
}