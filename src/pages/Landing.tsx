import logo from "$/assets/logo.png";
import { Button, Image, Stack, Text } from "@chakra-ui/react";
import { useWeb3Modal } from "@web3modal/react";
import React, { useCallback } from "react";

export function Landing() {
  const { open: openWeb3Modal } = useWeb3Modal();

  const onConnectWalletClick = useCallback(() => {
    openWeb3Modal().catch(console.error);
  }, [openWeb3Modal]);

  return (
    <Stack
      as="header"
      align="center"
      spacing={10}
      direction={{ base: "column", lg: "row" }}
    >
      <Image
        src={logo}
        boxSize="30vmin"
        boxShadow="dark-lg"
        borderRadius="15%"
      />
      <Stack align="center" spacing={5} px={5}>
        <Stack align="center" textAlign="center">
          <Text fontSize={["4xl", "5xl", "6xl"]}>self finance</Text>
          <Text fontSize="xl" maxWidth="50vmin">
            Meet the safest dApp yet — you can only transact with yourself!
          </Text>
        </Stack>
        <Button
          bg="blue.900"
          color="white"
          size="lg"
          onClick={onConnectWalletClick}
          _hover={{ bg: "blue.700" }}
        >
          Connect wallet
        </Button>
      </Stack>
    </Stack>
  );
}
