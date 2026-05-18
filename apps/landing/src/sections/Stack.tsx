import styles from './Stack.module.css';

const badges = ['React 18', 'Vite 5', 'Solidity ^0.8', 'ethers v6', 'Zustand', 'web3modal v3', 'npm workspaces', 'TypeScript', 'Moralis', 'OpenSea API'];

export function Stack() {
  return (
    <section className={styles.section}>
      <p className={styles.label}>Built with</p>
      <div className={styles.badges}>
        {badges.map((b) => <span key={b} className={styles.badge}>{b}</span>)}
      </div>
    </section>
  );
}
