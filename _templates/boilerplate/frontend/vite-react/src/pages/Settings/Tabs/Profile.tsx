import { User } from '@/contexts'
import { useSession } from '@/hooks'
import { api } from '@/services'
import {
  VStack,
  Heading,
  Divider,
  Text,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Button,
  useToast
} from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'

const ProfileSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required')
})

const Profile = () => {
  const toast = useToast()
  const { user, setUser } = useSession()
  const [loading, setLoading] = useState(false)

  const mutation = useMutation({
    mutationFn: async (values: Partial<User>) =>
      api.put(`/users/${user?.id}`, values),
    onSuccess: ({ data }) => {
      setUser(data)
      toast({
        title: 'Profile updated!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top'
      })
    }
  })
  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || ''
    },
    onSubmit: async (values) => {
      setLoading(true)
      mutation.mutate(values)
      setLoading(false)
    },
    validationSchema: ProfileSchema
  })

  return (
    <VStack gap={6} alignItems={'stretch'}>
      <VStack alignItems={'flex-start'}>
        <Heading size={'sm'}>Profile</Heading>
        <Text>This is how others will see you on the site.</Text>
      </VStack>
      <Divider />
      <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
        <VStack gap={4} alignItems={'flex-start'}>
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
              focusBorderColor="orange.200"
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
              focusBorderColor="orange.200"
              onChange={formik.handleChange}
              value={formik.values.lastName}
              size="md"
            />
            <FormErrorMessage>{formik.errors.lastName}</FormErrorMessage>
          </FormControl>
          <Button isLoading={loading} type="submit" mt={4} colorScheme="orange">
            Update Profile
          </Button>
        </VStack>
      </form>
    </VStack>
  )
}

export default Profile
