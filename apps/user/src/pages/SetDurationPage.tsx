import { useEffect } from 'react';
import { useWeb3ModalProvider } from '@web3modal/ethers/react';
import { BrowserProvider, ethers } from 'ethers';
import { Input, StatCard } from '@nft-frame/ui';
import { CONTRACT_ADDRESS, ABI } from '@nft-frame/contracts';
import { useUserStore } from '../store';
import styles from './SetDurationPage.module.css';

export function SetDurationPage() {
  const { walletProvider } = useWeb3ModalProvider();
  const { displayId, time, rent, setTime, setRent } = useUserStore();

  useEffect(() => {
    if (!walletProvider || !displayId) return;
    const load = async () => {
      const provider = new BrowserProvider(walletProvider);
      const ctr = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
      const d = await ctr.display(displayId);
      const rentPer10 = d.rentPer10Mins as bigint;
      const cost = (rentPer10 * BigInt(time) * BigInt(60)) / BigInt(600);
      setRent(ethers.formatEther(cost));
    };
    load().catch(console.error);
  }, [walletProvider, displayId, time]);

  return (
    <div className={styles.wrap}>
      <Input
        label="Duration (minutes)"
        value={time}
        onChange={(v) => setTime(Number(v))}
        type="number"
      />
      <StatCard value={`${rent} ETH`} label="Total Cost" />
    </div>
  );
}
