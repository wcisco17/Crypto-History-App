import { extendTheme } from '@chakra-ui/react';

export const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
  colors: {
    brand: {
      main: '#1a202c',
      textColor: '#FFFFFF',
      positive: '#89FF91',
      negative: '#F54445',
      gray: '#505050'
    }
  }
};

const theme = extendTheme({ config });

export default theme;