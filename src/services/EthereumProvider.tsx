import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { ReactNode } from "react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon } from "wagmi/chains";

const chains = [arbitrum, mainnet, polygon];

if (!process.env.REACT_APP_WALLETCONNECT_PROJECT_ID) {
  throw new Error("The WalletConnect Project ID is missing");
}

const { provider } = configureChains(chains, [
  walletConnectProvider({
    projectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID,
  }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

export function EthereumProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>
      <Web3Modal
        projectId={process.env.REACT_APP_WALLETCONNECT_PROJECT_ID}
        ethereumClient={ethereumClient}
        themeColor="blue"
        themeBackground="themeColor"
      />
    </>
  );
}
