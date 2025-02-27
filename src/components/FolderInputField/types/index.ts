export enum EFolderInputType {
    source = 'source',
    destination = 'destination',
}

export enum EFileType {
    file = 'file',
    image = 'image',
    video= 'video',
    directory = 'directory',
    warning = 'warning',
}

export interface IFileItem {
    fileName: string,
    filetype: keyof typeof EFileType
    isDirectory?: boolean,
    createdAt?: string
    isLocked?: boolean,
}

export interface IFolderData {
    hasErrors: boolean;
    folderPath: string
    filesStatList: IFileItem[]
}

export interface IFolderError {
    hasErrors: boolean;
    message: string;
}