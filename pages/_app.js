import { ChakraProvider } from '@chakra-ui/react';
import theme from '../utils/theme';
import { SWRConfig } from 'swr';
import { swrOptions } from '../utils/api';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <SWRConfig value={swrOptions}>
        <Component {...pageProps}/>
      </SWRConfig>
    </ChakraProvider>
  );
}
 
export default MyApp;
