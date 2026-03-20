"use client";

import React from "react";
import styles from "./ShareHoldingsTables.module.css";

const ShareHoldingsTables = () => {
  // ---------------- FIRST TABLE DATA (UNCHANGED) ----------------
  const data = [
    // { category: "Vishal Chemical (India) Limited", isSectionHeader: true },
    // { category: "(i) Indian", equityShares: "1366995.00", equityPercent: "0.08%", preferenceShares: "0.00", preferencePercent: "0.00%" },
    // { category: "(ii) Non-Resident Indian (NRI)", equityShares: "1155000.00", equityPercent: "0.07%", preferenceShares: "0.00", preferencePercent: "0.00%" },
    // { category: "(iii) Foreign national (other than NRI)", equityShares: "0.00", equityPercent: "0.00%", preferenceShares: "-", preferencePercent: "0.00%" },
    // { category: "Government", isSectionHeader: true },
    // { category: "(i) Central Government", equityShares: "0.00", equityPercent: "0.00%", preferenceShares: "-", preferencePercent: "0.00%" },
    // { category: "(ii) State Government", equityShares: "0.00", equityPercent: "0.00%", preferenceShares: "-", preferencePercent: "0.00%" },
    // { category: "(iii) Government Companies", equityShares: "0.00", equityPercent: "0.00%", preferenceShares: "0.00%", preferencePercent: "0.00%" },
    // { category: "Insurance Companies", isSectionHeader: true, equityShares: "0.00", equityPercent: "0.00%", preferenceShares: "-", preferencePercent: "0.00%" },
    // { category: "Banks", isSectionHeader: true, equityShares: "0.00", equityPercent: "0.00%", preferenceShares: "-", preferencePercent: "0.00%" },
    // { category: "Financial Institutions", isSectionHeader: true, equityShares: "0.00", equityPercent: "0.00%", preferenceShares: "-", preferencePercent: "0.00%" },
    // { category: "Foreign Institutional Investor", isSectionHeader: true, equityShares: "0.00", equityPercent: "0.00%", preferenceShares: "-", preferencePercent: "0.00%" },
    // { category: "Mutual Fund", isSectionHeader: true, equityShares: "0.00", equityPercent: "0.00%", preferenceShares: "0.00%", preferencePercent: "0.00%" },
    // { category: "Venture Capital", isSectionHeader: true, equityShares: "0.00", equityPercent: "0.00%", preferenceShares: "-", preferencePercent: "0.00%" },
    // { category: "Body Corporate", isSectionHeader: true, equityShares: "1171478360.00", equityPercent: "66.11%", preferenceShares: "0.00", preferencePercent: "0.00%" },
    // { category: "Others", isSectionHeader: true, equityShares: "0.00", equityPercent: "0.00%", preferenceShares: "0.00%", preferencePercent: "0.00%" },
  ];

  // ---------------- SECOND TABLE DATA (NEW) ----------------
  const publicData = [
    // { category: "Vishal Chemical (India) Limited", isSectionHeader: true },
    // { category: "(i) Indian", equityShares: "80541903.00", equityPercent: "4.55%", preferenceShares: "0.00", preferencePercent: "0.00%" },
    // { category: "(ii) Non-Resident Indian (NRI)", equityShares: "5018803.00", equityPercent: "0.28%", preferenceShares: "0.00", preferencePercent: "0.00%" },
    // { category: "(iii) Foreign national (other than NRI)", equityShares: "1919.00", equityPercent: "0.00%", preferenceShares: "0.00", preferencePercent: "0.00%" },
    // { category: "Government", isSectionHeader: true },
    // { category: "(i) Central Government", equityShares: "0.00", equityPercent: "0.00%", preferenceShares: "-", preferencePercent: "0.00%" },
    // { category: "(ii) State Government", equityShares: "0.00", equityPercent: "0.00%", preferenceShares: "-", preferencePercent: "0.00%" },
    // { category: "(iii) Government Companies", equityShares: "1632.00", equityPercent: "0.00%", preferenceShares: "0.00%", preferencePercent: "0.00%" },
    // { category: "Insurance Companies", isSectionHeader: true, equityShares: "88770641.00", equityPercent: "5.01%", preferenceShares: "0.00", preferencePercent: "0.00%" },
    // { category: "Banks", isSectionHeader: true, equityShares: "1891383.00", equityPercent: "0.11%", preferenceShares: "0.00", preferencePercent: "0.00%" },
    // { category: "Financial Institutions", isSectionHeader: true, equityShares: "0.00", equityPercent: "0.00%", preferenceShares: "0.00", preferencePercent: "0.00%" },
    // { category: "Foreign Institutional Investor", isSectionHeader: true, equityShares: "280438366.00", equityPercent: "15.83%", preferenceShares: "0.00", preferencePercent: "0.00%" },
    // { category: "Mutual Fund", isSectionHeader: true, equityShares: "105889338.00", equityPercent: "5.98%", preferenceShares: "0.00", preferencePercent: "0.00%" },
    // { category: "Venture Capital", isSectionHeader: true, equityShares: "0.00", equityPercent: "0.00%", preferenceShares: "0.00", preferencePercent: "0.00%" },
    // { category: "Body Corporate", isSectionHeader: true, equityShares: "5232010.00", equityPercent: "0.30%", preferenceShares: "0.00", preferencePercent: "0.00%" },
    // { category: "Others", isSectionHeader: true, equityShares: "30252812.00", equityPercent: "1.71%", preferenceShares: "0.00", preferencePercent: "0.00%" },
  ];

  const [isPromotersOpen, setIsPromotersOpen] = React.useState(true);
  const [isPublicOpen, setIsPublicOpen] = React.useState(true);

  return (
    <div className={styles.container}>
      {/* ---------------- FIRST TABLE (UNCHANGED) ---------------- */}
      <div 
        className={styles.headerRow} 
        onClick={() => setIsPromotersOpen(!isPromotersOpen)}
      >
        <div className={styles.headerContent}>
          <span className={styles.title}>Promoters</span>
          <span className={styles.date}>31 Mar 2024</span>
        </div>
        <div className={styles.headerActions}>
           <img 
            src="/icons/chevron-down-dark.svg" 
            alt="Expand" 
            className={`${styles.expandIcon} ${isPromotersOpen ? styles.rotateIcon : ""}`} 
          />
        </div>
      </div>


      {isPromotersOpen && (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th rowSpan="2" className={styles.categoryHeader}>Category</th>
                <th colSpan="2" className={styles.groupHeader}>Equity</th>
                <th colSpan="2" className={styles.groupHeader}>Preference</th>
              </tr>
              <tr>
                <th className={styles.subHeader}>Number of shares</th>
                <th className={styles.subHeader}>Percentage</th>
                <th className={styles.subHeader}>Number of shares</th>
                <th className={styles.subHeader}>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => {
                const hasValues = row.equityShares !== undefined;
                if (row.isSectionHeader && !hasValues) {
                  return (
                    <tr key={index} className={styles.sectionHeaderRow}>
                      <td colSpan="5" className={styles.sectionTitle}>{row.category}</td>
                    </tr>
                  );
                }
                return (
                  <tr key={index} className={row.isSectionHeader ? styles.sectionHeaderRow : ""}>
                    <td className={styles.categoryName}>{row.category}</td>
                    <td className={styles.valueCell}>{row.equityShares || "0.00"}</td>
                    <td className={styles.valueCell}>{row.equityPercent || "0.00%"}</td>
                    <td className={styles.valueCell}>{row.preferenceShares || "0.00"}</td>
                    <td className={styles.valueCell}>{row.preferencePercent || "0.00%"}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className={styles.footerRow}>
                <td className={styles.categoryName}>Total</td>
                <td className={styles.valueCell}>-</td>
                <td className={styles.valueCell}>-%</td>
                <td className={styles.valueCell}>-%</td>
                <td className={styles.valueCell}>-%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      {/* ---------------- SECOND TABLE ---------------- */}
      <div style={{ margin: "32px 0" }} />

      <div 
        className={styles.headerRow}
        onClick={() => setIsPublicOpen(!isPublicOpen)}
      >
        <div className={styles.headerContent}>
          <span className={styles.title}>Public / Other Than Promoters</span>
          <span className={styles.date}>-</span>
        </div>
        <div className={styles.headerActions}>
           <img 
            src="/icons/chevron-down-dark.svg" 
            alt="Expand" 
            className={`${styles.expandIcon} ${isPublicOpen ? styles.rotateIcon : ""}`} 
          />
        </div>
      </div>

      {isPublicOpen && (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th rowSpan="2" className={styles.categoryHeader}>Category</th>
                <th colSpan="2" className={styles.groupHeader}>Equity</th>
                <th colSpan="2" className={styles.groupHeader}>Preference</th>
              </tr>
              <tr>
                <th className={styles.subHeader}>Number of shares</th>
                <th className={styles.subHeader}>Percentage</th>
                <th className={styles.subHeader}>Number of shares</th>
                <th className={styles.subHeader}>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {publicData.map((row, index) => {
                const hasValues = row.equityShares !== undefined;
                if (row.isSectionHeader && !hasValues) {
                  return (
                    <tr key={`pub-${index}`} className={styles.sectionHeaderRow}>
                      <td colSpan="5" className={styles.sectionTitle}>{row.category}</td>
                    </tr>
                  );
                }
                return (
                  <tr key={`pub-${index}`} className={row.isSectionHeader ? styles.sectionHeaderRow : ""}>
                    <td className={styles.categoryName}>{row.category}</td>
                    <td className={styles.valueCell}>{row.equityShares || "-"}</td>
                    <td className={styles.valueCell}>{row.equityPercent || "-%"}</td>
                    <td className={styles.valueCell}>{row.preferenceShares || "-"}</td>
                    <td className={styles.valueCell}>{row.preferencePercent || "-%"}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className={styles.footerRow}>
                <td className={styles.categoryName}>Total</td>
                <td className={styles.valueCell}>-</td>
                <td className={styles.valueCell}>-%</td>
                <td className={styles.valueCell}>-</td>
                <td className={styles.valueCell}>-%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};

export default ShareHoldingsTables;
