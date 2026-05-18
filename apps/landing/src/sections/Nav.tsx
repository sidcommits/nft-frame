import styles from './Nav.module.css';

export function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>FRAME</div>
      <ul className={styles.links}>
        <li><a href="#how">How it works</a></li>
        <li><a href="#apps">Apps</a></li>
        <li><a href="#contract">Contract</a></li>
      </ul>
      <a
        href="https://github.com/YOUR_USERNAME/nft-frame"
        target="_blank"
        rel="noreferrer"
        className={styles.cta}
      >
        View on GitHub
      </a>
    </nav>
  );
}
