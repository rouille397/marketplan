import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ConfluxEspace } from "@thirdweb-dev/chains";
import "../styles/globals.css";
import Header from "../components/Header";

// This is the chainId your dApp will work on.
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain={ConfluxEspace}>
  
        <title>Nitfee Marketplace</title>
  
      <Header />
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;

