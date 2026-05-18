import { useEffect } from 'react';
import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react';
import { BrowserProvider, ethers } from 'ethers';
import { Button } from '@nft-frame/ui';
import { CONTRACT_ADDRESS, ABI } from '@nft-frame/contracts';
import { useUserStore } from '../store';
import { CHAIN_ID, SECONDS_IN_A_MINUTE } from '../config';
import { SelectNFTPage } from '../pages/SelectNFTPage';
import { SetDurationPage } from '../pages/SetDurationPage';
import { VerifyPage } from '../pages/VerifyPage';
import styles from './Steps.module.css';

const STEP_LABELS = ['Select NFT', 'Set Duration', 'Verify & Submit'];

export function Steps() {
  const { isConnected, chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const {
    activeStep, displayId, displayOccupied, nftData, time, rent,
    setActiveStep, setDisplayOccupied, setNftData, setCollectionSelected,
  } = useUserStore();

  useEffect(() => {
    if (!displayId || !walletProvider) return;
    const check = async () => {
      const provider = new BrowserProvider(walletProvider);
      const ctr = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
      const occupied = await ctr.isOccupied(displayId);
      setDisplayOccupied(occupied);
    };
    check().catch(console.error);
  }, [displayId, walletProvider]);

  const handleNext = () => {
    if (activeStep === 0 && nftData.tokenID == null) { alert('Select an NFT first.'); return; }
    if (activeStep < 2) setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 0) return;
    if (activeStep === 1) { setNftData({ address: null, tokenID: null }); setCollectionSelected(''); }
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = async () => {
    if (!walletProvider) return;
    try {
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();
      const ctr = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const occupied = await ctr.isOccupied(displayId);
      if (occupied) { alert('Display is now occupied. Try later.'); return; }
      const timeInSeconds = time * SECONDS_IN_A_MINUTE;
      await ctr.setImage(nftData.address, nftData.tokenID, displayId, timeInSeconds, {
        value: ethers.parseEther(rent),
      });
      alert('Submitted!');
    } catch (e: any) {
      if (e.code === 4001) alert('Transaction rejected.');
      else console.error(e);
    }
  };

  if (!displayId) return <div className={styles.center}>No display selected. Scan a QR code.</div>;
  if (displayOccupied) return <div className={styles.center}>Display is occupied. Try later.</div>;
  if (!isConnected) return <div className={styles.center}>Connect your wallet to continue.</div>;
  if (chainId !== CHAIN_ID) return <div className={styles.center}>Wrong network.</div>;

  const stepContent = [<SelectNFTPage />, <SetDurationPage />, <VerifyPage />][activeStep];

  return (
    <div className={styles.wrap}>
      <div className={styles.stepper}>
        {STEP_LABELS.map((label, i) => (
          <div key={label} className={[styles.stepDot, i === activeStep ? styles.active : i < activeStep ? styles.done : ''].join(' ')}>
            <span className={styles.dotNum}>{i < activeStep ? '✓' : i + 1}</span>
            <span className={styles.dotLabel}>{label}</span>
          </div>
        ))}
      </div>
      <div className={styles.content}>{stepContent}</div>
      <div className={styles.actions}>
        <Button variant="ghost" onClick={handleBack} disabled={activeStep === 0}>Back</Button>
        {activeStep < 2
          ? <Button onClick={handleNext}>Next</Button>
          : <Button onClick={handleSubmit}>Submit & Pay</Button>
        }
      </div>
    </div>
  );
}
