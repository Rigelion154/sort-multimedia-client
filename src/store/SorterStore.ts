import {makeAutoObservable} from "mobx";
import {START_PATH} from "../constants";
import {fetchFolderFiles} from "../api/requests/fetchFolderFiles.ts";
import {IFolderData, IFolderError} from "../components/FolderInputField/types";

export enum ESorterPath {
    'sourcePath' = 'sourcePath',
    'destinationPath' = 'destinationPath'
}

class SorterStore {
    sourcePath: string = START_PATH
    sourceData: IFolderData | null = null
    sourceError: IFolderError | null = null

    destinationPath: string = START_PATH
    destinationData: IFolderData | null = null
    destinationError: IFolderError | null = null

    constructor() {
        makeAutoObservable(this);
    }

    public setPath = <P extends ESorterPath>(pathType: P, value: string): void => {
        this[pathType] = value
    }

    public setFolderError = <T extends ESorterPath>(pathType: T, error: IFolderError | null) => {
        const currentError = pathType === ESorterPath.sourcePath ? 'sourceError' : 'destinationError'
        this[currentError] = error
    }

    public setFolderData = <T extends ESorterPath>(pathType: T, data: IFolderData | null) => {
        const currentData = pathType === ESorterPath.sourcePath ? 'sourceData' : 'destinationData'
        this[currentData] = data
    }


    public getSourceFiles = async <T extends ESorterPath>(pathType: T, path: string) => {
        const isSlashed = path.endsWith('\\') ? '' : '\\';
        const response = await fetchFolderFiles({folderPath: path + isSlashed});

        if (response.hasErrors) {
            this.setFolderError(pathType, (response as IFolderError));
            this.setFolderData(pathType, null);
            this.setPath(pathType, '')
        } else {
            this.setFolderData(pathType, response as IFolderData);
            this.setPath(pathType, (response as IFolderData).folderPath)
        }
    }
}

export const sorterStore = new SorterStore();