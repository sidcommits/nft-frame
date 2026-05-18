import { StatCard } from '@nft-frame/ui';
import { useUserStore } from '../store';
import styles from './VerifyPage.module.css';

export function VerifyPage() {
  const { nftData, displayId, time, rent } = useUserStore();

  return (
    <div className={styles.wrap}>
      <h2 className={styles.heading}>Confirm Details</h2>
      <div className={styles.stats}>
        <StatCard value={`#${nftData.tokenID}`} label="Token ID" />
        <StatCard value={`#${displayId}`} label="Display" />
        <StatCard value={`${time} min`} label="Duration" />
        <StatCard value={`${rent} ETH`} label="Cost" />
      </div>
      {nftData.imageUrl && <img src={nftData.imageUrl} alt="Selected NFT" className={styles.preview} />}
    </div>
  );
}
