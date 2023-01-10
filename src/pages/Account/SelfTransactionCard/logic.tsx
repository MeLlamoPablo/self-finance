import { Link, useToast } from "@chakra-ui/react";
import { parseEther } from "ethers/lib/utils";
import { useMemo } from "react";
import {
  Chain,
  usePrepareSendTransaction,
  UserRejectedRequestError,
  useSendTransaction,
} from "wagmi";

export function useSendSelfTransaction({
  address,
  chain,
}: {
  address: string;
  chain: Chain;
}) {
  const toast = useToast();

  const { config, error } = usePrepareSendTransaction({
    request: address
      ? {
          to: address,
          value: parseEther("0.001"),
        }
      : undefined,
  });
  const { sendTransactionAsync } = useSendTransaction(config);

  const nativeCurrencySymbol = chain.nativeCurrency.symbol;
  const defaultBlockExplorerUrl = chain.blockExplorers?.default?.url;

  const onSendSelfTransaction = useMemo(() => {
    if (!sendTransactionAsync) {
      return undefined;
    }

    return async () => {
      /*
       * In a larger app, I would probably abstract away this logic to a generic
       * hook so that we can reuse the success and error handlers.
       *
       * In this app, it would be unnecessarily complex.
       */
      try {
        const result = await sendTransactionAsync();

        toast({
          status: "info",
          title: "Transaction sent",
          description: defaultBlockExplorerUrl ? (
            <>
              <Link
                href={`${defaultBlockExplorerUrl}/tx/${result.hash}`}
                isExternal
              >
                View on block explorer
              </Link>
              .
            </>
          ) : undefined,
        });

        await result.wait();

        toast({
          status: "success",
          title: "Success!",
          description: `Your ${nativeCurrencySymbol} is back on your wallet.`,
        });
      } catch (e) {
        if (e instanceof UserRejectedRequestError) {
          // Don't show a toast when the user rejects the transaction.
          // They already know that they aborted the process, so the toast
          // would be redundant.
          return;
        }

        toast({
          status: "error",
          title: "Something went wrong",
          description: `Please try again in a few minutes.`,
        });
      }
    };
  }, [
    defaultBlockExplorerUrl,
    nativeCurrencySymbol,
    sendTransactionAsync,
    toast,
  ]);

  return {
    // wagmi's types seem to be wrong as they are lacking `code`.
    errorCode: (error as any)?.code as string | undefined,
    onSendSelfTransaction,
  };
}
