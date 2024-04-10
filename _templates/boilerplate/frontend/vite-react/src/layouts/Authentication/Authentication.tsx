import { Logo } from '@/components'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import {
  Center,
  HStack,
  VStack,
  DarkMode,
  LightMode,
  Heading,
  IconButton,
  Button,
  Text,
  useColorMode
} from '@chakra-ui/react'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  heading: string
  subheading: string
  navigateTo?: {
    label: string
    path: string
  }
  children: React.ReactNode
}

const AuthenticationLayout: FC<Props> = ({
  heading,
  subheading,
  navigateTo,
  children
}) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const navigate = useNavigate()

  return (
    <Center h="100vh" w="100wh">
      <HStack
        boxShadow="lg"
        rounded="md"
        bg="white"
        borderWidth={1}
        overflow={'hidden'}
        w={'95%'}
        h={'95%'}
      >
        <VStack
          flex={1}
          bgColor={colorMode == 'light' ? 'black' : 'white'}
          h={'100%'}
          p={8}
          alignItems={'flex-start'}
          justifyContent={'space-between'}
        >
          <HStack>
            {colorMode === 'light' ? (
              <DarkMode>
                <Logo />
              </DarkMode>
            ) : (
              <LightMode>
                <Logo />
              </LightMode>
            )}
            <Heading size="md" color={colorMode == 'light' ? 'white' : 'black'}>
              LaunchKit CLI
            </Heading>
          </HStack>
          <VStack gap={4}>
            <Text color={colorMode == 'light' ? 'white' : 'black'} w={'100%'}>
              A CLI to save you countless hours of work and helped you deliver
              stunning web apps faster than ever before
            </Text>

            <Text color={colorMode == 'light' ? 'white' : 'black'} w={'100%'}>
              Made with ❤️ by LaunchKit CLI
            </Text>
          </VStack>
        </VStack>
        <VStack
          flex={1}
          bgColor={colorMode == 'light' ? 'white' : 'black'}
          h={'100%'}
          p={8}
        >
          <HStack w={'100%'} justifyContent={'space-between'}>
            <IconButton
              size={'sm'}
              aria-label="Search database"
              colorScheme="orange"
              icon={colorMode == 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
            />
            {navigateTo && (
              <Button variant="ghost" onClick={() => navigate(navigateTo.path)}>
                {navigateTo.label}
              </Button>
            )}
          </HStack>
          <VStack flex={1} justifyContent={'center'} gap={8} w={'60%'}>
            <VStack gap={4}>
              <Heading size={'md'}>{heading}</Heading>
              <Text fontWeight={300} textAlign={'center'}>
                {subheading}
              </Text>
            </VStack>
            {children}
          </VStack>
        </VStack>
      </HStack>
    </Center>
  )
}

export default AuthenticationLayout
