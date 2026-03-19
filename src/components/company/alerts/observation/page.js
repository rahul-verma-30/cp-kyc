import styles from "./Observation.module.css";

const SECTIONS_CONFIG = [
  // {
  //   id: "risk-cat",
  //   title: "Risk Categorisation & EDD Flag",
  //   icon: "/icons/alert-icon.svg",
  //   headers: ["Risk Category", "EDD Required", "Key Risk Drivers", "Last Assessed", "Source"],
  //   data: [
  //     { cat: "High", edd: "Yes", drivers: "Director disqualification, SEBI investigation, GST cancellation, adverse media coverage", date: "08 Jan 2026", src: "Automated Risk Engine" }
  //   ]
  // },
  // {
  //   id: "high-risk",
  //   title: "High-Risk Observations (Auto Summary)",
  //   icon: "/icons/alert-icon.svg",
  //   headers: ["Risk Type", "Description", "Severity", "Source", "Last Updated"],
  //   data: [
  //     { type: "Director Disqualification", desc: "Former director disqualified by MCA for non-compliance", sev: "High", src: "MCA Database", date: "08 Jan 2026" },
  //     { type: "Regulatory Action", desc: "SEBI show-cause notice for delayed disclosure", sev: "High", src: "SEBI Orders", date: "28 Dec 2025" }
  //   ]
  // },
  // {
  //   id: "red-flags",
  //   title: "Regulatory & Statutory Red Flags",
  //   headers: ["Area", "Issue Identified", "Authority", "Severity", "Reference"],
  //   data: [
  //     { area: "GST Compliance", issue: "Registration cancelled", auth: "GST Council", sev: "High", ref: "GST/CAN/2024/001234" }
  //   ]
  // },
  // {
  //   id: "legal",
  //   title: "Legal & Litigation Observations",
  //   headers: ["Case Type", "Court / Forum", "Risk Impact", "Status", "Reference"],
  //   data: [
  //     { type: "Tax Dispute", court: "Supreme Court", impact: "High monetary exposure (₹50Cr+)", status: "Pending", ref: "SC/2024/12345" }
  //   ]
  // },
  // {
  //   id: "media",
  //   title: "Adverse Media & Reputation Risk",
  //   headers: ["Media Source", "Headline / Summary", "Sentiment", "Date", ""],
  //   data: [
  //     { src: "Economic Times", headline: "Product quality concerns raised by consumer groups", sentiment: "Pending", date: "SC/2024/12345", hasAction: true }
  //   ]
  // }
];

export default function ObservationPage() {
  const renderCell = (val, key) => {
    if (val === "High") return <span className={`${styles.badge} ${styles.high}`}><span className={styles.dotRed}></span>High</span>;
    if (val === "Yes") return <span className={`${styles.badge} ${styles.yes}`}>Yes</span>;
    if (val === "Pending") return <span className={`${styles.badge} ${styles.pending}`}>Pending</span>;
    if (key === "hasAction")
  return (
    <div className={styles.actionIcon}>
      <img
        src="/icons/eye.svg"
        alt="View"
        width="20"
        height="20"
      />
    </div>
  );

    return val;
  };

  return (
    <div className={styles.container}>
      {SECTIONS_CONFIG.map((section) => (
        <section key={section.id} className={styles.section}>
          <h3 className={styles.sectionTitle}>
            {section.icon && <img src={section.icon} alt="" width="22" height="22" />}
            {section.title}
          </h3>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>{section.headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {section.data.map((row, i) => (
                  <tr key={i}>
                    {Object.entries(row).map(([key, val], j) => (
                      <td key={j}>{renderCell(val, key)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}