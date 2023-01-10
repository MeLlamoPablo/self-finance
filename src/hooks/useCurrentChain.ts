import { useChainId, useClient } from "wagmi";

export function useCurrentChain() {
  const chainId = useChainId();
  const client = useClient();

  return client.chains?.find((chain) => chain.id === chainId);
}
