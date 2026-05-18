import { useEffect } from 'react';
import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react';
import { BrowserProvider, ethers } from 'ethers';
import { Button } from '@nft-frame/ui';
import { CONTRACT_ADDRESS, ABI } from '@nft-frame/contracts';
import { useClientStore } from '../store';
import { CHAIN_ID } from '../config';
import styles from './SelectDisplay.module.css';

export function SelectDisplay() {
  const { address, isConnected, chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const { displaysOwned, displaySelected, setDisplaysOwned, setDisplaySelected } = useClientStore();

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
    <div className={styles.wrap}>
      {displaysOwned.map((id) => (
        <Button
          key={id}
          variant={displaySelected === id ? 'primary' : 'ghost'}
          onClick={() => setDisplaySelected(id)}
        >
          Display #{id}
        </Button>
      ))}
    </div>
  );
}
