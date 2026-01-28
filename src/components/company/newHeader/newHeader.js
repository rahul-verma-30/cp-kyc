import React, { useState } from "react";
import styles from "./newHeader.module.css";

/* -------------------- REUSABLE RISK CARD -------------------- */
const RiskCard = ({
  icon,
  category,
  severity,
  title,
  description,
  date,
  source,
  variant,
}) => {
  const isHigh = severity === "High";

  return (
    <div className={`${styles.riskCard} ${styles[variant]}`}>
      {/* LEFT ICON */}
      <div className={styles.cardIconBox}>
        <img src={icon} alt="" />
      </div>

      {/* MIDDLE CONTENT */}
      <div className={styles.cardContent}>
        <span
          className={isHigh ? styles.categoryLabel : styles.categoryLabelYellow}
        >
          {category}
        </span>

        <h4 className={styles.cardTitle}>{title}</h4>

        <p className={styles.cardDesc}>{description}</p>

        <div className={styles.cardFooter}>
          <div className={styles.footerItem}>
            <img src="/icons/footer_calender.svg" alt="date" />
            <span>{date}</span>
          </div>

          <span className={styles.footerDivider}></span>

          <div className={styles.footerItem}>
            <img src="/icons/footer_file.svg" alt="source" />
            <span>{source}</span>
          </div>
        </div>
      </div>

      {/* RIGHT SEVERITY */}
      <span
        className={isHigh ? styles.severityBadgeHigh : styles.severityBadgeMed}
      >
        {severity}
      </span>
    </div>
  );
};

/* -------------------- DATA (API READY) -------------------- */
const RISK_DATA = [
  {
    category: "LEGAL",
    severity: "High",
    variant: "cardHigh",
    icon: "/icons/scale.svg",
    title: "12 Pending Legal Cases Identified",
    description:
      "Active litigation across NCLT, High Courts, and civil courts involving product liability and contract disputes",
    date: "15 Dec 2024",
    source: "Court Records",
  },
  {
    category: "MEDIA",
    severity: "Medium",
    variant: "cardMedium",
    icon: "/icons/file-text.svg",
    title: "Negative Media Coverage Related to Product Quality",
    description:
      "3 adverse news articles published regarding product quality concerns and customer complaints",
    date: "08 Jan 2025",
    source: "News Media",
  },
  {
    category: "REGULATORY",
    severity: "High",
    variant: "cardHigh",
    icon: "/icons/reg-red.svg",
    title: "Pending Compliance Notices from Regulators",
    description:
      "2 outstanding notices from SEBI and MCA requiring response and corrective action",
    date: "22 Dec 2024",
    source: "Regulator",
  },
  {
    category: "FINANCIAL",
    severity: "Medium",
    variant: "cardMedium",
    icon: "/icons/fin-yellow.svg",
    title: "Declining Financial Performance",
    description:
      "Profit margins decreased by 7.02% and EBITDA declined by 7.19% in last fiscal year",
    date: "31 Mar 2024",
    source: "Financial Statements",
  },
  {
    category: "GOVERNANCE",
    severity: "Medium",
    variant: "cardMedium",
    icon: "/icons/gov-yellow.svg",
    title: "Material Director Changes",
    description:
      "4 director resignations recorded in the past 12 months, indicating potential governance concerns",
    date: "28 Nov 2024",
    source: "ROC Filings",
  },
];

