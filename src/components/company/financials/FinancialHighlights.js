"use client";

import React from "react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styles from "./FinancialHighlights.module.css";
import FinancialHighlightsTables from "../financialHighlights/FinancialHighlightsTables";
import { useCompanySection } from "@/components/company/context/CompanySectionContext";
import { useEffect, useRef } from "react";

const FinancialHighlights = () => {
  const { activeSubSection } = useCompanySection();

  const containerRef = useRef(null);
  const balanceSheetRef = useRef(null);
  const profitLossRef = useRef(null);
  const cashFlowRef = useRef(null);
  const ratioRef = useRef(null);
  const auditorsRef = useRef(null);
  useEffect(() => {
    if (!activeSubSection) return;

    const scroll = (ref) => {
      ref?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

    switch (activeSubSection) {
      case "Financials Highlights":
        scroll(containerRef);
        break;

      case "Balance Sheet":
        scroll(balanceSheetRef);
        break;

      case "Profit & Loss":
        scroll(profitLossRef);
        break;

      case "Cash Flow":
        scroll(cashFlowRef);
        break;

      case "Ratios":
        scroll(ratioRef);
        break;

      case "Auditors Details":
        scroll(auditorsRef);
        break;

      default:
        break;
    }
  }, [activeSubSection]);

  const topCards = [
    {
      label: "Revenue",
      value: "₹ 9,522.65 Cr",
      change: "-0.32 %",
      isNegative: true,
    },
    {
      label: "Profit",
      value: "₹ 1,403.22 Cr",
      change: "-7.02 %",
      isNegative: true,
    },
    {
      label: "Cash & Bank Balance",
      value: "₹ 24.16 Cr",
      change: "+124.33 %",
      isNegative: false,
    },
    {
      label: "Net Worth",
      value: "₹ 7,423.29 Cr",
      change: "+124.33 %",
      isNegative: false,
    },
    {
      label: "Assets",
      value: "₹ 11,005.47 Cr",
      change: "+124.33 %",
      isNegative: false,
    },
    {
      label: "Outsiders' Liabilities",
      value: "₹ 3,582.18 Cr",
      change: "+124.33 %",
      isNegative: false,
    },
  ];

  const ratioData = [
    {
      label: "EBITDA",
      value: "₹ 1,706.91 Cr",
      change: "-7.19%",
      isNegative: true,
    },
    {
      label: "Net Prot Margin",
      value: "15.47%",
      change: "-1.05%",
      isNegative: true,
    },
    {
      label: "Sales to Fixed Asset",
      value: "4.46",
      change: "-8.23%",
      isNegative: true,
    },
    {
      label: "Debt to EBITDA",
      value: "0.17",
      change: "-55.26%",
      isNegative: true,
    },
    {
      label: "Interest Coverage Ratio",
      value: "17.14",
      change: "-24.39%",
      isNegative: true,
    },
    {
      label: "Net Worth Margin",
      value: "0.19%",
      change: "-0.03%",
      isNegative: true,
    },
    {
      label: "Debt to Equity",
      value: "0.04",
      change: "-60.00%",
      isNegative: true,
    },
    {
      label: "Return on Equity",
      value: "18.9%",
      change: "-2.92%",
      isNegative: true,
    },
    {
      label: "Equity Multiplier",
      value: "1.48",
      change: "-2.63%",
      isNegative: true,
    },
  ];

  const chartData = [
    { year: "2015", revenue: 7800, profit: 3200 },
    { year: "2016", revenue: 7800, profit: 3200 },
    { year: "2017", revenue: 7800, profit: 3200 },
    { year: "2018", revenue: 7800, profit: 3200 },
    { year: "2019", revenue: 7800, profit: 3200 },
    { year: "2020", revenue: 7800, profit: 3200 },
    { year: "2021", revenue: 7800, profit: 3200 },
    { year: "2022", revenue: 7800, profit: 3200 },
    { year: "2023", revenue: 7800, profit: 3200 },
    { year: "2024", revenue: 7800, profit: 3200 },
    { year: "2025", revenue: 7800, profit: 3200 },
  ];

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Financials</h1>
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
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Financials Highlights</h2>
        {/* <Link
            href="/company/financialHighlights"
            className={styles.viewDetails}
            >
            View Full Detials
            <img
                src="/icons/chevron-right.svg"
                alt=""
                className={styles.chevron}
            />
        </Link> */}
      </div>
      <div className={styles.topGrid}>
        {topCards.map((card, idx) => (
          <div key={idx} className={styles.statCard}>
            <div className={styles.statHeader}>
              <span className={styles.statLabel}>{card.label}</span>
              <span
                className={`${styles.badge} ${card.isNegative ? styles.negativeBadge : styles.positiveBadge}`}
              >
                {card.change}
              </span>
            </div>
            <div className={styles.statValue}>{card.value}</div>
          </div>
        ))}
      </div>

      <div className={styles.tableSection}>
        {ratioData.map((item, idx) => (
          <div key={idx} className={styles.tableRow}>
            <span className={styles.rowLabel}>{item.label}</span>
            <span className={styles.rowValue}>{item.value}</span>
            <span
              className={`${styles.rowBadge} ${item.isNegative ? styles.rowNegative : styles.rowPositive}`}
            >
              <img
                src={
                  item.isNegative
                    ? "/icons/arrow-down.svg"
                    : "/icons/arrow-up-green.svg"
                }
                alt=""
                className={styles.arrowIcon}
              />
              {item.change}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.chartSection}>
        <div className={styles.chartHeader}>
          <h3 className={styles.chartTitle}>Revenue & Profit Trend</h3>
          <div className={styles.customLegend}>
            <div className={styles.legendItem}>
              <span className={styles.blueDot}></span> Revenue
            </div>
            <div className={styles.legendItem}>
              <span className={styles.greenDot}></span> Profit
            </div>
          </div>
        </div>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
            >
              {/* Added strokeDasharray="5 5" for the dotted horizontal lines shown in design */}
              <CartesianGrid
                strokeDasharray="5 5"
                vertical={false}
                stroke="#E5E7EB"
              />
              <XAxis
                dataKey="year"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "rgba(113, 113, 122, 1)",
                  fontSize: 14,
                  fontWeight: 500,
                }}
                dy={15}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "rgba(55, 65, 81, 1)",
                  fontSize: 14,
                  fontWeight: 500,
                }}
                tickFormatter={(value) => `${value} cr`}
                domain={[0, 10000]}
                ticks={[
                  0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000,
                  10000,
                ]}
              />
              <Tooltip cursor={{ fill: "transparent" }} />
              {/* radius={[20, 20, 20, 20]} creates the pill shape seen in the image */}
              <Bar
                dataKey="revenue"
                fill="rgba(59, 130, 246, 1)"
                radius={[20, 20, 0, 0]}
                barSize={28}
              />
              <Bar
                dataKey="profit"
                fill="rgba(34, 197, 94, 1)"
                radius={[20, 20, 0, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <FinancialHighlightsTables />
    </div>
  );
};

export default FinancialHighlights;
