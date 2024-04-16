---
to: apps/<%=service%>/src/hooks/useEmailConfirmation/useEmailConfirmation.ts
---
import { useToast } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

function useEmailConfirmation() {
  const [searchParams] = useSearchParams()
  const verified = Boolean(searchParams.get('verified'))
  const toast = useToast()

  useEffect(() => {
    if (!verified || !toast) return

    setTimeout(() => {
      toast({
        title: 'Account Verified',
        description: 'You can now login to your account',
        status: 'success',
        position: 'top',
        duration: 9000,
        isClosable: true
      })
    }, 500)
  }, [verified, toast])

  return { verified }
}

export default useEmailConfirmation
