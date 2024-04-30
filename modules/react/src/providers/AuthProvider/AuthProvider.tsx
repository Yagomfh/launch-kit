import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { AxiosError, AxiosInstance } from 'axios';
import { AuthContext, AuthContextData } from '../../contexts';
import {
  createSessionCookies,
  getToken,
  removeSessionCookies,
} from '../../utils';
import {
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from '../../services';
import { LaunchKitConfig } from '../LaunchKit/LaunchKitProvider';

type Props = {
  children: React.ReactNode;
  api: AxiosInstance;
} & LaunchKitConfig['auth'];

function AuthProvider<T>(props: Props) {
  const { children } = props;

  const [user, setUser] = React.useState<T>();
  const [loadingUserData, setLoadingUserData] = React.useState(true);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const token = getToken();
  const isAuthenticated = Boolean(token);

  async function updateUser(user: T) {
    setUser(user);
  }

  async function createSession(jwt: string, user: T) {
    try {
      createSessionCookies({ token: jwt });
      setUser(user);
      setAuthorizationHeader({ request: props.api.defaults, token: jwt });
    } catch (error) {
      const err = error as AxiosError;
      return err;
    }
  }

  function closeSession() {
    removeSessionCookies();
    setUser(undefined);
    setLoadingUserData(false);
    navigate(props.logoutRedirect);
    removeAuthorizationHeader(props.api);
  }

  React.useEffect(() => {
    if (!token) {
      removeSessionCookies();
      setUser(undefined);
      setLoadingUserData(false);
    }
  }, [navigate, pathname, token]);

  React.useEffect(() => {
    const token = getToken();

    async function getUserData() {
      setLoadingUserData(true);

      try {
        const response = await props.api.get<T>(props.usersMePath);

        if (response?.data) {
          setUser({
            ...response.data,
          } as T);
        }
      } catch (error) {
        /**
         * an error handler can be added here
         */
      } finally {
        setLoadingUserData(false);
      }
    }

    if (token) {
      setAuthorizationHeader({ request: props.api.defaults, token });
      getUserData();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={
        {
          isAuthenticated,
          user,
          loadingUserData,
          updateUser,
          createSession,
          closeSession,
        } as AuthContextData<T>
      }
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
