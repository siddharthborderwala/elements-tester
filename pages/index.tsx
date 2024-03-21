"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Layout, Wallet } from "@/components";
import { CHAIN_NAME } from "@/config";
import { Label, Switch } from "@leapwallet/react-ui";

const ElementsSwaps = dynamic(() => import("@/components/swaps"), {
  ssr: false,
  loading: () => (
    <div className="h-[34rem] flex items-center justify-center">Loading...</div>
  ),
});

export default function Home() {
  const [chainName, setChainName] = useState(CHAIN_NAME);
  const [isDarkMode, setIsDarkMode] = useState(false);

  function onChainChange(chainName?: string) {
    setChainName(chainName!);
  }

  return (
    <Layout>
      <Wallet chainName={chainName} onChainChange={onChainChange} />
      <div
        className={`ml-8 leap-ui w-[26rem] !bg-transparent ${
          isDarkMode ? "dark" : ""
        }`}
      >
        <div className="flex justify-between mb-4">
          <Label htmlFor="dark-mode" className="text-white">
            Dark Mode
          </Label>
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
