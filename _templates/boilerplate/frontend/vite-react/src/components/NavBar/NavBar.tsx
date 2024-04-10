import { useRoutePaths, useSession } from '@/hooks'
import { Link } from 'react-router-dom'
import { CanAccess } from '../CanAccess'
import {
  Avatar,
  HStack,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  SkeletonCircle,
  useColorMode
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Logo } from '../Logo'

function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isAuthenticated, signOut, user, loadingUserData } = useSession()
  const { ROOT_PATH, USERS_PATH } = useRoutePaths()

  if (!isAuthenticated) return null

  return (
    <HStack p={4} boxShadow="sm" justifyContent={'space-between'}>
      <HStack gap={8}>
        <HStack gap={4}>
          <Logo />
          <Heading size="md">LaunchKit CLI</Heading>
        </HStack>
        <HStack gap={4}>
          <Link to={ROOT_PATH}>Home</Link>
          <CanAccess permissions={['users.list']}>
            <Link to={USERS_PATH}>Users</Link>
          </CanAccess>
        </HStack>
      </HStack>
      <HStack gap={4}>
        <IconButton
          size={'sm'}
          aria-label="Search database"
          icon={colorMode == 'light' ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
        />
        <Menu>
          <MenuButton>
            {loadingUserData ? (
              <SkeletonCircle size="8" />
            ) : (
              <Avatar size="sm" name={`${user?.firstName} ${user?.lastName}`} />
            )}
          </MenuButton>
          <MenuList>
            <CanAccess permissions={['users.list']}>
              <MenuItem>
                <Link to={USERS_PATH}>Users</Link>
              </MenuItem>
              <MenuDivider />
            </CanAccess>
            <MenuItem onClick={signOut}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </HStack>
  )
}

export default NavBar
