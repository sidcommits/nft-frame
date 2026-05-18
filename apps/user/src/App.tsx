import { useEffect } from 'react';
import { useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react';
import { Header } from '@nft-frame/ui';
import { Steps } from './components/Steps';
import { useUserStore } from './store';

interface AppProps { initialDisplayId: string | null; }

export function App({ initialDisplayId }: AppProps) {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();
  const setDisplayId = useUserStore((s) => s.setDisplayId);

  useEffect(() => {
    if (initialDisplayId) setDisplayId(initialDisplayId);
  }, [initialDisplayId]);

  return (
    <>
      <Header
        logoText="FRAME"
        address={address}
        isConnected={isConnected}
        onWalletClick={() => open()}
      />
      <Steps />
    </>
  );
}