const CompanyNewHeader = () => {
  const [isExpanded, setIsExpanded] = useState(false); // State to track expansion

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className={styles.wrapper}>
      <header className={styles.headerContainer}>
        <div className={styles.mainLayout}>
          <div className={styles.logoWrapper}>
            <div className={styles.logoCircle}>
              <img
                src="/icons/dabur-logo.svg"
                alt="Dabur Logo"
                className={styles.logoImage}
              />
            </div>
          </div>

          <div className={styles.contentSection}>
            <div className={styles.titleRow}>
              <h1 className={styles.companyName}>Dabur India</h1>
              <div className={styles.statsContainer}>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Growth Score</span>
                  <span className={styles.scoreBadgeRed}>69</span>
                  <img
                    src="/icons/arrow-down.svg"
                    alt="arrow down"
                    className={styles.arrowDownRed}
                  />
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>CB Rank</span>
                  <span className={styles.scoreBadgeRed}>268240</span>
                  <img
                    src="/icons/arrow-down.svg"
                    alt="arrow down"
                    className={styles.arrowDownRed}
                  />
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Heat Score</span>
                  <span className={styles.scoreBadgeRed}>59</span>
                  <img
                    src="/icons/arrow-down.svg"
                    alt="arrow down"
                    className={styles.arrowDownRed}
                  />
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>CIN</span>
                  <span className={styles.cinBadge}>L24230DL1975PLC007908</span>
                </div>
              </div>
            </div>

            <p className={styles.description}>
              Dabur is an India's leading FMCG Companies with Revenues of over
              Rs 7,680 Crore & Market Capitalisation of over Rs 48,800 Crore.
            </p>

            <div className={styles.infoMetaRow}>
              <div className={styles.metaItem}>
                <img src="/icons/calendar.svg" className={styles.icon} />
                <span>Funded 1884</span>
              </div>
              <div className={styles.metaItem}>
                <img src="/icons/flag.svg" className={styles.icon} />
                <span>Public</span>
              </div>
              <div className={styles.metaItem}>
                <img src="/icons/location.svg" className={styles.icon} />
                <span>Ghaziabad, Uttar Pradesh, India</span>
              </div>
              <div className={styles.metaItem}>
                <img src="/icons/profile-2user.svg" className={styles.icon} />
                <span>5001-10000</span>
              </div>
              <div className={styles.metaItem}>
                <img src="/icons/global.svg" className={styles.icon} />
                <a href="https://www.dabur.com/" className={styles.link}>
                  www.dabur.com/
                </a>
              </div>
              <div className={styles.socialIcons}>
                <img
                  src="/icons/fb.svg"
                  alt="Facebook"
                  className={styles.socialIcon}
                />
                <img
                  src="/icons/li.svg"
                  alt="LinkedIn"
                  className={styles.socialIcon}
                />
              </div>
            </div>

            <div className={styles.alertsRow}>
              <div className={`${styles.alertBadge} ${styles.legalAlert}`}>
                <img src="/icons/scale.svg" alt="" /> <strong>12</strong> Legal
                Cases
              </div>
              <div className={`${styles.alertBadge} ${styles.adverseAlert}`}>
                <img src="/icons/file-text.svg" alt="" /> <strong>3</strong>{" "}
                Adverse media
              </div>
              <div className={`${styles.alertBadge} ${styles.regulatoryAlert}`}>
                <img src="/icons/shield.svg" alt="" /> <strong>2</strong>{" "}
                Regulatory Issues
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
              <button className={styles.saveButton}>
                <img
                  src="/icons/refresh.svg"
                  alt=""
                  className={styles.buttonIcon}
                />
                Refresh Company
              </button>
              <button className={styles.saveButton}>
                <img
                  src="/icons/bookmark.svg"
                  alt=""
                  className={styles.buttonIcon}
                />
                Save
              </button>
              <button className={styles.actionsButton}>
                Actions{" "}
                <img
                  src="/icons/chevron-down.svg"
                  alt=""
                  className={styles.chevronDown}
                />
              </button>
            </div>
            <div className={styles.lastUpdated}>
              <span>Last Updated:</span>{" "}
              <strong>30-Dec-2024, 11:45 AM IST</strong>
            </div>
          </div>
        </div>
      </header>

      {/* ================= OBSERVATIONS BAR ================= */}
      <div className={styles.observationsBar}>
        <div className={styles.observationsContent}>
          <div className={styles.obsLeft}>
            <span className={styles.dot}></span>
            <span className={styles.obsTitle}>Observations Found</span>
          </div>

          <div className={styles.obsDivider}></div>

          <div className={styles.obsRight}>
            <div className={styles.issueItem}>
              <img src="/icons/warning-orange.svg" alt="" />
              <span className={styles.issueTextOrange}>
                5 Issues Identified
              </span>
            </div>
            <span className={styles.bullet}>•</span>
            <span className={styles.issueTextRed}>2 High Severity</span>
          </div>

          <img
            src="/icons/chevron-down-dark.svg"
            alt="expand"
            className={`${styles.obsChevron} ${
              isExpanded ? styles.rotated : ""
            }`}
            onClick={() => setIsExpanded(!isExpanded)}
          />
        </div>
      </div>

      {/* ================= EXPANDED SECTION (BELOW BAR) ================= */}
      {isExpanded && (
        <div
          className={`${styles.expandedWrapper} ${
            isExpanded ? styles.expandedOpen : styles.expandedClosed
          }`}
        >
          <div className={styles.expandedInner}>
            <div className={styles.riskSummaryHeader}>
              <div className={styles.riskIconBox}>
                <img src="/icons/warning-white.svg" alt="" />
              </div>
              <div>
                <h3 className={styles.riskSummaryTitle}>
                  Risk & Red Flag Summary
                </h3>
                <p className={styles.riskSummarySub}>
                  Material adverse observations requiring attention during due
                  diligence
                </p>
              </div>
            </div>

            <div className={styles.riskGrid}>
              {RISK_DATA.map((item, index) => (
                <RiskCard key={index} {...item} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyNewHeader;
