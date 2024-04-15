import { User } from '@/contexts'
import { useSession } from '@/hooks'
import { api } from '@/services'
import {
  VStack,
  Input,
  Button,
  useToast,
  FormControl,
  FormErrorMessage,
  FormLabel
} from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'

const ChangeEmailSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required')
})

const ChangeEmailForm = () => {
  const [loading, setLoading] = useState(false)
  const { user, setUser } = useSession()
  const toast = useToast()
  const formik = useFormik({
    initialValues: {
      email: user?.email || ''
    },
    onSubmit: async (values) => {
      setLoading(true)
      mutation.mutate(values)
      setLoading(false)
    },
    validationSchema: ChangeEmailSchema
  })

  const mutation = useMutation({
    mutationFn: async (values: Partial<User>) =>
      api.put(`/users/${user?.id}`, values),
    onSuccess: ({ data }) => {
      setUser(data)
      toast({
        title: 'Email updated!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top'
      })
    }
  })

  return (
    <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
      <VStack gap={4} alignItems={'flex-start'}>
        <FormControl isInvalid={!!formik.errors.email && formik.touched.email}>
          <FormLabel>Email</FormLabel>
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
          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
        </FormControl>
        <Button isLoading={loading} type="submit" mt={4} colorScheme="orange">
          Update email
        </Button>
      </VStack>
    </form>
  )
}

export default ChangeEmailForm
