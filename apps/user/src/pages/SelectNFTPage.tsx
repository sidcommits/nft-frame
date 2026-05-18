import { useEffect, useState } from 'react';
import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import axios from 'axios';
import { useUserStore } from '../store';
import { MORALIS_API_KEY } from '../config';
import styles from './SelectNFTPage.module.css';

interface NFT { token_address: string; token_id: string; metadata?: string; name?: string; }

export function SelectNFTPage() {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(false);
  const { address } = useWeb3ModalAccount();
  const { nftData, setNftData } = useUserStore();

  useEffect(() => {
    if (!address) return;
    setLoading(true);
    axios.get(`https://deep-index.moralis.io/api/v2/${address}/nft`, {
      headers: { 'X-API-Key': MORALIS_API_KEY },
      params: { chain: 'eth', format: 'decimal' },
    })
      .then(({ data }) => setNfts(data.result ?? []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [address]);

  if (loading) return <p className={styles.msg}>Loading your NFTs...</p>;
  if (!nfts.length) return <p className={styles.msg}>No NFTs found in this wallet.</p>;

  return (
    <div className={styles.grid}>
      {nfts.map((nft) => {
        const meta = nft.metadata ? JSON.parse(nft.metadata) : {};
        const isSelected = nftData.address === nft.token_address && nftData.tokenID === Number(nft.token_id);
        return (
          <div
            key={`${nft.token_address}-${nft.token_id}`}
            className={[styles.card, isSelected ? styles.selected : ''].join(' ')}
            onClick={() => setNftData({ address: nft.token_address, tokenID: Number(nft.token_id), imageUrl: meta.image })}
          >
            {meta.image && <img src={meta.image} alt={meta.name ?? nft.token_id} className={styles.img} />}
            <p className={styles.name}>{meta.name ?? `#${nft.token_id}`}</p>
          </div>
        );
      })}
    </div>
  );
}
