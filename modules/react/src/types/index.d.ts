type LaunchKitConfig = {
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

declare module 'react-launchkit' {
  LaunchKitConfig;
}
