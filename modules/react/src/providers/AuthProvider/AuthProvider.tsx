import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { AxiosError, AxiosInstance } from 'axios';
import { AuthContext } from '../../contexts';
import { Register, Login, User } from '../../contexts/AuthContext/AuthContext';
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

function AuthProvider(props: Props) {
  const { children } = props;

  const [user, setUser] = React.useState<User>();
  const [loadingUserData, setLoadingUserData] = React.useState(true);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const token = getToken();
  const isAuthenticated = Boolean(token);

  async function register(params: Register) {
    try {
      const response = await props.registerFn(params);
      const { jwt, user } = response.data;

      createSessionCookies({ token: jwt });
      setUser(user);
      setAuthorizationHeader({ request: props.api.defaults, token: jwt });
    } catch (error) {
      const err = error as AxiosError;
      return err;
    }
  }

  async function signIn(params: Login) {
    try {
      const response = await props.loginFn(params);
      const { jwt, user } = response.data;

      createSessionCookies({ token: jwt });
      setUser(user);
      setAuthorizationHeader({ request: props.api.defaults, token: jwt });
    } catch (error) {
      const err = error as AxiosError;
      return err;
    }
  }

  function signOut() {
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
        const response = await props.getMeFn();

        if (response?.data) {
          const { email, id, firstName, lastName, confirmed } = response.data;
          setUser({
            email,
            id,
            firstName,
            lastName,
            confirmed,
          });
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
      value={{
        isAuthenticated,
        user,
        loadingUserData,
        setUser,
        signIn,
        signOut,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
