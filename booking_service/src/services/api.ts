import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';
import { dropToken, getToken } from './token';

type DetailMessageType = {
    error: string;
};
const StatusCodeMapping: Record<number, boolean> = {
    [StatusCodes.BAD_REQUEST]: true,
    [StatusCodes.NOT_FOUND]: true,
    [StatusCodes.INTERNAL_SERVER_ERROR]: true,
};
export const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

export const shouldUnauthorizedError = (response: AxiosResponse) => response.status === StatusCodes.UNAUTHORIZED;

const BACKEND_URL = 'http://127.0.0.1:8000/api/';

const REQUEST_TIMEOUT = 50000;

export const createAPI = (): AxiosInstance => {
    const api = axios.create({
        baseURL: BACKEND_URL,
        timeout: REQUEST_TIMEOUT,
    });
    api.interceptors.request.use((config: AxiosRequestConfig) => {
        const token = getToken();
        if (token && config.headers) {
            config.headers['Authorization'] = `Token ${token}`;
        }
        return config;
    });
    api.interceptors.response.use(
        (response) => response,
        (error: AxiosError<DetailMessageType>) => {
            if (error.response && shouldDisplayError(error.response)) {
                const detailMessage = error.response.data;
                toast.warn(detailMessage.error);
                console.log(detailMessage.error);
            } else if (error.response && shouldUnauthorizedError(error.response)) {
                dropToken();
            } else {
                toast.warn('Произошла ошибка. Попробуйте снова.');
            }
            throw error;
        },
    );
    return api;
};
