import styles from "./FormerDirectors.module.css";

export default function FormerDirectorsPage() {
  const data = [
    {
      name: "Munesh Narin...",
      label: "Current Director",
      entity: "GPI Textiles Ltd. (CIN: U17117HP2000PLC026391)",
      type: "Did not file financial statements or annual returns for 3 consecutive years",
      action: "Disqualified from Directorship",
      period: "01 Nov 2016 - 31 Oct 2021",
      status: "Completed",
      severity: "High",
    },
  ];

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Company-Level Defaults & Violations</h3>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Director Name</th>
              <th>Related Entity</th>
              <th>Default Type</th>
              <th>Regulatory Action</th>
              <th>Period</th>
              <th>Status</th>
              <th>Severity</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td className={styles.directorCell}>
                  <div className={styles.directorWrapper}>
                    <img
                      src="/images/owner.svg"
                      alt={row.name}
                      width="40"
                      height="40"
                      className={styles.avatar}
                    />
                    <a href="#" className={styles.directorName}>
                      {row.name}
                    </a>
                  </div>

                  <span className={styles.directorLabel}>{row.label}</span>
                </td>
                <td className={styles.entityCell}>{row.entity}</td>
                <td>{row.type}</td>
                <td>{row.action}</td>
                <td>{row.period}</td>
                <td>
                  <span className={`${styles.badge} ${styles.badgeSuccess}`}>
                    {row.status}
                  </span>
                </td>
                <td>
                  <span className={`${styles.badge} ${styles.badgeHigh}`}>
                    <span className={styles.dotRed}></span>
                    {row.severity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
