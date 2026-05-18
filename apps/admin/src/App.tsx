import { Routes, Route } from 'react-router-dom';
import { useWeb3Modal, useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react';
import { BrowserProvider, ethers } from 'ethers';
import { useEffect } from 'react';
import { Header } from '@nft-frame/ui';
import { CONTRACT_ADDRESS, ABI } from '@nft-frame/contracts';
import { useAdminStore } from './store';
import { CHAIN_ID } from './config';
import { CreateDisplay } from './pages/CreateDisplay';
import { ResetDisplay } from './pages/ResetDisplay';
import { ChangeRent } from './pages/ChangeRent';

const NAV_LINKS = [
  { label: 'Create', href: '/create-display' },
  { label: 'Reset',  href: '/reset-display' },
  { label: 'Rent',   href: '/change-rent' },
];

export function App() {
  const { open } = useWeb3Modal();
  const { address, isConnected, chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const setDisplaysOwned = useAdminStore((s) => s.setDisplaysOwned);

  useEffect(() => {
    if (!isConnected || !walletProvider || chainId !== CHAIN_ID) return;
    const load = async () => {
      const provider = new BrowserProvider(walletProvider);
      const ctr = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
      const result = await ctr.getDisplaysOwned(address);
      setDisplaysOwned(result.map((n: bigint) => n.toString()));
    };
    load().catch(console.error);
  }, [isConnected, address, chainId, walletProvider]);

  return (
    <>
      <Header
        logoText="QR ADMIN"
        links={NAV_LINKS}
        address={address}
        isConnected={isConnected}
        onWalletClick={() => open()}
      />
      <Routes>
        <Route path="/" element={<CreateDisplay />} />
        <Route path="/create-display" element={<CreateDisplay />} />
        <Route path="/reset-display" element={<ResetDisplay />} />
        <Route path="/change-rent" element={<ChangeRent />} />
      </Routes>
    </>
  );
}
