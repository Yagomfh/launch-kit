import PasswordInput from '@/components/Inputs/Password'

import { api } from '@/services'
import { VStack, Button, useToast, HStack } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'

const ChangePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Required'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required')
})

const ChangePasswordForm = () => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      password: '',
      passwordConfirmation: ''
    },
    onSubmit: async (values) => {
      setLoading(true)
      mutation.mutate(values)
      setLoading(false)
    },
    validationSchema: ChangePasswordSchema
  })

  const mutation = useMutation({
    mutationFn: async (values: {
      currentPassword: string
      password: string
      passwordConfirmation: string
    }) => api.post(`/auth/change-password`, values),
    onSuccess: () => {
      toast({
        title: 'Password updated!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top'
      })
      formik.resetForm()
    }
  })

  return (
    <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
      <VStack gap={4} alignItems={'flex-start'}>
        <PasswordInput
          formLabel="New Password"
          id="currentPassword"
          name="currentPassword"
          onChange={formik.handleChange}
          value={formik.values.currentPassword}
          isValid={
            !!formik.errors.currentPassword && formik.touched.currentPassword
          }
          errorMsg={formik.errors.currentPassword}
        />
        <HStack w={'100%'} gap={4}>
          <PasswordInput
            formLabel="Current Password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            isValid={!!formik.errors.password && formik.touched.password}
            errorMsg={formik.errors.password}
          />
          <PasswordInput
            formLabel="Confirm New Password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            onChange={formik.handleChange}
            value={formik.values.passwordConfirmation}
            isValid={
              !!formik.errors.passwordConfirmation &&
              formik.touched.passwordConfirmation
            }
            errorMsg={formik.errors.passwordConfirmation}
          />
        </HStack>
        <Button isLoading={loading} type="submit" mt={4} colorScheme="orange">
          Update password
        </Button>
      </VStack>
    </form>
  )
}

export default ChangePasswordForm
