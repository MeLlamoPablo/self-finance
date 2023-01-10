import {
  Button,
  Flex,
  Icon,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Web3NetworkSwitch } from "@web3modal/react";
import BN from "bn.js";
import { ComponentType, useCallback, useMemo } from "react";
import { FiDollarSign, FiLink, FiLogOut } from "react-icons/fi";
import {
  useAccount,
  useBalance,
  useChainId,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";

import { getGravatarURL } from "$/utils/gravatar";

export function Sidebar() {
  const { address } = useAccount();
  const chainId = useChainId();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });
  const { data: ensAvatar } = useEnsAvatar({ address });
  const { data: ensName } = useEnsName({ address });

  const formattedBalance = useMemo(() => {
    if (!balance) {
      return undefined;
    }

    const decimalPlaces = 4;

    const balanceBN = new BN(balance.value.toString());
    const roundedDown = balanceBN
      .divRound(new BN(10).pow(new BN(balance.decimals - decimalPlaces)))
      .toNumber();

    const formatted = roundedDown / 10 ** decimalPlaces;
    return `${formatted} ${balance.symbol}`;
  }, [balance]);

  const onDisconnectClick = useCallback(() => {
    disconnect();
  }, [disconnect]);

  if (!address) {
    return null;
  }
  return (
    <Flex
      align="center"
      flexDirection="column"
      gap={2}
      gridRow={{ base: 1, lg: "initial" }}
    >
      <Image
        src={ensAvatar ?? getGravatarURL(address)}
        w="8rem"
        borderRadius="100%"
      />
      <Text fontWeight="semibold">
        {ensName ?? `${address.slice(0, 6)}...${address.slice(-4)}`}
      </Text>
      <Web3NetworkSwitch />
      <Stack spacing={3} mt={10} w="100%">
        <InfoRow Icon={FiLink} text={`Chain ID: ${chainId}`} />
        {formattedBalance && (
          <InfoRow Icon={FiDollarSign} text={formattedBalance} />
        )}
        <Button
          leftIcon={<FiLogOut />}
          variant="link"
          colorScheme="red"
          alignSelf="start"
          onClick={onDisconnectClick}
        >
          Sign out
        </Button>
      </Stack>
    </Flex>
  );
}

function InfoRow({
  Icon: RowIcon,
  text,
}: {
  Icon: ComponentType;
  text: string;
}) {
  const color = useColorModeValue("blackAlpha.600", "whiteAlpha.600");

  return (
    <Stack align="center" color={color} direction="row">
      <Icon as={RowIcon} />
      <Text fontWeight="bold">{text}</Text>
    </Stack>
  );
}
