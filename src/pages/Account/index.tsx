import { Grid, Stack, Text } from "@chakra-ui/react";
import { useAccount, useEnsName } from "wagmi";

import { Header } from "./Header";
import { SelfTransactionCard } from "./SelfTransactionCard";
import { Sidebar } from "./Sidebar";
export function Account() {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });

  return (
    <Stack padding={6} spacing={6} maxWidth="60rem" height="100%" width="100%">
      <Header />
      <Grid templateColumns={{ base: "1fr", lg: "auto 15rem" }} gap={6}>
        <Stack spacing={6}>
          <Text fontSize="lg">
            {ensName ? `Hello, ${ensName.replace(".eth", "")}` : "Hello"}! What
            would you like to do today?
          </Text>
          <SelfTransactionCard />
        </Stack>
        <Sidebar />
      </Grid>
    </Stack>
  );
}
