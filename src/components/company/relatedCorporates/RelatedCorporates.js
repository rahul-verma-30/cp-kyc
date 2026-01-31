import styles from './RelatedCorporates.module.css';

export default function RelatedCorporates() {
  const tableData = [
    {
      name: 'Sds Life Sciences Private Limited',
      directorship: 'Ajit Mohan Sharan',
      incorporation: '12 years 2 months',
      status: 'Active',
    },
    {
      name: 'Savencia Fromage & Dairy India Private Limited',
      directorship: 'Mohit Burman',
      incorporation: '29 years 5 months',
      status: 'Active',
    },
    {
      name: 'International Tax Research And Analysis Foundation',
      directorship: 'Mukesh Hari Butani',
      incorporation: '10 years 8 months',
      status: 'Active',
    },
    {
      name: 'Hitachi Energy India Limited',
      directorship: 'Mukesh Hari Butani',
      incorporation: '6 years 9 months',
      status: 'Active',
    },
    {
      name: 'Burman Hospitality Private Limited',
      directorship: 'Mohit Burman',
      incorporation: '11 years 1 month',
      status: 'Active',
    },
    {
      name: 'Reliance Retail Ventures Limited',
      directorship: 'Rajiv Mehrishi',
      incorporation: '18 years 11 months',
      status: 'Active',
    },
    {
      name: 'Marketopper Securities Private Limited',
      directorship: 'Mohit Burman',
      incorporation: '25 years 4 months',
      status: 'Active',
    },
    {
      name: 'Castrol India Limited',
      directorship: 'Satyavati Berera',
      incorporation: '46 years 5 months',
      status: 'Active',
    },
    {
      name: 'Olive Bar & Kitchen Private Limited',
      directorship: 'Romesh Sobti',
      incorporation: '25 years 5 months',
      status: 'Active',
    },
    {
      name: 'Bmr Business Solutions Private Limited',
      directorship: 'Mukesh Hari Butani',
      incorporation: '20 years 11 months',
      status: 'Active',
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Related Corporates</h1>
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

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.th}>Company Name test</th>
              <th className={styles.th}>Common Directorship</th>
              <th className={styles.th}>Incorporation Date</th>
              <th className={styles.th}>Company Status</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {tableData.map((row, index) => (
              <tr key={index} className={styles.tr}>
                <td className={styles.td}>
                  <div className={styles.companyCell}>
                    <div className={styles.companyIconWrapper}>
                            <img
                              src="/icons/dabur-logo.svg"
                              className={styles.companyIcon}
                              alt=""
                            />
                          </div>
                    <span className={styles.companyName}>{row.name}</span>
                  </div>
                </td>
                <td className={styles.td}>{row.directorship}</td>
                <td className={styles.td}>{row.incorporation}</td>
                <td className={styles.td}>
                  <span className={styles.statusBadge}>{row.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}