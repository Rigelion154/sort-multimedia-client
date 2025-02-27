import {AxiosError, AxiosResponse} from "axios";

import {EFolderInputType, IFolderError, IFolderData} from "../../components/FolderInputField/types";

import {apiClient} from "../apiClient.ts";

export interface IFolderItemsRequest {
    folderPath: string,
    type: keyof typeof EFolderInputType
}

export const fetchFolderItems = async (data: IFolderItemsRequest): Promise<IFolderData | IFolderError> => {
    try {
        const response: AxiosResponse<IFolderData> = await apiClient.post('/sort/path', data);
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data;
        } else {
            return {hasErrors: true, message: (error as Error).message};
        }
    }
}