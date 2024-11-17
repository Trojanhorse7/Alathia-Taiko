import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./fonts.css";
import './global.css';
import '@rainbow-me/rainbowkit/styles.css'; 
import { BrowserRouter } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider  } from '@tanstack/react-query';
import { RainbowKitProvider, darkTheme, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, createStorage, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { GlobalContextProvider } from './store/index.tsx';

// Chain Details and Configs
const TaikoHeklaBlockchainTestnet = {
  id: 167009,
  name: 'Taiko Hekla',
  network: 'Taiko Hekla',
  iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAJUzaX6K4Ps7IEuSj8Q8lg3Y2VEMCrraklA&s',
  iconBackground: '#fff',
  nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    public: { http: ['https://rpc.hekla.taiko.xyz/'] },
    default: { http: ['https://rpc.hekla.taiko.xyz/'] }
  },
  blockExplorers: {
		default: {
			name: "Taiko Hekla Explorer",
			url: "https://hekla.taikoscan.network/", 
		},
	},
  testnet: true,
};

const { chains, publicClient } = configureChains(
  [TaikoHeklaBlockchainTestnet],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'Alathia',
  projectId: '84f7d185ffd1a2257b87511272401767',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  connectors,
  storage: createStorage({ storage: window.localStorage }),
})

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
      <React.StrictMode>
        <NextUIProvider >
          <WagmiConfig config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
              <RainbowKitProvider
                chains={chains}
                modalSize="compact"
                theme={darkTheme({
                  accentColor: "#dca54c",
                  accentColorForeground: 'black',
                  borderRadius: 'medium',
                })}
              >
                <GlobalContextProvider>
                  <App />
                </GlobalContextProvider>
              </RainbowKitProvider>
            </QueryClientProvider>
          </WagmiConfig>
        </NextUIProvider>
      </React.StrictMode>
  </BrowserRouter>
);
