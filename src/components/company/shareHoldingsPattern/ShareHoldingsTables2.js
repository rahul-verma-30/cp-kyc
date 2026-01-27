import React from 'react';
import styles from './ShareHoldingsTables2.module.css';

const ShareHoldingsTables2 = () => {
  const directorsData = [
    { name: 'Pritam Das Narang', type: 'Equity', held: '4317558.00', percent: '0.24%' },
    { name: 'Mohit Malhotra', type: 'Equity', held: '1464613.00', percent: '0.08%' },
    { name: 'Ashok Kumar Jain', type: 'Equity', held: '482067.00', percent: '0.03%' },
    { name: 'Saket Burman', type: 'Equity', held: '300000.00', percent: '0.02%' },
    { name: 'Mohit Burman', type: 'Equity', held: '50000.00', percent: '0.00%' },
    { name: 'Ankush Jain', type: 'Equity', held: '28195.00', percent: '0.00%' },
    { name: 'Ravindra Chandra Bhargava', type: 'Equity', held: '3090.00', percent: '0.00%' },
    { name: 'Mukesh Hari Butani', type: 'Equity', held: '2872.00', percent: '0.00%' }
  ];

  // --- Start of added code ---
  const fiiData = [
    { name: 'Ishares Msci Emerging Markets Min Vol Factor Etf', type: 'Equity', held: '3559358.00', percent: '0.20%' },
    { name: 'The Emerging Markets Series Of The Dfa Investment,', type: 'Equity', held: '333478.00', percent: '0.02%' },
    { name: 'Fonditalia Equity India', type: 'Equity', held: '221442.00', percent: '0.01%' },
    { name: 'Fonds De Compensation De La Securite Sociale, Sica', type: 'Equity', held: '135376.00', percent: '0.01%' },
    { name: 'Amundi Index Solutions - Amundi Msci Emerging Esg', type: 'Equity', held: '219599.00', percent: '0.01%' },
    { name: 'Spdr Msci Acwi Ex-us Etf', type: 'Equity', held: '62627.00', percent: '0.00%' },
    { name: 'Imco Emerging Markets Public Equity Lp - Northern', type: 'Equity', held: '19489.00', percent: '0.00%' },
    { name: 'Bureau Of Labor Funds- Labor Retirement Fund-globa', type: 'Equity', held: '109122.00', percent: '0.00%' },
    { name: 'Ubs Fund Management (switzerland) Ag On Behalf Of,', type: 'Equity', held: '48361.00', percent: '0.00%' },
    { name: 'Vanguard Investments Funds Icvc-vanguard Ftse Glob', type: 'Equity', held: '31069.00', percent: '0.00%' }
  ];
  // --- End of added code ---

  // --- Start of new added code for Securities Allotment ---
  const allotmentData = [
    { date: '22 Aug 22', type: 'Cash', instrument: 'Equity Shares', amount: '0.36', count: '35605', nominal: '1.00', premium: '-' },
    { date: '23 May 22', type: 'Cash', instrument: 'Equity Shares', amount: '0.36', count: '35605', nominal: '1.00', premium: '-' },
    { date: '22 Oct 21', type: 'Cash', instrument: 'Equity Shares', amount: '0.36', count: '35605', nominal: '1.00', premium: '-' },
    { date: '19 Aug 21', type: 'Cash', instrument: 'Equity Shares', amount: '0.36', count: '35605', nominal: '1.00', premium: '-' },
    { date: '25 May 21', type: 'Cash', instrument: 'Equity Shares', amount: '0.36', count: '35605', nominal: '1.00', premium: '-' },
    { date: '10 Feb 21', type: 'Cash', instrument: 'Equity Shares', amount: '0.36', count: '35605', nominal: '1.00', premium: '-' },
    { date: '30 Jul 20', type: 'Cash', instrument: 'Equity Shares', amount: '0.36', count: '35605', nominal: '1.00', premium: '-' },
    { date: '15 Jun 20', type: 'Cash', instrument: 'Equity Shares', amount: '0.36', count: '35605', nominal: '1.00', premium: '-' },
    { date: '27 Aug 19', type: 'Cash', instrument: 'Equity Shares', amount: '0.36', count: '35605', nominal: '1.00', premium: '-' },
    { date: '31 May 19', type: 'Cash', instrument: 'Equity Shares', amount: '0.36', count: '35605', nominal: '1.00', premium: '-' }
  ];
  // --- End of new added code ---

  return (
    <div className={styles.container}>
      <h2 className={styles.tableTitle}>Directors Shareholdings</h2>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.thLeft}>Director Name</th>
              <th className={styles.thRight}>Share Type</th>
              <th className={styles.thRight}>Shares Held</th>
              <th className={styles.thRight}>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {directorsData.map((director, index) => (
              <tr key={index}>
                <td className={styles.tdName}>{director.name}</td>
                <td className={styles.tdValue}>{director.type}</td>
                <td className={styles.tdValue}>{director.held}</td>
                <td className={styles.tdValue}>{director.percent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Start of added code --- */}
      <div className={styles.spacer}></div>

      <h2 className={styles.tableTitle}>Foreign Institutional Investor</h2>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.thLeft}>Name of the FII</th>
              <th className={styles.thRight}>Share Type</th>
              <th className={styles.thRight}>Shares Held</th>
              <th className={styles.thRight}>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {fiiData.map((fii, index) => (
              <tr key={index}>
                <td className={styles.tdName}>{fii.name}</td>
                <td className={styles.tdValue}>{fii.type}</td>
                <td className={styles.tdValue}>{fii.held}</td>
                <td className={styles.tdValue}>{fii.percent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.paginationRow}>
        <span className={styles.showingText}>Showing 1-10 of 20</span>
        <div className={styles.paginationControls}>
          <span className={styles.rowsLabel}>Rows per page</span>
          <div className={styles.selectBox}>
            10
            <img src="/icons/chevrons-up-down.svg" alt="down" className={styles.icon} />
          </div>
          <span className={styles.pageLabel}>Page 1 of 10</span>
          <div className={styles.navButtons}>
            <button className={styles.navBtnDisabled}>«</button>
            <button className={styles.navBtnDisabled}>‹</button>
            <button className={styles.navBtn}>›</button>
            <button className={styles.navBtn}>»</button>
          </div>
        </div>
      </div>
      {/* --- End of added code --- */}

      {/* --- Start of new added code for Securities Allotment --- */}
      <div className={styles.spacer}></div>

      <h2 className={styles.tableTitle}>Securities Allotment</h2>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.thLeft}>Allotment Date</th>
              <th className={styles.thLeft}>Allotment Type</th>
              <th className={styles.thLeft}>Instrument</th>
              <th className={styles.thLeft}>Amount (Cr)</th>
              <th className={styles.thLeft}>No. of Securities Allotted</th>
              <th className={styles.thLeft}>Nominal Value</th>
              <th className={styles.thLeft}>Premium Value</th>
            </tr>
          </thead>
          <tbody>
            {allotmentData.map((item, index) => (
              <tr key={index}>
                <td className={styles.tdName}>{item.date}</td>
                <td className={styles.tdName}>{item.type}</td>
                <td className={styles.tdName}>{item.instrument}</td>
                <td className={styles.tdName}>{item.amount}</td>
                <td className={styles.tdName}>{item.count}</td>
                <td className={styles.tdName}>{item.nominal}</td>
                <td className={styles.tdName}>{item.premium}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.paginationRow}>
        <span className={styles.showingText}>Showing 1-10 of 20</span>
        <div className={styles.paginationControls}>
          <span className={styles.rowsLabel}>Rows per page</span>
          <div className={styles.selectBox}>
            10
            <img src="/icons/chevrons-up-down.svg" alt="down" className={styles.icon} />
          </div>
          <span className={styles.pageLabel}>Page 1 of 10</span>
          <div className={styles.navButtons}>
            <button className={styles.navBtnDisabled}>«</button>
            <button className={styles.navBtnDisabled}>‹</button>
            <button className={styles.navBtn}>›</button>
            <button className={styles.navBtn}>»</button>
          </div>
        </div>
      </div>
      <div className={styles.spacer}></div>
        <h2 className={styles.tableTitle}>Details of Shares/Debentures Transfers</h2>
        <div className={styles.emptyStateContainer}>
            <p className={styles.emptyStateText}>
            As on 20 November 2025 Dabur India Limited does not have any Details of Shares/Debentures Transfers as per our records.
            </p>
        </div>
      </div>
  );
};

export default ShareHoldingsTables2;