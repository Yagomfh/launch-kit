import { AxiosError } from 'axios';
import { createContext } from 'react';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  confirmed: boolean;
  email: string;
}

export interface Login {
  identifier: string;
  password: string;
  rememberMe?: boolean;
}

export interface Register {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface AuthContextData<T> {
  user?: T;
  updateUser: (user: T) => void;
  isAuthenticated: boolean;
  loadingUserData: boolean;
  createSession: (jwt: string, user: T) => Promise<void | AxiosError>;
  closeSession: () => void;
}

const AuthContext = createContext({});

export default AuthContext;
