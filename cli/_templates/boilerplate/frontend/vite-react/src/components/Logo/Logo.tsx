import { Avatar, useColorMode } from '@chakra-ui/react'
import { IoIosRocket } from 'react-icons/io'

const Logo = () => {
  const { colorMode } = useColorMode()
  return (
    <Avatar
      bg={'orange'}
      icon={
        <IoIosRocket
          fontSize="1.5rem"
          color={colorMode == 'light' ? 'brand.900' : 'brand.50'}
        />
      }
    />
  )
}

export default Logo
