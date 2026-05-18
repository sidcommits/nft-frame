import styles from './Hero.module.css';

export function Hero() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.left}>
          <p className={styles.eyebrow}>On-chain NFT display rental</p>
          <h1 className={styles.headline}>
            Rent a<br />
            <span>Frame.</span><br />
            Show your<br />
            NFT.
          </h1>
          <p className={styles.body}>
            Physical displays. Digital ownership. A trustless rental market built on
            Ethereum — anyone can own a display, anyone can rent one to show their NFT.
          </p>
          <div className={styles.actions}>
            <a href="#apps" className={styles.btnPrimary}>Explore the Apps</a>
            <a href="#contract" className={styles.btnGhost}>Read the Contract →</a>
          </div>
        </div>
        <div className={styles.right}>
          <FrameMockup />
        </div>
      </section>
      <div className={styles.mobileFrame}>
        <FrameMockup />
      </div>
    </>
  );
}

function FrameMockup() {
  return (
    <div className={styles.frame}>
      <span className={styles.frameLabel}>DISPLAY #04</span>
      <span className={styles.frameLive}>● LIVE</span>
      <div className={styles.frameImg}>🦧</div>
      <div className={styles.frameTitle}>Bored Ape #3821</div>
      <div className={styles.frameTimer}>2h 14m remaining</div>
      <div className={styles.frameBar} />
    </div>
  );
}
