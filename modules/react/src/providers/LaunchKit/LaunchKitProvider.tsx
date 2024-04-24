import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../../theme';

type Props = {
  children: React.ReactNode;
};

const LaunchKitProvider = ({ children }: Props) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default LaunchKitProvider;
