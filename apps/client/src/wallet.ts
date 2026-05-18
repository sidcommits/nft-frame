import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react';
import { CHAIN_ID, INFURA_ID, NETWORK_NAME } from './config';

createWeb3Modal({
  ethersConfig: defaultConfig({
    metadata: { name: 'NFT Frame Client', description: '', url: '', icons: [] },
  }),
  chains: [{ chainId: CHAIN_ID, name: NETWORK_NAME, currency: 'ETH', explorerUrl: 'https://etherscan.io', rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}` }],
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID as string,
});
