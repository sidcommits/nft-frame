import { useState } from 'react';
import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react';
import { BrowserProvider, ethers } from 'ethers';
import { Button, Input } from '@nft-frame/ui';
import { CONTRACT_ADDRESS, ABI } from '@nft-frame/contracts';
import { useAdminStore } from '../store';
import { CHAIN_ID } from '../config';
import styles from './Page.module.css';

export function ChangeRent() {
  const [selectedId, setSelectedId] = useState('');
  const [newRent, setNewRent] = useState('');
  const [status, setStatus] = useState('');
  const { isConnected, chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const displaysOwned = useAdminStore((s) => s.displaysOwned);

  const handleChange = async () => {
    if (!walletProvider || !selectedId || !newRent) return;
    try {
      setStatus('Submitting...');
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();
      const ctr = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      await ctr.setRent(selectedId, ethers.parseEther(newRent));
      setStatus('Rent updated.');
    } catch (e: any) {
      setStatus(e.code === 4001 ? 'Transaction rejected.' : 'Error — check console.');
      console.error(e);
    }
  };

  if (!isConnected) return <div className={styles.center}>Connect your wallet to continue.</div>;
  if (chainId !== CHAIN_ID) return <div className={styles.center}>Wrong network.</div>;

  return (
    <main className={styles.page}>
      <h1 className={styles.heading}>Change Rent</h1>
      <div className={styles.form}>
        <div className={styles.list}>
          {displaysOwned.map((id) => (
            <div
              key={id}
              className={styles.item}
              style={{ cursor: 'pointer', borderColor: selectedId === id ? 'var(--color-accent)' : undefined }}
              onClick={() => setSelectedId(id)}
            >
              Display #{id} {selectedId === id ? '←' : ''}
            </div>
          ))}
        </div>
        <Input label="New rent per 10 minutes (ETH)" value={newRent} onChange={setNewRent} placeholder="0.002" />
        <Button onClick={handleChange} disabled={!selectedId || !newRent}>Update Rent</Button>
        {status && <p className={styles.status}>{status}</p>}
      </div>
    </main>
  );
}
