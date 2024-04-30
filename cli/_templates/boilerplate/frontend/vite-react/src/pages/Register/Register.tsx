import PasswordInput from '@/components/Inputs/Password'
import { useRoutePaths, useSession } from '@/hooks'
import AuthenticationLayout from '@/layouts/Authentication/Authentication'
import {
  VStack,
  FormControl,
  Input,
  Button,
  HStack,
  FormLabel,
  Text,
  Link,
  FormErrorMessage
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required')
})

function Register() {
  const { LOGIN_PATH } = useRoutePaths()
  const { register } = useSession()
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    onSubmit: async (values) => {
      setLoading(true)
      await register(values)
      setLoading(false)
    },
    validationSchema: SignupSchema
  })

  return (
    <AuthenticationLayout
      heading="Create Your Account"
      subheading="Enter your email and password to create your account"
      navigateTo={{
        label: 'Log In',
        path: LOGIN_PATH
      }}
    >
      <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
        <VStack gap={4}>
          <HStack gap={4} alignItems={'flex-start'}>
            <FormControl
              isInvalid={!!formik.errors.firstName && formik.touched.firstName}
            >
              <FormLabel>First Name</FormLabel>
              <Input
                id="firstName"
                name="firstName"
                type="firstName"
                variant="filled"
                placeholder="John"
                focusBorderColor="brand.200"
                onChange={formik.handleChange}
                value={formik.values.firstName}
                size="md"
              />
              <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={!!formik.errors.lastName && formik.touched.lastName}
            >
              <FormLabel>Last Name</FormLabel>
              <Input
                id="lastName"
                name="lastName"
                type="lastName"
                variant="filled"
                placeholder="Doe"
                focusBorderColor="brand.200"
                onChange={formik.handleChange}
                value={formik.values.lastName}
                size="md"
              />
              <FormErrorMessage>{formik.errors.lastName}</FormErrorMessage>
            </FormControl>
          </HStack>

          <FormControl
            isInvalid={!!formik.errors.email && formik.touched.email}
          >
            <FormLabel>Email</FormLabel>
            <Input
              id="email"
              name="email"
              type="email"
              variant="filled"
              placeholder="email@example.com"
              focusBorderColor="brand.200"
              onChange={formik.handleChange}
              value={formik.values.email}
              size="md"
            />
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          </FormControl>

          <PasswordInput
            formLabel="Password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            isValid={!!formik.errors.password && formik.touched.password}
            errorMsg={formik.errors.password}
          />

          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            placeholder="confirm password"
            isValid={
              !!formik.errors.confirmPassword && formik.touched.confirmPassword
            }
            errorMsg={formik.errors.confirmPassword}
          />

          <Button
            isLoading={loading}
            type="submit"
            width="full"
            mt={4}
            colorScheme="brand"
          >
            Sign Up
          </Button>
          <Text fontWeight={200} fontSize={'sm'} textAlign={'center'}>
            By clicking continue, you agree to our{' '}
            <Link href="#" fontWeight={400}>
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="#" fontWeight={400}>
              Privacy Policy
            </Link>{' '}
            .
          </Text>
        </VStack>
      </form>
    </AuthenticationLayout>
  )
}

export default Register
