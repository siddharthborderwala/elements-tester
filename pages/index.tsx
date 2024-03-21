"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Layout, Wallet } from "@/components";
import { CHAIN_NAME } from "@/config";

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
        className={`ml-8 leap-ui w-[26rem] bg-transparent ${
          isDarkMode ? "dark" : ""
        }`}
      >
        <div className="flex justify-between mb-4">
          <p>Dark Mode</p>
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={() => setIsDarkMode(!isDarkMode)}
          />
        </div>
        <ElementsSwaps />
      </div>
    </Layout>
  );
}
