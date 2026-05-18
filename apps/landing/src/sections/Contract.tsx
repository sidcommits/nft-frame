import styles from './Contract.module.css';

export function Contract() {
  return (
    <section className={styles.section} id="contract">
      <div className={styles.left}>
        <p className="section-label">Smart Contract</p>
        <h2 className={styles.headline}>
          Trustless.<br /><span>On-chain.</span><br />Open.
        </h2>
        <p className={styles.desc}>
          The QR contract manages the full display lifecycle — whitelisting, rentals,
          occupancy, and revenue splits — with no backend. 95% of rent goes directly
          to the display owner's wallet.
        </p>
        <a href="#" className={styles.cta}>View on Etherscan →</a>
      </div>
      <div className={styles.right}>
        <div className={styles.code}>
          <div className={styles.codeHeader}>
            <span className={styles.codeTitle}>QR.sol</span>
            <span className={styles.codeLang}>Solidity ^0.8.0</span>
          </div>
          <pre className={styles.pre}><code>{`function setImage(
  address _NFTAddress,
  uint256 _tokenId,
  uint256 _displayId,
  uint256 _time
) public payable {
  require(!isOccupied(_displayId));
  uint256 share = msg.value * 95 / 100;
  payable(owner).transfer(share);
  emit Display(...);
}`}</code></pre>
        </div>
      </div>
    </section>
  );
}
