"use client";

import {
  RouteSettingsProvider,
  WalletClientContextProvider,
  Swaps,
} from "@leapwallet/elements";
import { useElementsWalletConfig } from "@/hooks/use-elements-client-config";
import { useState } from "react";
import { Button } from "@leapwallet/react-ui";

const logWithLabel = (printable: unknown) => {
  return (...args: unknown[]) => {
    console.log(`%c${printable}\n`, "font-weight: bold;", ...args);
  };
};

const ElementsSwaps = () => {
  const value = useElementsWalletConfig();
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-[30rem] !mt-8">
      {/* <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Open IBC Swaps Modal
      </Button> */}
      <RouteSettingsProvider>
        <WalletClientContextProvider value={value}>
          <Swaps
            className="border"
            defaultValues={{
              sourceChainId: "pacific-1",
              sourceAsset:
                "cw20:sei1hrndqntlvtmx2kepr0zsfgr7nzjptcc72cr4ppk4yav58vvy7v3s4er8ed",
              destinationChainId: "pacific-1",
              destinationAsset:
                "cw20:sei1hrndqntlvtmx2kepr0zsfgr7nzjptcc72cr4ppk4yav58vvy7v3s4er8ed",
            }}
            allowedDestinationChains={[
              {
                chainId: "pacific-1",
                assetDenoms: [
                  "usei",
                  "cw20:sei1hrndqntlvtmx2kepr0zsfgr7nzjptcc72cr4ppk4yav58vvy7v3s4er8ed",
                ],
              },
            ]}
            // txnLifecycleHooks={{
            //   onTxnComplete: logWithLabel("🎉 TXN complete"),
            //   onTxnSignInit: logWithLabel("🟡 TXN sign init"),
            //   onTxnSignApproved: logWithLabel("🟢 TXN sign approved"),
            //   onTxnSignFailed: logWithLabel("🔴 TXN sign failed"),
            //   onTxnInProgress: (d) => {
            //     console.log("⏳ TXN in progress", d);
            //     return () => {
            //       console.log("⌛ TXN in progress cleanup");
            //     };
            //   },
            // }}
          />
        </WalletClientContextProvider>
      </RouteSettingsProvider>
    </div>
  );
};

export default ElementsSwaps;
