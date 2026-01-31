import styles from "./DefaultsViolations.module.css";

export default function DefaultsViolationsPage() {
  const violations = [
    {
      regulator: "Delhi Stock Exchange Ltd.",
      entity: "Dabur India Limited",
      charges: "Not Available",
      action: "Company Delisted – 23 Jan 2004",
      developments: "-"
    },
    {
      regulator: "Employees' Provident Fund Organisation",
      entity: "Dabur India Limited",
      charges: "Exempted and unexempted establishments defaulted with EPFO including Provident Fund, Pension & EDL contribution, administration charges & penal damages",
      action: "Names of defaulters put on EPFO website - 25 Sep 2018",
      developments: "Not appearing in the list dated 02 Jan 2019"
    },
    {
      regulator: "Securities and Exchange Board of India (SEBI)",
      entity: "Dabur India Limited",
      charges: "Delayed disclosure of material information under SEBI (LODR) Regulations, 2015",
      action: "Names of defaulters put on EPFO website - 25 Sep 2018",
      developments: "Company response pending review"
    }
  ];

  return (
    <div className={styles.container}>
      <h3 className={styles.sectionTitle}>Company-Level Defaults & Violations</h3>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: "20%" }}>Regulator</th>
              <th style={{ width: "15%" }}>Entity</th>
              <th style={{ width: "25%" }}>Regulatory Charges</th>
              <th style={{ width: "20%" }}>Regulatory Action</th>
              <th style={{ width: "20%" }}>Further Developments</th>
            </tr>
          </thead>
          <tbody>
            {violations.map((item, index) => (
              <tr key={index}>
                <td>{item.regulator}</td>
                <td>{item.entity}</td>
                <td>
                  {item.charges === "Not Available" ? (
                    <span className={styles.italicMuted}>{item.charges}</span>
                  ) : (
                    item.charges
                  )}
                </td>
                <td>
                  <a className={styles.linkText}>{item.action}</a>
                </td>
                <td>{item.developments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}