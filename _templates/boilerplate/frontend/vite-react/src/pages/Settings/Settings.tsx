import {
  Divider,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack
} from '@chakra-ui/react'
import Profile from './Tabs/Profile'
import Account from './Tabs/Account'

function Settings() {
  return (
    <VStack p={8} gap={8} alignItems={'stretch'}>
      <VStack alignItems={'flex-start'}>
        <Heading size={'md'}>Settings</Heading>
        <Text>Manage your account settings and set e-mail preferences.</Text>
      </VStack>
      <Divider />
      <Tabs
        variant="soft-rounded"
        colorScheme="orange"
        display={'flex'}
        gap={8}
      >
        <TabList flexDir={'column'} flex={1} gap={1}>
          <Tab justifyContent={'flex-start'}>Profile</Tab>
          <Tab justifyContent={'flex-start'}>Account</Tab>
        </TabList>

        <TabPanels flex={4}>
          <TabPanel p={0} w={'80%'}>
            <Profile />
          </TabPanel>
          <TabPanel p={0} w={'80%'}>
            <Account />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  )
}

export default Settings
