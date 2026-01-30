import styles from "./Charges.module.css";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import RowsPerPage from "@/components/common/RowsPerPage";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { useCompanySection } from "@/components/company/context/CompanySectionContext";

export default function ChargesPage() {
  const { activeSubSection } = useCompanySection();

  const containerRef = useRef(null);
  const closedChargesRef = useRef(null);

  useEffect(() => {
    if (!activeSubSection) return;

    const scroll = (ref) => {
      ref?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

    switch (activeSubSection) {
      case "Open Charges":
        scroll(containerRef);
        break;

      case "Closed Charges":
        scroll(closedChargesRef);
        break;

      default:
        break;
    }
  }, [activeSubSection]);

  const closedCharges = [
    {
      id: "100592955",
      lender: "Yes Bank Limited",
      amount: "5.00",
      created: "20 Jun 2022",
      modified: "-",
      satisfied: "27 Feb 2024",
    },
    {
      id: "100592956",
      lender: "HDFC Bank Limited",
      amount: "6.25",
      created: "15 Aug 2022",
      modified: "-",
      satisfied: "30 Dec 2024",
    },
    {
      id: "100592957",
      lender: "ICICI Bank Limited",
      amount: "4.50",
      created: "10 Sep 2022",
      modified: "-",
      satisfied: "15 Mar 2025",
    },
    {
      id: "100592958",
      lender: "State Bank of India",
      amount: "5.75",
      created: "25 Oct 2022",
      modified: "-",
      satisfied: "01 Jan 2025",
    },
    {
      id: "100592959",
      lender: "Kotak Mahindra Bank",
      amount: "6.00",
      created: "12 Nov 2022",
      modified: "-",
      satisfied: "10 Jul 2024",
    },
    {
      id: "100592960",
      lender: "Axis Bank Limited",
      amount: "5.50",
      created: "18 Dec 2022",
      modified: "-",
      satisfied: "22 Aug 2024",
    },
    {
      id: "100592961",
      lender: "Punjab National Bank",
      amount: "4.75",
      created: "30 Jan 2023",
      modified: "-",
      satisfied: "05 Sep 2024",
    },
    {
      id: "100592962",
      lender: "Bank of Baroda",
      amount: "5.10",
      created: "14 Feb 2023",
      modified: "-",
      satisfied: "13 Oct 2025",
    },
    {
      id: "100592963",
      lender: "Union Bank of India",
      amount: "5.30",
      created: "20 Mar 2023",
      modified: "-",
      satisfied: "28 Nov 2024",
    },
    {
      id: "100592964",
      lender: "Canara Bank",
      amount: "6.00",
      created: "05 Apr 2023",
      modified: "-",
      satisfied: "19 Jun 2025",
    },
  ];
  const openChargesData = [
    { name: "Others", value: 158 },
    { name: "Remaining", value: 165 - 158 },
  ];

  const COLORS = ["#0EA5E9", "rgba(244, 244, 245, 1)"];

  const [rowsPerPage, setRowsPerPage] = useState(10);

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Charges</h1>
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

      <section className={styles.statsGrid}>
        <div className={`${styles.statCard} ${styles.blue}`}>
          <div className={styles.statLabel}>Open Charges</div>
          <div className={styles.statValue}>12</div>
        </div>
        <div className={`${styles.statCard} ${styles.red}`}>
          <div className={styles.statLabel}>Open Charges Amount</div>
          <div className={styles.statValue}>15,750.00 Lakh</div>
        </div>
        <div className={`${styles.statCard} ${styles.purple}`}>
          <div className={styles.statLabel}>Closed Charges</div>
          <div className={styles.statValue}>93</div>
        </div>
        <div className={`${styles.statCard} ${styles.green}`}>
          <div className={styles.statLabel}>Closed Charges Amount</div>
          <div className={styles.statValue}>86,031.54 Lakh</div>
        </div>
      </section>

      <section className={styles.chartAndSummary}>
        <div className={styles.chartCard}>
          <h2 className={styles.cardTitle}>Open charges</h2>
          <div className={styles.chartWrapper}>
            <div className={styles.chartWrapper}>
              <ResponsiveContainer width={160} height={160}>
                <PieChart>
                  <Pie
                    data={openChargesData}
                    dataKey="value"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={2}
                    startAngle={90}
                    endAngle={-270}
                  >
                    {openChargesData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <div className={styles.chartLegend}>
                <div className={styles.legendItem}>
                  <span className={styles.legendDot}></span>
                  <span className={styles.legendText}>Others Charges:</span>
                </div>

                <span className={styles.legendValue}>158 Crores</span>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.summaryCard} ${styles.summaryCardAlt}`}>
          <div className={styles.summaryRow}>
            <span>Total Open Charges</span>
            <strong>₹1,575.00 M</strong>
          </div>
          <div className={styles.summaryRow}>
            <span>Total Satised Charges</span>
            <strong>₹8,603.15 M</strong>
          </div>
          <div className={styles.summaryRow}>
            <span>Total No. of Lender(s)</span>
            <strong>37</strong>
          </div>
          <div className={styles.summaryRow}>
            <span>Top Lender</span>
            <strong>Others</strong>
          </div>
          <div className={styles.summaryRow}>
            <span>Last Charge Activity</span>
            <strong>Satisfaction</strong>
          </div>
          <div className={styles.summaryRow}>
            <span>Last Charge Date</span>
            <strong>20 Mar 2024</strong>
          </div>
          <div className={styles.summaryRow}>
            <span>Last Charge Amount</span>
            <strong>₹ 50.33 M</strong>
          </div>
        </div>
      </section>

      <section className={styles.tableSection}>
        <h2 className={styles.sectionTitle}>Open Charges</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Charge ID</th>
                <th>Lender</th>
                <th>Amount Lakh</th>
                <th>Creation Date</th>
                <th>Modication Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>10036700</td>
                <td>Others</td>
                <td>15,750.00</td>
                <td>29 Jan 2007</td>
                <td>24 Jul 2020</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section ref={closedChargesRef} className={styles.tableSection}>
        <h2 className={styles.sectionTitle}>Closed Charges</h2>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Charge ID</th>
                <th>Lender</th>
                <th>Amount Lakh</th>
                <th>Creation Date</th>
                <th>Modication Date</th>
                <th>Satisfaction Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {closedCharges.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.lender}</td>
                  <td>{item.amount}</td>
                  <td>{item.created}</td>
                  <td>{item.modified}</td>
                  <td>{item.satisfied}</td>
                  <td className={styles.actionCell}>
                    <img src="/icons/eye.svg" alt="View" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.paginationRow}>
          <span className={styles.showingText}>Showing 1-10 of 20</span>
          <div className={styles.paginationControls}>
            <span className={styles.rowsLabel}>Rows per page</span>
            <RowsPerPage value={rowsPerPage} onChange={setRowsPerPage} />

            <span className={styles.pageLabel}>Page 1 of 10</span>
            <div className={styles.navButtons}>
              <button className={styles.navBtnDisabled}>«</button>
              <button className={styles.navBtnDisabled}>‹</button>
              <button className={styles.navBtn}>›</button>
              <button className={styles.navBtn}>»</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
