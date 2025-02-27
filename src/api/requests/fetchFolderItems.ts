import {apiClient} from "../apiClient.ts";

export interface IFolderItemsRequest {
    folderPath: string,
    type: 'source' | 'destination'
}

export const fetchFolderItems = async (data:IFolderItemsRequest) => {
    const response = await apiClient.post('/sort/path', data);
    return response.data
}