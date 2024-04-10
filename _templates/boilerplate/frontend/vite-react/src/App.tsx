import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { NavBar } from './components'
import { AuthProvider } from './providers'
import { Router } from './router'

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <AuthProvider>
          <NavBar />
          <Router />
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
