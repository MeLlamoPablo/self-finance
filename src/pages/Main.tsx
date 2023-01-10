import { Center } from "@chakra-ui/react";
import { useAccount } from "wagmi";

import { Account } from "./Account";
import { Landing } from "./Landing";

export function Main() {
  const { isConnected } = useAccount();

  return (
    <Center flex={1} className="App-header">
      {isConnected ? <Account /> : <Landing />}
    </Center>
  );
}
