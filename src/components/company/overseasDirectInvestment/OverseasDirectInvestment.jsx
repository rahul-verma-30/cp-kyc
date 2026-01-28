import styles from './OverseasDirectInvestment.module.css';

export default function InvestmentPage() {
  const data = [
    { year: '2023', month: 'September', name: 'DERMOVIVA SKIN ESSENTIALS INC. UNITED STATES OF AMERICA', type: 'Wos', activity: 'Manufacturing', equity: '0.5', loan: '-', guarantee: '-', total: '0.5' },
    { year: '2014', month: 'November', name: 'Dabur International Ltd. United Arab Emirates', type: 'Wholly Owned Subsidiary', activity: 'Manufacturing', equity: '0.5', loan: '-', guarantee: '10.1061', total: '10.1061' },
    { year: '2013', month: 'July', name: 'Dabur International Ltd. United Arab Emirates', type: 'Wholly Owned Subsidiary', activity: 'Manufacturing', equity: '0.5', loan: '-', guarantee: '-', total: '0.5' },
    { year: '2013', month: 'February', name: 'Dabur International Ltd. United Arab Emirates', type: 'Wholly Owned Subsidiary', activity: 'Manufacturing', equity: '0.5', loan: '-', guarantee: '-', total: '0.5' },
    { year: '2012', September: 'September', name: 'Dabur International Ltd. United Arab Emirates', type: 'Wholly Owned Subsidiary', activity: 'Manufacturing', equity: '0.5', loan: '-', guarantee: '-', total: '0.5', month: 'September' },
    { year: '2012', month: 'June', name: 'Dabur International Ltd. United Arab Emirates', type: 'Wholly Owned Subsidiary', activity: 'Manufacturing', equity: '0.5', loan: '-', guarantee: '-', total: '0.5' },
    { year: '2012', month: 'May', name: 'Dabur International Ltd. United Arab Emirates', type: 'Wholly Owned Subsidiary', activity: 'Manufacturing', equity: '0.5', loan: '-', guarantee: '-', total: '0.5' },
    { year: '2012', month: 'March', name: 'Dabur International Ltd. United Arab Emirates', type: 'Wholly Owned Subsidiary', activity: 'Manufacturing', equity: '0.5', loan: '-', guarantee: '-', total: '0.5' },
    { year: '2012', month: 'January', name: 'Dabur International Ltd. United Arab Emirates', type: 'Wholly Owned Subsidiary', activity: 'Manufacturing', equity: '0.5', loan: '-', guarantee: '-', total: '0.5' },
    { year: '2011', month: 'November', name: 'Dabur International Ltd. United Arab Emirates', type: 'Wholly Owned Subsidiary', activity: 'Manufacturing', equity: '0.5', loan: '-', guarantee: '-', total: '0.5' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>Overseas Direct Investment</h1>
        <span className={styles.currency}>In USD Million</span>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Year</th>
              <th>Month</th>
              <th>Name of the JV/WOS</th>
              <th>Joint Venture/Wholly Owned Subsidiar</th>
              <th>Major Activity</th>
              <th>Equity</th>
              <th>Loan</th>
              <th>Guarantee Issued</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.year}</td>
                <td>{row.month}</td>
                <td className={styles.nameCell}>{row.name}</td>
                <td>{row.type}</td>
                <td>{row.activity}</td>
                <td>{row.equity}</td>
                <td>{row.loan}</td>
                <td>{row.guarantee}</td>
                <td>{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <div className={styles.pageCount}>Showing 1-10 of 20</div>
        <div className={styles.controls}>
          <div className={styles.rowsPerPage}>
            <span className={styles.rowsPerPageText}>Rows per page</span>
            <div className={styles.selectBox}>
              <span>10</span>
              <img src="/icons/chevrons-up-down.svg" alt="" className={styles.iconSmall} />
            </div>
          </div>
          <div className={styles.pageNavigation}>
            <span className={styles.pageNavigationText}>Page 1 of 10</span>
            <div className={styles.navButtons}>
              <button className={styles.navBtn} disabled>
                «
              </button>
              <button className={styles.navBtn} disabled>
                ‹
              </button>
              <button className={styles.navBtn}>
                ›
              </button>
              <button className={styles.navBtn}>
                »
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}