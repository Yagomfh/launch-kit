import { AxiosDefaults, AxiosInstance, AxiosRequestConfig } from 'axios';
type SetAuthorizationHeaderParams = {
    request: AxiosDefaults | AxiosRequestConfig;
    token: string;
};
export declare function setAuthorizationHeader(params: SetAuthorizationHeaderParams): void;
export declare function removeAuthorizationHeader(api: AxiosInstance): void;
export declare function setupInterceptors(axiosInstance: AxiosInstance): AxiosInstance;
export {};
