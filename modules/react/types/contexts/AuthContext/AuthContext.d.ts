/// <reference types="react" />
import { AxiosError } from 'axios';
export type User = {
    id: string;
    firstName: string;
    lastName: string;
    confirmed: boolean;
    email: string;
};
export type Login = {
    identifier: string;
    password: string;
    rememberMe?: boolean;
};
export type Register = {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
};
export type AuthContextData = {
    user?: User;
    setUser: (user: User) => void;
    isAuthenticated: boolean;
    loadingUserData: boolean;
    register: (params: Register) => Promise<void | AxiosError>;
    signIn: (credentials: Login) => Promise<void | AxiosError>;
    signOut: () => void;
};
declare const AuthContext: import("react").Context<AuthContextData>;
export default AuthContext;
