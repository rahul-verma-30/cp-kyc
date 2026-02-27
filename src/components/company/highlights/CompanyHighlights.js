import React, { useState } from "react";
import styles from "./CompanyHighlights.module.css";

const CompanyHighlights = ({companyData}) => {
  const [activeTab, setActiveTab] = useState("open");

  const chargesData = [
    {
      id: "10036700",
      lender: "Others",
      amount: "15,750.00",
      creationDate: "29 Jan 2007",
      modificationDate: "24 Jul 2020",
    },
  ];

  const closedChargesData = [
    {
      id: "100592955",
      lender: "Yes Bank Limited",
      amount: "5.00",
      creationDate: "20 Jun 2022",
      modificationDate: "-",
      satisfactionDate: "27 Feb 2024",
    },
    {
      id: "100592956",
      lender: "HDFC Bank Limited",
      amount: "6.25",
      creationDate: "15 Aug 2022",
      modificationDate: "-",
      satisfactionDate: "30 Dec 2024",
    },
    {
      id: "100592957",
      lender: "ICICI Bank Limited",
      amount: "4.50",
      creationDate: "10 Sep 2022",
      modificationDate: "-",
      satisfactionDate: "15 Mar 2025",
    },
     {
      id: "100592958",
      lender: "State Bank of India",
      amount: "5.75",
      creationDate: "25 Oct 2022",
      modificationDate: "-",
      satisfactionDate: "01 Jan 2025",
    },
     {
      id: "100592959",
      lender: "Kotak Mahindra Bank",
      amount: "6.00",
      creationDate: "12 Nov 2022",
      modificationDate: "-",
      satisfactionDate: "10 Jul 2024",
    },
  ];

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Company Highlights</h1>
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
            <div className={styles.statsGrid}>
              <div className={`${styles.statItem} ${styles.statItemFirst}`}>
                <span className={styles.statLabel}>Total Equity Shares</span>
                <span className={styles.statValue}>1,777,039,162</span>
              </div>
              <div className={`${styles.statItem} ${styles.statItemMiddle}`}>
                <span className={styles.statLabel}>Promoter Holding</span>
                <span className={styles.statValue}>1,178,176,964</span>
              </div>
              <div className={`${styles.statItem} ${styles.statItemLast}`}>
                <span className={styles.statLabel}>Non-Promoter Holding</span>
                <span className={styles.statValue}>598,862,198</span>
              </div>
            </div>
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
                <p className={styles.legendLabel}>Promoter </p>
                <p className={styles.legendValue}>66.3%</p>
              </div>
            </div>
            <div className={styles.legendItem}>
              <div className={`${styles.dot} ${styles.dotNonPromoter}`}></div>
              <div>
                <p className={styles.legendLabel}>Non Promoter</p>
                <p className={styles.legendValue}>33.7%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charges Section */}
      <div className={styles.section}>
        <div className={styles.chargesHeader}>
          <h2 className={styles.sectionTitle}>Charges</h2>
          <div className={styles.toggleContainer}>
            <div
              className={`${styles.toggleSlider} ${
                activeTab === "open" ? styles.sliderOpen : styles.sliderClosed
              }`}
            ></div>
            <button
              className={`${styles.toggleButton} ${
                activeTab === "open" ? styles.activeToggle : ""
              }`}
              onClick={() => setActiveTab("open")}
            >
              Open Charges
            </button>
            <button
              className={`${styles.toggleButton} ${
                activeTab === "closed" ? styles.activeToggle : ""
              }`}
              onClick={() => setActiveTab("closed")}
            >
              Closed Charges
            </button>
          </div>
        </div>

        {activeTab === "open" ? (
          <div className={styles.chargesTableContainer}>
            <table className={styles.chargesTable}>
              <thead>
                <tr>
                  <th>Charge ID</th>
                  <th>Lender</th>
                  <th>Amount Lakh</th>
                  <th>Creation Date</th>
                  <th>Modification Date</th>
                </tr>
              </thead>
              <tbody>
                {chargesData.map((charge) => (
                  <tr key={charge.id}>
                    <td>{charge.id}</td>
                    <td>{charge.lender}</td>
                    <td>{charge.amount}</td>
                    <td>{charge.creationDate}</td>
                    <td>{charge.modificationDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : activeTab === "closed" ? (
          <div className={styles.chargesTableContainer}>
            <table className={styles.chargesTable}>
              <thead>
                <tr>
                  <th>Charge ID</th>
                  <th>Lender</th>
                  <th>Amount Lakh</th>
                  <th>Creation Date</th>
                  <th>Modification Date</th>
                  <th>Satisfaction Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {closedChargesData.map((charge) => (
                  <tr key={charge.id}>
                    <td>{charge.id}</td>
                    <td>{charge.lender}</td>
                    <td>{charge.amount}</td>
                    <td>{charge.creationDate}</td>
                    <td>{charge.modificationDate}</td>
                    <td>{charge.satisfactionDate}</td>
                    <td>
                      <button className={styles.actionButton}>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z"
                            fill="#0F172A"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
             {/* Pagination */}
             <div className={styles.paginationContainer}>
              <span>Showing 1-10 of 20</span>
              <div className={styles.paginationRight}>
                <div className={styles.rowsPerPage}>
                  <span>Rows per page</span>
                  <select className={styles.rowsSelect}>
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                  </select>
                </div>
                <div className={styles.pageInfo}>Page 1 of 10</div>
                <div className={styles.paginationControls}>
                  <button className={styles.paginationButton} disabled>
                    &lt;
                  </button>
                  <button className={styles.paginationButton}>&gt;</button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CompanyHighlights;
