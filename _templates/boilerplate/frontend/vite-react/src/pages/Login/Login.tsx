import { useRoutePaths, useSession } from '@/hooks'
import {
  Button,
  Checkbox,
  FormControl,
  HStack,
  Input,
  Link,
  VStack
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import AuthenticationLayout from '@/layouts/Authentication/Authentication'
import PasswordInput from '@/components/Inputs/Password'
import { useState } from 'react'
import * as Yup from 'yup'

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Required')
})

function Login() {
  const { REGISTER_PATH } = useRoutePaths()
  const { signIn } = useSession()
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    onSubmit: async (values) => {
      setLoading(true)
      await signIn(values)
      setLoading(false)
    },
    validationSchema: LoginSchema
  })

  return (
    <AuthenticationLayout
      heading="Log Into Your Account"
      subheading="Enter your email and password to login"
      navigateTo={{
        label: 'Sign Up',
        path: REGISTER_PATH
      }}
    >
      <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
        <VStack gap={4}>
          <FormControl>
            <Input
              id="email"
              name="email"
              type="email"
              variant="filled"
              placeholder="email@example.com"
              focusBorderColor="orange.200"
              onChange={formik.handleChange}
              value={formik.values.email}
              size="md"
            />
          </FormControl>

          <PasswordInput
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <HStack justifyContent={'space-between'} w={'100%'}>
            <Checkbox
              id="rememberMe"
              name="rememberMe"
              onChange={formik.handleChange}
              isChecked={formik.values.rememberMe}
              colorScheme="orange"
            >
              Remember me?
            </Checkbox>

            <Link colorScheme="orange" href="#">
              Forgot password?
            </Link>
          </HStack>
          <Button
            type="submit"
            width="full"
            mt={4}
            colorScheme="orange"
            isLoading={loading}
          >
            Login
          </Button>
        </VStack>
      </form>
    </AuthenticationLayout>
  )
}

export default Login
