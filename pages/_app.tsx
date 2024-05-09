"use client";

import "@leapwallet/react-ui/styles.css";
import "@interchain-ui/react/styles";

import "../styles/globals.css";
import "@leapwallet/elements/styles.css";

import type { AppProps } from "next/app";
import { SignerOptions, WalletModalProps, wallets } from "cosmos-kit";
import { ChainProvider } from "@cosmos-kit/react";
import { assets, chains } from "chain-registry";
import { Box, ThemeProvider, useTheme } from "@interchain-ui/react";
import localFont from "next/font/local";
import { Dialog, DialogContent, DialogHeader } from "@leapwallet/react-ui";

const myFont = localFont({ src: "../assets/fonts/Mabry-Pro.woff2" });

const WalletModal = (props: WalletModalProps) => {
  console.log(props.walletRepo);

  return (
    <Dialog modal={true} open={props.isOpen} onOpenChange={props.setOpen}>
      <DialogContent>
        <DialogHeader>Wallet Modal</DialogHeader>
        <div>hi</div>
      </DialogContent>
    </Dialog>
  );
};

function CreateCosmosApp({ Component, pageProps }: AppProps) {
  const { themeClass } = useTheme();

  const signerOptions: SignerOptions = {
    // signingStargate: () => {
    //   return getSigningCosmosClientOptions();
    // }
  };

  return (
    <ThemeProvider>
      <ChainProvider
        chains={chains}
        assetLists={assets}
        wallets={wallets}
        walletConnectOptions={{
          signClient: {
            projectId: "a8510432ebb71e6948cfd6cde54b70f7",
            relayUrl: "wss://relay.walletconnect.org",
            metadata: {
              name: "CosmosKit Template",
              description: "CosmosKit dapp template",
              url: "https://docs.cosmology.zone/cosmos-kit/",
              icons: [],
            },
          },
        }}
        // @ts-ignore
        signerOptions={signerOptions}
      >
        <Box
          className={`${themeClass} ${myFont.className} leap-ui bg-[#222222]`}
          minHeight="100dvh"
        >
          <Component {...pageProps} />
        </Box>
      </ChainProvider>
    </ThemeProvider>
  );
}

export default CreateCosmosApp;
