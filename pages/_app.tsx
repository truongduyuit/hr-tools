import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { Loading } from "../components/loading";
import store from "../redux/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <AppChild Component={Component} pageProps={pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

function AppChild({ Component, pageProps }: any) {
  return (
    <Box id="body-container">
      <Component {...pageProps} />
      <Loading />
    </Box>
  );
}

export default MyApp;
