import { useState } from 'react';
import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react';
import { BrowserProvider, ethers } from 'ethers';
import { Button, Input, StatCard } from '@nft-frame/ui';
import { CONTRACT_ADDRESS, ABI } from '@nft-frame/contracts';
import { useAdminStore } from '../store';
import { CHAIN_ID } from '../config';
import styles from './Page.module.css';

export function CreateDisplay() {
  const [rent, setRent] = useState('');
  const [status, setStatus] = useState('');
  const { address, isConnected, chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const displaysOwned = useAdminStore((s) => s.displaysOwned);
  const setDisplaysOwned = useAdminStore((s) => s.setDisplaysOwned);

  const handleCreate = async () => {
    if (!walletProvider || chainId !== CHAIN_ID) return;
    try {
      setStatus('Submitting...');
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();
      const ctr = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const rentWei = ethers.parseEther(rent);
      await ctr.createDisplay(rentWei);
      const updated = await ctr.getDisplaysOwned(address);
      setDisplaysOwned(updated.map((n: bigint) => n.toString()));
      setStatus('Display created!');
      setRent('');
    } catch (e: any) {
      setStatus(e.code === 4001 ? 'Transaction rejected.' : 'Error — check console.');
      console.error(e);
    }
  };

  if (!isConnected) return <div className={styles.center}>Connect your wallet to continue.</div>;
  if (chainId !== CHAIN_ID) return <div className={styles.center}>Wrong network. Switch to the correct chain.</div>;

  return (
    <main className={styles.page}>
      <h1 className={styles.heading}>Create Display</h1>
      <div className={styles.stats}>
        <StatCard value={displaysOwned.length} label="Displays Owned" />
      </div>
      <div className={styles.form}>
        <Input
          label="Rent per 10 minutes (ETH)"
          value={rent}
          onChange={setRent}
          placeholder="0.002"
          type="text"
        />
        <Button onClick={handleCreate} disabled={!rent}>
          Create Display
        </Button>
        {status && <p className={styles.status}>{status}</p>}
      </div>
    </main>
  );
}
