import { useState } from 'react';
import { WalletButton } from '../WalletButton/WalletButton';
import styles from './Header.module.css';

interface NavLink { label: string; href: string; }

interface HeaderProps {
  logoText?: string;
  links?: NavLink[];
  address?: string | null;
  isConnected: boolean;
  onWalletClick: () => void;
}

export function Header({
  logoText = 'FRAME',
  links = [],
  address,
  isConnected,
  onWalletClick,
}: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>{logoText}</div>

      <ul className={styles.links}>
        {links.map((l) => (
          <li key={l.href}><a href={l.href} className={styles.link}>{l.label}</a></li>
        ))}
      </ul>

      <button className={styles.burger} onClick={() => setOpen(!open)} aria-label="menu">
        <span /><span /><span />
      </button>

      <WalletButton address={address} isConnected={isConnected} onClick={onWalletClick} />

      {open && (
        <div className={styles.drawer}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className={styles.drawerLink} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
