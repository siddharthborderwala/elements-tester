"use client";

import { Swaps, WalletClientContextProvider } from "@leapwallet/elements";
import { useElementsWalletConfig } from "@/hooks/use-elements-client-config";

const logWithLabel = (printable: unknown) => {
  return (...args: unknown[]) => {
    console.log(`%c${printable}\n`, "font-weight: bold;", ...args);
  };
};

const ElementsSwaps = () => {
  const value = useElementsWalletConfig();

  return (
    <WalletClientContextProvider value={value}>
      <Swaps
        title="Testing Elements V2 Beta"
        txnLifecycleHooks={{
          onTxnComplete: logWithLabel("🎉 TXN complete"),
          onTxnSignInit: logWithLabel("🟡 TXN sign init"),
          onTxnSignApproved: logWithLabel("🟢 TXN sign approved"),
          onTxnSignFailed: logWithLabel("🔴 TXN sign failed"),
          onTxnInProgress: (d) => {
            console.log("⏳ TXN in progress", d);
            return () => {
              console.log("⌛ TXN in progress cleanup");
            };
          },
        }}
      />
    </WalletClientContextProvider>
  );
};

export default ElementsSwaps;
