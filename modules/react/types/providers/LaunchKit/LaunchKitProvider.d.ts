import * as React from 'react';
import { AxiosInstance, AxiosResponse } from 'axios';
import { User } from '../../contexts';
import { Register, Login } from '../../contexts';
export type LaunchKitConfig = {
    api: {
        instance: AxiosInstance;
    };
    auth: {
        registerFn: (params: Register) => Promise<AxiosResponse<{
            jwt: string;
            user: User;
        }, any>>;
        loginFn: (params: Login) => Promise<AxiosResponse<{
            jwt: string;
            user: User;
        }, any>>;
        getMeFn: () => Promise<AxiosResponse<User, any>>;
        logoutRedirect: string;
    };
};
type Props = {
    children: React.ReactNode;
    config: LaunchKitConfig;
};
declare const LaunchKitProvider: ({ children, config }: Props) => React.JSX.Element;
export default LaunchKitProvider;
