import { ReactNode, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext, SignInCredentials, User } from '@/contexts'
import { paths } from '@/router'
import {
  api,
  removeAuthorizationHeader,
  setAuthorizationHeader
} from '@/services'
import { createSessionCookies, getToken, removeSessionCookies } from '@/utils'
import { Register } from '@/contexts/AuthContext/AuthContext'
import { AxiosError } from 'axios'

type Props = {
  children: ReactNode
}

function AuthProvider(props: Props) {
  const { children } = props

  const [user, setUser] = useState<User>()
  const [loadingUserData, setLoadingUserData] = useState(true)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const token = getToken()
  const isAuthenticated = Boolean(token)

  async function register(params: Register) {
    try {
      const response = await api.post('/auth/register', {
        ...params,
        username: params.email
      })
      const { jwt, user } = response.data

      createSessionCookies({ token: jwt })
      setUser(user)
      setAuthorizationHeader({ request: api.defaults, token: jwt })
    } catch (error) {
      const err = error as AxiosError
      return err
    }
  }

  async function signIn(params: SignInCredentials) {
    try {
      const response = await api.post('/auth/login', {
        identifier: params.email,
        password: params.password
      })
      const { jwt, user } = response.data

      createSessionCookies({ token: jwt })
      setUser(user)
      setAuthorizationHeader({ request: api.defaults, token: jwt })
    } catch (error) {
      const err = error as AxiosError
      return err
    }
  }

  function signOut() {
    removeSessionCookies()
    setUser(undefined)
    setLoadingUserData(false)
    navigate(paths.LOGIN_PATH)
    removeAuthorizationHeader()
  }

  useEffect(() => {
    if (!token) {
      removeSessionCookies()
      setUser(undefined)
      setLoadingUserData(false)
    }
  }, [navigate, pathname, token])

  useEffect(() => {
    const token = getToken()

    async function getUserData() {
      setLoadingUserData(true)

      try {
        const response = await api.get('/users/me')

        console.log(response)

        if (response?.data) {
          const { email, id, firstName, lastName } = response.data
          setUser({
            email,
            id,
            firstName,
            lastName
          })
        }
      } catch (error) {
        /**
         * an error handler can be added here
         */
      } finally {
        setLoadingUserData(false)
      }
    }

    if (token) {
      setAuthorizationHeader({ request: api.defaults, token })
      getUserData()
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loadingUserData,
        signIn,
        signOut,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
