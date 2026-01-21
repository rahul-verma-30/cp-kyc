import React from "react";
import styles from "./CompanyHighlights.module.css";

const CompanyHighlights = () => {
  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Corporate Highlights</h1>
        <div className={styles.headerInfo}>
          <span className={styles.infoGroup}>
            <span className={styles.infoLabel}>Source:</span>
            <span className={styles.infoValue}>MCA</span>
          </span>
          <span className={styles.infoDivider}></span>
          <span className={styles.infoGroup}>
            <span className={styles.infoLabel}>Last Updated:</span>
            <span className={styles.infoValue}>30-Dec-2024, 11:45 AM IST</span>
          </span>
        </div>
      </div>

      {/* Shareholding Section */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Shareholding</h2>
        <div className={styles.card}>
          <div className={styles.shareholdingSection}>
            <div className={styles.chartHeader}>
              <div className={styles.chartLine}></div>
              <span className={styles.chartHeaderText}>Shareholding</span>
              <div className={styles.chartLine}></div>
            </div>

            <div className={styles.progressContainer}>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressPromoter}
                  style={{ width: "75%" }}
                ></div>
                <div
                  className={styles.progressNonPromoter}
                  style={{ width: "25%" }}
                ></div>
              </div>
            </div>
          </div>

          <div className={styles.legendGrid}>
            <div className={styles.legendItem}>
              <div className={`${styles.dot} ${styles.dotPromoter}`}></div>
              <div>
                <p className={styles.legendLabel}>Promoter Shares</p>
                <p className={styles.legendValue}>1174000355.00</p>
              </div>
            </div>
            <div className={styles.legendItem}>
              <div className={`${styles.dot} ${styles.dotNonPromoter}`}></div>
              <div>
                <p className={styles.legendLabel}>Non Promoter Shares</p>
                <p className={styles.legendValue}>598038807.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charges Section */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Charges</h2>
        <div className={styles.emptyCard}>
          <p className={styles.emptyText}>
            There are no open charges registered against the company as per our
            records.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyHighlights;
