import styles from './Apps.module.css';

const apps = [
  {
    tag: 'For display owners',
    name: 'Admin',
    desc: 'Create and manage physical displays. Set rental rates, reset occupied slots, track earnings — all on-chain.',
    href: '#',
  },
  {
    tag: 'For NFT owners',
    name: 'User',
    desc: 'Browse your NFT collection, pick a display, set a duration, and submit the rental in three steps.',
    href: '#',
  },
  {
    tag: 'The screen itself',
    name: 'Client',
    desc: 'Runs on the physical frame. Shows the active NFT or a QR code. Updates live from on-chain events — zero polling.',
    href: '#',
  },
];

export function Apps() {
  return (
    <section className={styles.section} id="apps">
      <p className="section-label">Three apps. One system.</p>
      <div className={styles.grid}>
        {apps.map((a) => (
          <div key={a.name} className={styles.card}>
            <p className={styles.tag}>{a.tag}</p>
            <h3 className={styles.name}>{a.name}</h3>
            <p className={styles.desc}>{a.desc}</p>
            <a href={a.href} className={styles.link}>Open {a.name} →</a>
          </div>
        ))}
      </div>
    </section>
  );
}
