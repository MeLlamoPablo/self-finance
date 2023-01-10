import { Button, Tooltip } from "@chakra-ui/react";
import { Chain } from "wagmi";

import { useSendSelfTransaction } from "./logic";

export function SendSelfTransactionButton({
  address,
  chain,
  currencySymbol,
}: {
  address: string;
  chain: Chain;
  currencySymbol: string;
}) {
  const { errorCode, onSendSelfTransaction } = useSendSelfTransaction({
    address,
    chain,
  });

  const button = (
    <Button
      colorScheme="blue"
      disabled={!onSendSelfTransaction}
      onClick={onSendSelfTransaction}
    >
      Send {currencySymbol}
    </Button>
  );

  if (errorCode) {
    let errorLabel: string;

    switch (errorCode) {
      case "INSUFFICIENT_FUNDS": {
        errorLabel = `You need at least 0.001 ${currencySymbol}.`;
        break;
      }
      default: {
        errorLabel = "Something went wrong.";
      }
    }

    return <Tooltip label={errorLabel}>{button}</Tooltip>;
  }

  return button;
}
