import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useApi } from '../../hooks';
import { AuthProvider } from '../AuthProvider';
import { AxiosResponse } from 'axios';
import { User } from '../../contexts';
import { Register, Login } from '../../contexts';

export type LaunchKitConfig = {
  api: {
    baseURL: string;
  };
  auth: {
    registerFn: (params: Register) => Promise<
      AxiosResponse<
        {
          jwt: string;
          user: User;
        },
        any
      >
    >;
    loginFn: (params: Login) => Promise<
      AxiosResponse<
        {
          jwt: string;
          user: User;
        },
        any
      >
    >;
    getMeFn: () => Promise<AxiosResponse<User, any>>;
    logoutRedirect: string;
  };
};

type Props = {
  children: React.ReactNode;
  config: LaunchKitConfig;
};

const LaunchKitProvider = ({ children, config }: Props) => {
  const { api } = useApi({ baseURL: config.api.baseURL });
  return (
    <BrowserRouter>
      <AuthProvider api={api} {...config.auth}>
        {children}
      </AuthProvider>
    </BrowserRouter>
  );
};

export default LaunchKitProvider;
