import { type WalletClient, WalletClientContext } from "@leapwallet/elements";
import { useWallet } from "@cosmos-kit/react";
import { useMemo } from "react";
import Long from "long";
import { useChain, useManager } from "@cosmos-kit/react";
import { chains } from "chain-registry";

export const useElementsWalletClient = (): WalletClient => {
  const { mainWallet } = useWallet();

  // @ts-ignore
  const walletClient: WalletClient = useMemo(() => {
    if (!mainWallet?.client) {
      return {
        enable: () => {
          throw new Error("Wallet client is not available");
        },
        getAccount: () => {
          throw new Error("Wallet client is not available");
        },
        getSigner: () => {
          throw new Error("Wallet client is not available");
        },
      };
    }

    const { client } = mainWallet;

    return {
      enable: async (chainIds: string | string[]) => {
        const _chains = [];
        for (const chainId of Array.isArray(chainIds) ? chainIds : [chainIds]) {
          if (chains.some((chain) => chain.chain_id === chainId)) {
            _chains.push(chainId);
          }
        }
        if (!("enable" in client)) {
          return;
        }
        return client!.enable!(_chains);
      },
      // @ts-ignore
      getAccount: async (chainId: string) => {
        if (!("enable" in client)) {
          return;
        }
        await client!.enable!(chainId);
        const result = await client!.getAccount!(chainId);
        return {
          bech32Address: result.address,
          pubKey: result.pubkey,
          isNanoLedger: !!result.isNanoLedger,
        };
      },
      getSigner: async (chainId: string) => {
        const signer = client!.getOfflineSignerDirect!(chainId);
        const aminoSigner = client!.getOfflineSignerAmino!(chainId);

        return {
          signDirect: async (signerAddress, signDoc) => {
            const result = await signer.signDirect(signerAddress, {
              ...signDoc,
              accountNumber: BigInt(signDoc.accountNumber.toString()),
            });
            return {
              signature: new Uint8Array(
                Buffer.from(result.signature.signature, "base64")
              ),
              signed: {
                ...result.signed,
                accountNumber: Long.fromString(
                  result.signed.accountNumber.toString()
                ),
              },
            };
          },
          signAmino: async (address, signDoc) => {
            const result = await aminoSigner.signAmino(address, signDoc);
            return {
              signature: new Uint8Array(
                Buffer.from(result.signature.signature, "base64")
              ),
              signed: result.signed,
            };
          },
        };
      },
    } satisfies WalletClient;
  }, [mainWallet]);

  return walletClient;
};

export const useElementsWalletConfig = (
  defaultChain = "osmosis-1"
): WalletClientContext => {
  const walletClient = useElementsWalletClient();
  const { address } = useChain(
    chains.find((c) => c.chain_id === defaultChain)?.chain_name ?? "osmosis"
  );
  const { getWalletRepo } = useManager();
  const { mainWallet } = useWallet();

  const walletStatus = mainWallet?.walletStatus;

  return useMemo(() => {
    return {
      userAddress: walletStatus === "Connected" ? address : undefined,
      walletClient,
      connectWallet: (chainId: unknown) => {
        let _chainId = chainId;
        if (typeof chainId !== "string") {
          _chainId = "osmosis-1";
        }
        const chain = chains.find((c) => c.chain_id === _chainId);
        if (!chain) {
          throw new Error(`Chain ${chainId} not supported`);
        }
        return getWalletRepo(chain.chain_name).connect();
      },
    } as const;
  }, [address, getWalletRepo, walletStatus, walletClient]);
};
