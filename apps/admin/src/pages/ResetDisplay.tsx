import { useState } from 'react';
import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react';
import { BrowserProvider, ethers } from 'ethers';
import { Button } from '@nft-frame/ui';
import { CONTRACT_ADDRESS, ABI } from '@nft-frame/contracts';
import { useAdminStore } from '../store';
import { CHAIN_ID } from '../config';
import styles from './Page.module.css';

export function ResetDisplay() {
  const [status, setStatus] = useState('');
  const { isConnected, chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const displaysOwned = useAdminStore((s) => s.displaysOwned);

  const handleReset = async (displayId: string) => {
    if (!walletProvider) return;
    try {
      setStatus(`Resetting display ${displayId}...`);
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();
      const ctr = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      await ctr.resetDisplay(displayId);
      setStatus(`Display ${displayId} reset.`);
    } catch (e: any) {
      setStatus(e.code === 4001 ? 'Transaction rejected.' : 'Error — check console.');
      console.error(e);
    }
  };

  if (!isConnected) return <div className={styles.center}>Connect your wallet to continue.</div>;
  if (chainId !== CHAIN_ID) return <div className={styles.center}>Wrong network.</div>;

  return (
    <main className={styles.page}>
      <h1 className={styles.heading}>Reset Display</h1>
      <div className={styles.list}>
        {displaysOwned.length === 0 && (
          <p className={styles.center}>No displays found.</p>
        )}
        {displaysOwned.map((id) => (
          <div key={id} className={styles.item}>
            <span>Display #{id}</span>
            <Button variant="ghost" onClick={() => handleReset(id)}>Reset</Button>
          </div>
        ))}
      </div>
      {status && <p className={styles.status}>{status}</p>}
    </main>
  );
}
