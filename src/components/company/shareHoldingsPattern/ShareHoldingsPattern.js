"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import styles from "./ShareHoldingsPattern.module.css";
import Link from "next/link";

const ShareHoldingsPattern = ({ shareholdingData }) => {
  const summaryStats = [
    { label: "Report Date", value: shareholdingData?.summary?.report_date || "-", type: "blue" },
    { label: "Promoter Shares", value: shareholdingData?.overview?.promoter_holding_shares || "-", type: "red" },
    { label: "Non Promoter Shares", value: shareholdingData?.overview?.non_promoter_holding_shares || "-", type: "green" },
  ];

  const colorMap = {
    "Indian": "#818CF8",
    "Non-Resident Indian (NRI)": "#A78BFA",
    "Insurance Companies": "#84CC16",
    "Banks": "#C084FC",
    "Foreign Institutional Investor": "#0F172A",
    "Mutual Fund": "#0EA5E9",
    "Body Corporate": "#14B8A6",
    "Others": "#D946EF"
  };

  const chartData = [
    {
      title: "Shareholding Summary",
      data: [
        { 
          name: "Promoters", 
          value: parseFloat(shareholdingData?.summary?.promoter_percentage || 0), 
          displayValue: shareholdingData?.summary?.promoter_percentage ? `${shareholdingData?.summary?.promoter_percentage}%` : "-",
          color: "rgba(4, 30, 66, 1)" 
        },
        { 
          name: "Public", 
          value: parseFloat(shareholdingData?.summary?.public_percentage || 0), 
          displayValue: shareholdingData?.summary?.public_percentage ? `${shareholdingData?.summary?.public_percentage}%` : "-",
          color: "rgba(59, 130, 246, 1)" 
        },
      ],
    },
    {
      title: "Detailed Shareholding Breakdown",
      data: [
         // Promoter Holding
         {
            name: "Promoters",
            value: parseFloat(shareholdingData?.summary?.promoter_percentage || 0),
            displayValue: shareholdingData?.summary?.promoter_percentage ? `${shareholdingData?.summary?.promoter_percentage}%` : "-",
            color: "rgba(4, 30, 66, 1)"
         },
         // Non-Promoter Breakdown
         ...(Array.isArray(shareholdingData?.promoter_holding_section?.non_promoter_holding_breakdown) 
            ? shareholdingData.promoter_holding_section.non_promoter_holding_breakdown 
            : [])
            .map(item => {
               const rawValue = item.holding_percentage || "-";
               const numericValue = rawValue === "-" ? 0 : parseFloat(rawValue.replace('%', ''));
               return {
                  name: item.holder_category,
                  value: numericValue,
                  displayValue: rawValue,
                  color: colorMap[item.holder_category] || "#CBD5E1"
               };
            }),
      ]
    }
  ];

  // Add "Remaining" if needed
  chartData.forEach(card => {
    const total = card.data.reduce((acc, curr) => acc + curr.value, 0);
    if (total < 100 && card.data.length > 0 && card.title !== "Shareholding Summary") {
      card.data.push({ 
        name: "Remaining", 
        value: parseFloat((100 - total).toFixed(2)), 
        displayValue: `${(100 - total).toFixed(2)}%`,
        color: "rgba(244, 244, 245, 1)" 
      });
    }
  });

  return (
    <div className={styles.mainWrapper}>
      <nav className={styles.breadcrumb}>
        <Link href={`./`} className={styles.breadcrumbLink}>
          Company Details
        </Link>
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

        <div className={styles.cardsContainer}>
        {chartData.map((item, idx) => (
          item.data.length > 0 && (
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
                        <span className={styles.legendValue}>{row.displayValue}</span>
                      </div>
                      {rIdx < filteredArr.length - 1 && (
                        <div className={styles.legendDivider}></div>
                      )}
                    </React.Fragment>
                  ))}
              </div>
            </div>
          </div>
          )
        ))}
        </div>

        {/* Promoter Details Section */}
        <div className={styles.promoterDetailsCard}>
          <h3 className={styles.promoterDetailsTitle}>Promoter Holding Details</h3>
          <p className={styles.promoterDescription}>
            {shareholdingData?.promoter_holding_section?.detailed_classification_note || "Detailed classification not available in current filings."}
          </p>
          <div className={styles.pledgeLockinGrid}>
            <div className={styles.pledgeBox}>
              <span className={styles.pledgeLabel}>Pledge Status</span>
              <span className={styles.pledgeValue}>{shareholdingData?.promoter_holding_section?.pledge_status || "-"}</span>
            </div>
            <div className={styles.pledgeBox}>
              <span className={styles.pledgeLabel}>Lock-in Status</span>
              <span className={styles.pledgeValue}>{shareholdingData?.promoter_holding_section?.lock_in_status || "-"}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShareHoldingsPattern;
