import ReactDOM from 'react-dom/client'
import App from './App'
import { createStandaloneToast } from '@chakra-ui/react'

const { ToastContainer } = createStandaloneToast()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <App />
    <ToastContainer />
  </>
)
