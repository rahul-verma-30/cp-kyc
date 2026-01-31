"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import styles from "./OwnershipSection.module.css";
import Link from "next/link";
import ShareHoldingsTables from "../shareHoldingsPattern/ShareHoldingsTables";
import ShareHoldingsTables2 from "../shareHoldingsPattern/ShareHoldingsTables2";
import SubsidiaryAccordion from "../subsidiary/SubsidiaryAccordion";
import InvestmentPage from "../overseasDirectInvestment/OverseasDirectInvestment";
import { useCompanySection } from "@/components/company/context/CompanySectionContext";
import { useEffect, useRef } from "react";

const OwnershipSection = () => {
  const { activeSubSection } = useCompanySection();
  const mainWrapperRef = useRef(null); // Shareholding
  const securitiesRef = useRef(null); // Securities Allotment
  const groupStructureRef = useRef(null); // Group Structure
  const odiRef = useRef(null); // ODI

  useEffect(() => {
    if (!activeSubSection) return;

    const scroll = (ref) => {
      ref?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

    switch (activeSubSection) {
      case "Shareholding":
        scroll(mainWrapperRef);
        break;

      case "Securities Allotment":
        scroll(securitiesRef);
        break;

      case "Group Structure":
        scroll(groupStructureRef);
        break;

      case "Overseas Direct Investment (ODI)":
        scroll(odiRef);
        break;

      default:
        break;
    }
  }, [activeSubSection]);

  const summaryStats = [
    { label: "Latest Annual Return", value: "31 Mar 2024", type: "blue" },
    { label: "Promoter Shares", value: "1174000355.00", type: "red" },
    { label: "Non Promoter Shares", value: "4598038807.002", type: "green" },
  ];

  const shareholdingData = [
    {
      title: "Total Shareholders",
      data: [
        { name: "Promoters:", value: 66.26, color: "rgba(4, 30, 66, 1)" },
        {
          name: "Other than promoters:",
          value: 33.77,
          color: "rgba(14, 165, 233, 1)",
        },
      ],
    },
    {
      title: "Total Shareholders",
      data: [
        { name: "Promoters", value: 0.08, color: "rgba(132, 204, 22, 1)" },
        {
          name: "Other than promoters:",
          value: 0.07,
          color: "rgba(168, 85, 247, 1)",
        },
        { name: "Body Corporate:", value: 66.11, color: "rgba(4, 30, 66, 1)" },
        { name: "Remaining", value: 33.74, color: "rgba(244, 244, 245, 1)" },
      ],
    },
    {
      title: "Total Shareholders",
      data: [
        { name: "Indian:", value: 4.55, color: "rgba(99, 102, 241, 1)" },
        {
          name: "Non-Resident Indian (NRI):",
          value: 0.28,
          color: "rgba(139, 92, 246, 1)",
        },
        {
          name: "Insurance Companies:",
          value: 5.01,
          color: "rgba(132, 204, 22, 1)",
        },
        { name: "Banks:", value: 0.11, color: "rgba(168, 85, 247, 1)" },
        {
          name: "Foreign Institutional Investor:",
          value: 15.83,
          color: "rgba(4, 30, 66, 1)",
        },
        { name: "Mutual Fund:", value: 5.98, color: "rgba(14, 165, 233, 1)" },
        { name: "Body Corporate:", value: 0.3, color: "rgba(20, 184, 166, 1)" },
        { name: "Others:", value: 1.71, color: "rgba(217, 70, 239, 1)" },
        { name: "Remaining", value: 70.23, color: "rgba(244, 244, 245, 1)" },
      ],
    },
  ];

  const groupStats = [
    { label: "Holding Company", value: "-", type: "blue" },
    { label: "Subsidiary Company", value: "27", type: "red" },
    { label: "Associate Company", value: "-", type: "purple" },
    { label: "Joint Ventures", value: "1", type: "green" },
  ];

  return (
    <div ref={mainWrapperRef} className={styles.mainWrapper}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Control & Ownership</h1>
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

      <section className={styles.section}>
        <div className={styles.sectionWrapper}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Share Holding Pattern</h2>
            <Link
              href="/company/shareHoldings"
              className={styles.viewAllBtn}
              onClick={(e) => e.preventDefault()}
            >
              View Full Details
              <img
                src="/icons/chevron-right.svg"
                alt=""
                className={styles.arrowIcon}
              />
            </Link>
          </div>

          <div className={styles.statsGrid}>
            {summaryStats.map((stat, idx) => (
              <div
                key={idx}
                className={`${styles.statCard} ${styles[stat.type + "Stat"]}`}
              >
                <p className={styles.statLabel}>{stat.label}</p>
                <p className={styles.statValue}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {shareholdingData.map((item, idx) => (
          <div key={idx} className={styles.card}>
            <p className={styles.cardLabelInside}>{item.title}</p>
            <div className={styles.pieChartContainer}>
              <div className={styles.pieWrapper}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={item.data}
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={0}
                      dataKey="value"
                      stroke="none"
                      minAngle={2} 
                    >
                      {item.data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className={styles.pieLegend}>
                {item.data
                  .filter((d) => d.name !== "Remaining")
                  .map((row, rIdx, filteredArr) => (
                    <React.Fragment key={rIdx}>
                      <div className={styles.legendRow}>
                        <div className={styles.legendIndicator}>
                          <div
                            className={styles.dot}
                            style={{ backgroundColor: row.color }}
                          ></div>
                          <span className={styles.legendText}>{row.name}</span>
                        </div>
                        <span className={styles.legendValue}>{row.value}%</span>
                      </div>
                      {rIdx < filteredArr.length - 1 && (
                        <div className={styles.legendDivider}></div>
                      )}
                    </React.Fragment>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </section>
      <div ref={securitiesRef}>
        <ShareHoldingsTables />
        <ShareHoldingsTables2 />
      </div>

      <section ref={groupStructureRef} className={styles.section}>
        <div className={styles.sectionWrapper}>
          <h2 className={styles.sectionTitle}>Group Structure</h2>

          <div className={styles.statsGrid}>
            {groupStats.map((stat, idx) => (
              <div
                key={idx}
                className={`${styles.statCard} ${styles[stat.type + "Stat"]}`}
              >
                <p className={styles.statLabel}>{stat.label}</p>
                <p className={styles.statValue}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
        {/* <div className={styles.tableWrapper}>
          <table className={styles.activityTable}>
            <thead>
              <tr>
                <th>Company Name</th>
                <th className={styles.textRight}>Percentage</th>
                <th className={styles.textRight}>Relation Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Dabur Egypt Ltd.</td>
                <td className={styles.textRight}>100.00</td>
                <td className={styles.textRight}>Subsidiary</td>
              </tr>
              <tr>
                <td>Dabur International Fze (W.E.F. 07.12.2023)</td>
                <td className={styles.textRight}>100.00</td>
                <td className={styles.textRight}>Subsidiary</td>
              </tr>
            </tbody>
          </table>
        </div> */}
      </section>
      <SubsidiaryAccordion />
      <div ref={odiRef}>
        <InvestmentPage />
      </div>
    </div>
  );
};

export default OwnershipSection;
