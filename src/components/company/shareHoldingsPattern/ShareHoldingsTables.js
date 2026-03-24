"use client";

import React from "react";
import styles from "./ShareHoldingsTables.module.css";

const ShareHoldingsTables = ({ shareholdingData, promoters_table_totals = {}, public_table_totals = {} }) => {
  const promotersData = Array.isArray(shareholdingData?.promoters_table) ? shareholdingData.promoters_table : [];
  const publicData = Array.isArray(shareholdingData?.public_other_than_promoters_table) ? shareholdingData.public_other_than_promoters_table : [];

  const [isPromotersOpen, setIsPromotersOpen] = React.useState(true);
  const [isPublicOpen, setIsPublicOpen] = React.useState(true);

  return (
    <div className={styles.container}>
      {/* ---------------- PROMOTERS TABLE ---------------- */}
      <div 
        className={styles.headerRow} 
        onClick={() => setIsPromotersOpen(!isPromotersOpen)}
      >
        <div className={styles.headerContent}>
          <span className={styles.title}>Promoters</span>
          <span className={styles.date}>{shareholdingData?.last_updated || "-"}</span>
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
              {promotersData.length > 0 ? (
                promotersData.map((row, index) => (
                  <tr key={index}>
                    <td className={styles.categoryName}>{row.category}</td>
                    <td className={styles.valueCell}>{row.equity_number_of_shares || "-"}</td>
                    <td className={styles.valueCell}>{row.equity_percentage && row.equity_percentage !== "-" ? `${row.equity_percentage}%` : "-"}</td>
                    <td className={styles.valueCell}>{row.preference_number_of_shares || "-"}</td>
                    <td className={styles.valueCell}>{row.preference_percentage && row.preference_percentage !== "-" ? `${row.preference_percentage}%` : "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className={styles.valueCell} style={{ textAlign: "center", padding: "20px" }}>No data available</td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr className={styles.footerRow}>
                <td className={styles.categoryName}>Total</td>
                <td className={styles.valueCell}>{promoters_table_totals.equity_number_of_shares || "-"}</td>
                <td className={styles.valueCell}>{promoters_table_totals.equity_percentage && promoters_table_totals.equity_percentage !== "-" ? `${promoters_table_totals.equity_percentage}%` : "-"}</td>
                <td className={styles.valueCell}>{promoters_table_totals.preference_number_of_shares || "-"}</td>
                <td className={styles.valueCell}>{promoters_table_totals.preference_percentage && promoters_table_totals.preference_percentage !== "-" ? `${promoters_table_totals.preference_percentage}%` : "-"}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      {/* ---------------- PUBLIC / OTHER THAN PROMOTERS TABLE ---------------- */}
      <div style={{ margin: "32px 0" }} />

      <div 
        className={styles.headerRow}
        onClick={() => setIsPublicOpen(!isPublicOpen)}
      >
        <div className={styles.headerContent}>
          <span className={styles.title}>Public / Other Than Promoters</span>
          <span className={styles.date}>{shareholdingData?.last_updated || ""}</span>
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
              {publicData.length > 0 ? (
                publicData.map((row, index) => (
                  <tr key={`pub-${index}`}>
                    <td className={styles.categoryName}>{row.category}</td>
                    <td className={styles.valueCell}>{row.equity_number_of_shares || "-"}</td>
                    <td className={styles.valueCell}>{row.equity_percentage && row.equity_percentage !== "-" ? `${row.equity_percentage}%` : "-"}</td>
                    <td className={styles.valueCell}>{row.preference_number_of_shares || "-"}</td>
                    <td className={styles.valueCell}>{row.preference_percentage && row.preference_percentage !== "-" ? `${row.preference_percentage}%` : "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className={styles.valueCell} style={{ textAlign: "center", padding: "20px" }}>No data available</td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr className={styles.footerRow}>
                <td className={styles.categoryName}>Total</td>
                <td className={styles.valueCell}>{public_table_totals.equity_number_of_shares || "-"}</td>
                <td className={styles.valueCell}>{public_table_totals.equity_percentage && public_table_totals.equity_percentage !== "-" ? `${public_table_totals.equity_percentage}%` : "-"}</td>
                <td className={styles.valueCell}>{public_table_totals.preference_number_of_shares || "-"}</td>
                <td className={styles.valueCell}>{public_table_totals.preference_percentage && public_table_totals.preference_percentage !== "-" ? `${public_table_totals.preference_percentage}%` : "-"}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};

export default ShareHoldingsTables;
