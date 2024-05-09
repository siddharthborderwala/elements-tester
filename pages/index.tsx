"use client";

import { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
import { Layout, Wallet } from "@/components";
import { CHAIN_NAME } from "@/config";
import { Label, Switch } from "@leapwallet/react-ui";
import ElementsSwaps from "@/components/swaps";

// const ElementsSwaps = dynamic(() => import("@/components/swaps"), {
//   ssr: false,
//   loading: () => (
//     <div className="h-[34rem] flex items-center justify-center">Loading...</div>
//   ),
// });

export default function Home() {
  const [chainName, setChainName] = useState(CHAIN_NAME);
  const [isDarkMode, setIsDarkMode] = useState(false);

  function onChainChange(chainName?: string) {
    setChainName(chainName!);
  }

  useEffect(() => {
    if (window) {
      document.querySelector(".leap-ui")?.classList.toggle("dark", isDarkMode);
    }
  }, [isDarkMode]);

  return (
    <Layout>
      <Wallet chainName={chainName} onChainChange={onChainChange} />
      <div className={`ml-8 w-[26rem]`}>
        <div className="flex justify-between">
          <Label htmlFor="dark-mode">Dark Mode</Label>
          <Switch
            id="dark-mode"
            checked={isDarkMode}
            onCheckedChange={() => setIsDarkMode(!isDarkMode)}
          />
        </div>
        <ElementsSwaps />
      </div>
    </Layout>
  );
}
