import styles from './RelatedCorporates.module.css';
import { formatDateToIST } from '@/utils/dateFormatter';

export default function RelatedCorporates({ commonDirectorship, loading, error }) {

  if (loading) {
    return <div className={styles.container}>Loading highlights...</div>;
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div style={{ color: "red", fontWeight: 500 }}>
          {error}
        </div>
      </div>
    );
  }

  if (!commonDirectorship) {
    return (
      <div className={styles.container}>
        <p>Loading related corporates...</p>
      </div>
    );
  }

  const tableData = commonDirectorship?.common_directorships;
  console.log(commonDirectorship.target_company)

  if (!tableData?.length) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.headerTitle}>
            Related Corporates
          </h1>
        </div>
        <p>No related corporates found.</p>
      </div>
    );
  }



  

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Related Corporates</h1>
        <div className={styles.headerInfo}>
          <span className={styles.infoGroup}>
            <span className={styles.infoLabel}>Source:</span>
            <span className={styles.infoValue}>{commonDirectorship?.source || '-'}</span>
          </span>
          <span className={styles.infoDivider}></span>
          <span className={styles.infoGroup}>
            <span className={styles.infoLabel}>Last Updated:</span>
            <span className={styles.infoValue}>{formatDateToIST(commonDirectorship?.last_updated)|| "-"}</span>
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
                        src="/icons/Image.svg"
                        className={styles.companyIcon}
                        alt=""
                      />
                    </div>
                    <span className={styles.companyName}>{row.company_name || "-"}</span>
                  </div>
                </td>
                <td className={styles.td}>{row.common_director || "-"}</td>
                <td className={styles.td}>{row.tenure === "N/A" || row.tenure ? row.tenure : "-"}</td>
                <td className={styles.td}>
                  <span className={styles.statusBadge}>{row.status || "-"}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}