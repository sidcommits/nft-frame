import styles from './HowItWorks.module.css';

const steps = [
  {
    num: '01',
    role: 'Display Owner',
    title: 'Create a Display',
    desc: 'Whitelisted owners deploy a physical screen and register it on-chain with a rental rate. The display gets a unique ID and a QR code.',
  },
  {
    num: '02',
    role: 'NFT Owner',
    title: 'Scan & Rent',
    desc: 'Scan the QR code, pick an NFT from your wallet, set a duration, and pay the rent. The transaction maps your token to the display on-chain.',
  },
  {
    num: '03',
    role: 'The Frame',
    title: 'NFT Goes Live',
    desc: 'The display listens for on-chain events and instantly shows the NFT. When time expires the frame returns to its idle QR code — no backend needed.',
  },
];

export function HowItWorks() {
  return (
    <section className={styles.section} id="how">
      <div className={styles.inner}>
        <p className="section-label">How it works</p>
        <div className={styles.steps}>
          {steps.map((s) => (
            <div key={s.num} className={styles.step}>
              <div className={styles.num}>{s.num}</div>
              <p className={styles.role}>{s.role}</p>
              <h3 className={styles.title}>{s.title}</h3>
              <p className={styles.desc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
