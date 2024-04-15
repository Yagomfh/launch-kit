import { AxiosError } from 'axios'
import { createContext } from 'react'

export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  // permissions: string[]
  // roles: string[]
}

export type SignInCredentials = {
  email: string
  password: string
  rememberMe?: boolean
}

export type Register = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

export type AuthContextData = {
  user?: User
  setUser: (user: User) => void
  isAuthenticated: boolean
  loadingUserData: boolean
  register: (params: Register) => Promise<void | AxiosError>
  signIn: (credentials: SignInCredentials) => Promise<void | AxiosError>
  signOut: () => void
}

const AuthContext = createContext({} as AuthContextData)

export default AuthContext
