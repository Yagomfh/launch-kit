import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    brand: {
      50: '#f8f9fa',
      100: '#e9ecef',
      200: '#dee2e6', // dark
      300: '#ced4da', // dark hover
      400: '#adb5bd', // dark pressed
      500: '#6c757d', // light
      600: '#495057', // light hover
      700: '#343a40', // light pressed
      800: '#212529',
      900: '#0e0f14'
    }
  }
})
