import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../AuthProvider';
import { AxiosInstance } from 'axios';
import { Toaster } from 'react-hot-toast';

export type LaunchKitConfig = {
  api: AxiosInstance;
  auth: {
    usersMePath: string;
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
      <AuthProvider api={config.api} {...config.auth}>
        {children}
        <Toaster
          toastOptions={{
            style: {
              fontFamily: 'Arial',
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default LaunchKitProvider;
