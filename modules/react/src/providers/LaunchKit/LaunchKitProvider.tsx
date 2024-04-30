import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../AuthProvider';
import { AxiosInstance, AxiosResponse } from 'axios';
import { User } from '../../contexts';
import { Register, Login } from '../../contexts';

export type LaunchKitConfig = {
  api: {
    instance: AxiosInstance;
  };
  auth: {
    registerFn: (params: Register) => Promise<
      AxiosResponse<
        {
          jwt: string;
          user: User;
        },
        Register
      >
    >;
    loginFn: (params: Login) => Promise<
      AxiosResponse<
        {
          jwt: string;
          user: User;
        },
        Login
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
  return (
    <BrowserRouter>
      <AuthProvider api={config.api.instance} {...config.auth}>
        {children}
      </AuthProvider>
    </BrowserRouter>
  );
};

export default LaunchKitProvider;
