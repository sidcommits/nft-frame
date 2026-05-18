import { useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react';
import { Header } from '@nft-frame/ui';
import { SelectDisplay } from './components/SelectDisplay';
import { QRDisplay } from './components/QRDisplay';
import { useClientStore } from './store';

export function App() {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();
  const displaySelected = useClientStore((s) => s.displaySelected);

  return (
    <>
      <Header
        logoText="FRAME"
        address={address}
        isConnected={isConnected}
        onWalletClick={() => open()}
      />
      {isConnected && !displaySelected && <SelectDisplay />}
      {displaySelected && <QRDisplay />}
    </>
  );
}
