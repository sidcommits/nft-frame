import { useEffect, useState, useRef } from 'react';
import { useWeb3ModalProvider } from '@web3modal/ethers/react';
import { BrowserProvider, ethers } from 'ethers';
import { QRCodeSVG } from 'qrcode.react';
import axios from 'axios';
import { CONTRACT_ADDRESS, ABI } from '@nft-frame/contracts';
import { useClientStore } from '../store';
import { USER_DAPP_URL, OPENSEA_IMAGE_API } from '../config';
import styles from './QRDisplay.module.css';

export function QRDisplay() {
  const [imageSrc, setImageSrc] = useState('');
  const [displayExists, setDisplayExists] = useState(false);
  const prevTxnHashRef = useRef('');
  const { walletProvider } = useWeb3ModalProvider();
  const displaySelected = useClientStore((s) => s.displaySelected);

  useEffect(() => {
    if (!walletProvider || !displaySelected) return;
    const provider = new BrowserProvider(walletProvider);
    const ctr = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

    const checkCurrentDisplay = async () => {
      const response = await ctr.display(displaySelected);
      const endTime = Number(response.endTime);
      const block = await provider.getBlock(await provider.getBlockNumber());
      if (!block || endTime < block.timestamp) return;
      const url = OPENSEA_IMAGE_API + response.collectionAddress + '/' + response.tokenId;
      const { data } = await axios.get(url);
      setImageSrc(data.image_url);
      setDisplayExists(true);
      const ms = (endTime - block.timestamp) * 1000;
      setTimeout(() => setDisplayExists(false), ms);
    };

    checkCurrentDisplay().catch(console.error);

    if (prevTxnHashRef.current === '') {
      ctr.on('Display', async (displayId: bigint, struct: any, event: any) => {
        prevTxnHashRef.current = event.transactionHash;
        if (displayId.toString() !== displaySelected) return;
        if (struct.collectionAddress === ethers.ZeroAddress) {
          setDisplayExists(false);
          return;
        }
        const url = OPENSEA_IMAGE_API + struct.collectionAddress + '/' + struct.tokenId;
        const { data } = await axios.get(url);
        setImageSrc(data.image_url);
        setDisplayExists(true);
        const ms = (Number(struct.endTime) - Number(struct.startTime)) * 1000;
        setTimeout(() => setDisplayExists(false), ms);
      });
    }

    return () => { ctr.removeAllListeners('Display'); };
  }, [walletProvider, displaySelected]);

  if (!displaySelected) return null;

  return (
    <div className={styles.wrap}>
      {displayExists
        ? <img className={styles.nft} src={imageSrc} alt="Active NFT" />
        : <QRCodeSVG value={USER_DAPP_URL + displaySelected} size={320} />
      }
    </div>
  );
}
