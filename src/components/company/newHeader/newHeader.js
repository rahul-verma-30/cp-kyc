import React from "react";
import styles from "./newHeader.module.css";

const CompanyNewHeader = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.mainLayout}>
        <div className={styles.logoWrapper}>
          <div className={styles.logoCircle}>
            <img src="/icons/dabur-logo.svg" alt="Dabur Logo" className={styles.logoImage} />
          </div>
        </div>

        <div className={styles.contentSection}>
          <div className={styles.titleRow}>
            <h1 className={styles.companyName}>Dabur India</h1>
            <div className={styles.statsContainer}>
              {/* Stat items remain the same */}
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Growth Score</span>
                <span className={styles.scoreBadgeRed}>69</span>
                <img src="/icons/arrow-down.svg" alt="arrow down" className={styles.arrowDownRed} />
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>CB Rank</span>
                <span className={styles.scoreBadgeRed}>268240</span>
                <img src="/icons/arrow-down.svg" alt="arrow down" className={styles.arrowDownRed} />
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Heat Score</span>
                <span className={styles.scoreBadgeRed}>59</span>
                <img src="/icons/arrow-down.svg" alt="arrow down" className={styles.arrowDownRed} />
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>CIN</span>
                <span className={styles.cinBadge}>L24230DL1975PLC007908</span>
              </div>
            </div>
          </div>

          <p className={styles.description}>
            Dabur is an India's leading FMCG Companies with Revenues of over Rs 7,680 Crore & Market Capitalisation of over Rs 48,800 Crore.
          </p>

          <div className={styles.infoMetaRow}>
            {/* Meta items remain the same */}
            <div className={styles.metaItem}><img src="/icons/calendar.svg" className={styles.icon} /><span>Funded 1884</span></div>
            <div className={styles.metaItem}><img src="/icons/flag.svg" className={styles.icon} /><span>Public</span></div>
            <div className={styles.metaItem}><img src="/icons/location.svg" className={styles.icon} /><span>Ghaziabad, Uttar Pradesh, India</span></div>
            <div className={styles.metaItem}><img src="/icons/profile-2user.svg" className={styles.icon} /><span>5001-10000</span></div>
            <div className={styles.metaItem}>
               <img src="/icons/global.svg" className={styles.icon} />
               <a href="https://www.dabur.com/" className={styles.link}>www.dabur.com/</a>
            </div>
            <div className={styles.socialIcons}>
              <img src="/icons/fb.svg" alt="Facebook" className={styles.socialIcon} />
              <img src="/icons/li.svg" alt="LinkedIn" className={styles.socialIcon} />
            </div>
          </div>

          {/* ADDED: Alerts Row */}
          <div className={styles.alertsRow}>
            <div className={`${styles.alertBadge} ${styles.legalAlert}`}>
              <img src="/icons/scale.svg" alt="" /> <strong>12</strong> Legal Cases
            </div>
            <div className={`${styles.alertBadge} ${styles.adverseAlert}`}>
              <img src="/icons/file-text.svg" alt="" /> <strong>3</strong> Adverse media
            </div>
            <div className={`${styles.alertBadge} ${styles.regulatoryAlert}`}>
              <img src="/icons/shield.svg" alt="" /> <strong>2</strong> Regulatory Issues
            </div>
            <div className={`${styles.alertBadge} ${styles.riskAlert}`}>
              <img src="/icons/activity.svg" alt="" /> Medium-High Risk
            </div>
            <button className={styles.viewAllBtn}>
              View All Alert <img src="/icons/arrow-down-dark.svg" alt="" />
            </button>
          </div>
        </div>

        <div className={styles.actionSection}>
          <div className={styles.buttonGroup}>
            {/* ADDED: Refresh Button */}
            <button className={styles.saveButton}>
              <img src="/icons/refresh.svg" alt="" className={styles.buttonIcon} />
              Refresh Company
            </button>
            <button className={styles.saveButton}>
              <img src="/icons/bookmark.svg" alt="" className={styles.buttonIcon} />
              Save
            </button>
            <button className={styles.actionsButton}>
              Actions <img src="/icons/chevron-down.svg" alt="" className={styles.chevronDown} />
            </button>
          </div>
          <div className={styles.lastUpdated}>
            <span>Last Updated:</span> <strong>30-Dec-2024, 11:45 AM IST</strong>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CompanyNewHeader;
