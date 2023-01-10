import { ChakraProvider } from "@chakra-ui/react";

import { Main } from "$/pages/Main";
import { EthereumProvider } from "$/services/EthereumProvider";
import { theme } from "$/styles/theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <EthereumProvider>
        <Main />
      </EthereumProvider>
    </ChakraProvider>
  );
}

export default App;
