import logo from "$/assets/logo.png";
import { Image, Stack, Text } from "@chakra-ui/react";

export function Header() {
  return (
    <Stack as="header" align="center" direction="row">
      <Image
        src={logo}
        boxSize="2.5rem"
        boxShadow="dark-lg"
        borderRadius="15%"
      />
      <Text fontSize="3xl">self finance</Text>
    </Stack>
  );
}
