import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.textWrapper}>
          <h1 className={styles.title}>
            Know who you’re dealing with — before you decide
          </h1>

          <p className={styles.subtitle}>
            Comprehensive company KYC with ownership, control, financial health,
            and compliance insights
          </p>
        </div>

        <div className={styles.searchContainer}>
          <div className={styles.searchIcon}>
            <div className={styles.squareIcon}>
              <img
                src="/icons/company.svg"
                alt="Company Icon"
                className={styles.iconImg}
              />
            </div>
          </div>
          <input
            type="text"
            placeholder="Search by company name, CIN, LLPIN, or director name"
            className={styles.input}
          />
          <button className={styles.searchBtn}>
            <span className={styles.arrowUp}>
              <img
                src="/icons/arrow-up.svg"
                alt="Arrow up"
                className={styles.arrowImg}
              />
            </span>
          </button>
        </div>
      </div>
      <div className={styles.gridOverlay}></div>
    </section>
  );
}
