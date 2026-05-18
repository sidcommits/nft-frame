import styles from './WalletButton.module.css';

interface WalletButtonProps {
  address?: string | null;
  isConnected: boolean;
  onClick: () => void;
}

export function WalletButton({ address, isConnected, onClick }: WalletButtonProps) {
  const label = isConnected && address
    ? `${address.slice(0, 4)}...${address.slice(-4)}`.toUpperCase()
    : 'Connect';

  return (
    <button className={styles.btn} onClick={onClick}>
      {label}
    </button>
  );
}
