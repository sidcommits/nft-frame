import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>FRAME</div>
      <div className={styles.links}>
        <a href="https://github.com/sidcommits/nft-frame" target="_blank" rel="noreferrer">GitHub</a>
        <a href="#contract">Contract</a>
      </div>
      <p className={styles.meta}>EVM · Solidity ^0.8.0 · MIT</p>
    </footer>
  );
}
