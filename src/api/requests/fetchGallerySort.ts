import {AxiosError, AxiosResponse} from "axios";
import {IFolderData} from "../../components/FolderInputField/types";
import {apiClient} from "../apiClient.ts";

interface IFetchSortProps {
    sourcePath: string,
    destinationPath: string,
}

interface IFetchSortResponse {
    hasErrors: boolean
    message: string
    newDestinationFiles?: IFolderData
    newSourceFiles?: IFolderData
}

export const fetchGallerySort = async (data: IFetchSortProps): Promise<IFetchSortResponse> => {
    try {
        const response: AxiosResponse<IFetchSortResponse> = await apiClient.post('/sort', data);
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data;
        } else {
            return {hasErrors: true, message: (error as Error).message};
        }
    }
}