import  axios from "axios";
import {BASE_URL} from "../constants.ts";


export const apiClient = axios.create({baseURL: BASE_URL})