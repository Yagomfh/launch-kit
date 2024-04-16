import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { NavBar } from './components'
import { AuthProvider } from './providers'
import { Router } from './router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { theme } from '@/theme'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <AuthProvider>
            <NavBar />
            <Router />
          </AuthProvider>
        </BrowserRouter>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default App
