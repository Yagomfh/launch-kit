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
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure
} from '@chakra-ui/react'

type Props = {
  children: ReactNode
}

function AuthProvider(props: Props) {
  const { children } = props

  const [user, setUser] = useState<User>()
  const [loadingUserData, setLoadingUserData] = useState(true)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const token = getToken()
  const isAuthenticated = Boolean(token)

  async function register(params: Register) {
    try {
      const response = await api.post('/auth/register', {
        ...params,
        username: params.email
      })
      const { jwt, user } = response.data

      if (!user.confirmed) {
        return onOpen()
      }

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

        if (response?.data) {
          const { email, id, firstName, lastName, confirmed } = response.data
          setUser({
            email,
            id,
            firstName,
            lastName,
            confirmed
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
        setUser,
        signIn,
        signOut,
        register
      }}
    >
      {children}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Welcome on board!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack gap={4} alignItems={'flex-start'}>
              <Text>You account was created successfully.</Text>
              <Text>Please check your email to confirm your account.</Text>
            </VStack>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </AuthContext.Provider>
  )
}

export default AuthProvider
