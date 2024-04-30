import { ChangeEmailForm, ChangePasswordForm } from '@/components/Forms'
import { useSession } from '@/hooks'
import { api } from '@/services'
import {
  VStack,
  Heading,
  Divider,
  Text,
  Button,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useToast
} from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { useRef } from 'react'

const Account = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user, signOut } = useSession()
  const toast = useToast()
  const cancelRef = useRef()
  const mutation = useMutation({
    mutationFn: async () => api.delete(`/users/${user?.id}`),
    onSuccess: () => {
      onClose()
      signOut()
      toast({
        title: 'Account deleted. See you soon',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top'
      })
    }
  })

  return (
    <VStack gap={6} alignItems={'stretch'}>
      <VStack alignItems={'flex-start'}>
        <Heading size={'sm'}>Account</Heading>
        <Text>Update your account settings and delete your account.</Text>
      </VStack>
      <Divider />
      <ChangeEmailForm />
      <Divider />
      <Heading size={'sm'}>Password</Heading>
      <ChangePasswordForm />
      <Divider />
      <Heading size={'sm'}>Danger zone</Heading>
      <VStack gap={4} alignItems={'flex-start'}>
        <Text>Delete your account and all associated data.</Text>
        <Button colorScheme="red" variant="outline" onClick={onOpen}>
          Delete Account
        </Button>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef as any}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Account
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards and all your
                data will be permanently deleted.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef as any} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => mutation.mutate()}
                  ml={3}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </VStack>
    </VStack>
  )
}

export default Account
