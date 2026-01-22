"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import styles from "./ShareHoldingsPattern.module.css";

const ShareHoldingsPattern = () => {
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
          color: "rgba(59, 130, 246, 1)",
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
    <div className={styles.mainWrapper}>
      <nav className={styles.breadcrumb}>
        <span className={styles.breadcrumbLink}>Company Details</span>
        <span className={styles.breadcrumbSeparator}>
          <img
            src="/icons/arrow-right-black.svg"
            alt=""
            className={styles.breadcrumbIcon}
          />
        </span>
        <span className={styles.breadcrumbActive}>Share Holdings Details</span>
      </nav>
      <section className={styles.section}>
        <div className={styles.sectionWrapper}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Share Holding Pattern</h2>
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
                      outerRadius={80}
                      paddingAngle={0}
                      dataKey="value"
                      stroke="none"
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
    </div>
  );
};

export default ShareHoldingsPattern;
