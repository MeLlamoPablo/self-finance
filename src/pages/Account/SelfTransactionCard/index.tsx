import coinTransactionImg from "$/assets/coin-transaction.png";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useAccount } from "wagmi";

import { SendSelfTransactionButton } from "./SendSelfTransactionButton";

import { useCurrentChain } from "$/hooks/useCurrentChain";

export function SelfTransactionCard() {
  const { address } = useAccount();
  const chain = useCurrentChain();
  const currencySymbol = chain?.nativeCurrency?.symbol ?? "ETH";

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
      <Box overflow="hidden">
        <Image
          w={{ base: "100%", sm: "20rem" }}
          h={{ base: "15rem", sm: "100%" }}
          objectFit="cover"
          src={coinTransactionImg}
          transform="scale(1.2)"
        />
      </Box>

      <Stack>
        <CardBody>
          <Heading size="md">Transact with yourself</Heading>

          <Text py="2">
            It's giving season, send some {currencySymbol} to yourself! There's
            no risk of losing them, because you can only send them to yourself.
          </Text>
        </CardBody>

        <CardFooter>
          {address && chain && (
            <SendSelfTransactionButton
              address={address}
              chain={chain}
              currencySymbol={currencySymbol}
            />
          )}
        </CardFooter>
      </Stack>
    </Card>
  );
}
