import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({

  colors: {
    gray: {
      "100": "#786F6F"
    },
    red: {
      "100": "#DA1A2C",
    }
  },
  fonts: {
    heading: 'Poppins',
    body: 'Poppins'
  },
  styles: {
    global: {
      body: {
        bg: '',
        color: '',
      }
    }
  }
})