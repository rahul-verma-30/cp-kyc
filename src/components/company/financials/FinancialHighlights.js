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

const FinancialHighlights = ({ 
  financialHighlights, 
  revenueProfitTrend, 
  financialLoading, 
  financialError, 
  revenueLoading, 
  revenueError, 
  pnlApiData,
  pnlLoading,
  pnlError,
  pnlViewType,
  setPnlViewType,
  auditorsData, 
  auditorsLoading, 
  auditorsError, 
  audType, 
  setAudType,
  balanceSheetData,
  balanceSheetLoading,
  balanceSheetError,
  bsType,
  setBsType,
  cashFlowData,
  cashFlowLoading,
  cashFlowError,
  cfType,
  setCfType
}) => {

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

  if (!financialHighlights && (financialLoading || revenueLoading)) {
    return (
      <div className={styles.container}>
        <div>Loading highlights...</div>
        <div style={{ marginTop: "40px" }}>
          <FinancialHighlightsTables 
            pnlApiData={pnlApiData}
        pnlLoading={pnlLoading}
        pnlError={pnlError}
        pnlViewType={pnlViewType}
        setPnlViewType={setPnlViewType}
        auditorsData={auditorsData}
            auditorsLoading={auditorsLoading}
            auditorsError={auditorsError}
            audType={audType}
            setAudType={setAudType}
            balanceSheetData={balanceSheetData}
            balanceSheetLoading={balanceSheetLoading}
            balanceSheetError={balanceSheetError}
            bsType={bsType}
            setBsType={setBsType} cashFlowData={cashFlowData} cashFlowLoading={cashFlowLoading} cashFlowError={cashFlowError} cfType={cfType} setCfType={setCfType}
          />
        </div>
      </div>
    );
  }

  if (financialError || revenueError) {
    return (
      <div className={styles.container}>
        <div style={{ color: "#EF4444", fontWeight: 500 }}>
          {financialError || revenueError}
        </div>
        <div style={{ marginTop: "40px" }}>
          <FinancialHighlightsTables 
            pnlApiData={pnlApiData}
        pnlLoading={pnlLoading}
        pnlError={pnlError}
        pnlViewType={pnlViewType}
        setPnlViewType={setPnlViewType}
        auditorsData={auditorsData}
            auditorsLoading={auditorsLoading}
            auditorsError={auditorsError}
            audType={audType}
            setAudType={setAudType}
            balanceSheetData={balanceSheetData}
            balanceSheetLoading={balanceSheetLoading}
            balanceSheetError={balanceSheetError}
            bsType={bsType}
            setBsType={setBsType} cashFlowData={cashFlowData} cashFlowLoading={cashFlowLoading} cashFlowError={cashFlowError} cfType={cfType} setCfType={setCfType}
          />
        </div>
      </div>
    );
  }


  if (!financialHighlights) {
    return <div className={styles.container}>Loading...</div>;
  }

  const financialHighlightsData = financialHighlights;

  if (!revenueProfitTrend) {
    return <div className={styles.container}>Loading...</div>;
  }


  const parseChange = (value) => {
    if (!value) return false;
    const number = parseFloat(value.replace("%", ""));
    return number < 0;
  };

  const topCards = [
    {
      label: "Revenue",
      value: financialHighlightsData?.revenue?.value,
      change: financialHighlightsData?.revenue?.change_pct,
      isNegative: parseChange(
        financialHighlightsData?.revenue?.change_pct
      ),
    },
    {
      label: "Profit",
      value: financialHighlightsData?.profit?.value,
      change: financialHighlightsData?.profit?.change_pct,
      isNegative: parseChange(financialHighlightsData?.profit?.change_pct),
    },
    {
      label: "Cash & Bank Balance",
      value: financialHighlightsData?.cash_and_bank_balance?.value,
      change: financialHighlightsData?.cash_and_bank_balance?.change_pct,
      isNegative: parseChange(financialHighlightsData?.cash_and_bank_balance?.change_pct),
    },
    {
      label: "Net Worth",
      value: financialHighlightsData?.net_worth?.value,
      change: financialHighlightsData?.net_worth?.change_pct,
      isNegative: parseChange(financialHighlightsData?.net_worth?.change_pct),
    },
    {
      label: "Assets",
      value: financialHighlightsData?.assets?.value,
      change: financialHighlightsData?.assets?.change_pct,
      isNegative: parseChange(financialHighlightsData?.assets?.change_pct),
    },
    {
      label: "Outsiders' Liabilities",
      value: financialHighlightsData?.outsiders_liabilities?.value,
      change: financialHighlightsData?.outsiders_liabilities?.change_pct,
      isNegative: parseChange(financialHighlightsData?.outsiders_liabilities?.change_pct),
    },
  ];

  const ratioData = [
    {
      label: "EBITDA",
      value: financialHighlightsData?.ebitda?.value || "-",
      change: financialHighlightsData?.ebitda?.change_pct || "-",
      isNegative: parseChange(financialHighlightsData?.ebitda?.change_pct),
    },
    {
      label: "Net Prot Margin",
      value: financialHighlightsData?.net_profit_margin?.value || "-",
      change: financialHighlightsData?.net_profit_margin?.change_pct || "-",
      isNegative: parseChange(financialHighlightsData?.net_profit_margin?.change_pct),
    },
    {
      label: "Sales to Fixed Asset",
      value: financialHighlightsData?.sales_to_fixed_asset?.value || "-",
      change: financialHighlightsData?.sales_to_fixed_asset?.change_pct || "-",
      isNegative: parseChange(financialHighlightsData?.sales_to_fixed_asset?.change_pct),
    },
    {
      label: "Debt to EBITDA",
      value: financialHighlightsData?.debt_to_ebitda?.value || "-",
      change: financialHighlightsData?.debt_to_ebitda?.change_pct || "-",
      isNegative: parseChange(financialHighlightsData?.debt_to_ebitda?.change_pct),
    },
    {
      label: "Interest Coverage Ratio",
      value: financialHighlightsData?.interest_coverage_ratio?.value || "-",
      change: financialHighlightsData?.interest_coverage_ratio?.change_pct || "-",
      isNegative: parseChange(financialHighlightsData?.interest_coverage_ratio?.change_pct),
    },
    {
      label: "Net Worth Margin",
      value: financialHighlightsData?.net_worth_margin?.value || "-",
      change: financialHighlightsData?.net_worth_margin?.change_pct || "-",
      isNegative: parseChange(financialHighlightsData?.net_worth_margin?.change_pct),
    },
    {
      label: "Debt to Equity",
      value: financialHighlightsData?.debt_to_equity?.value || "-",
      change: financialHighlightsData?.debt_to_equity?.change_pct || "-",
      isNegative: parseChange(financialHighlightsData?.debt_to_equity?.change_pct),
    },
    {
      label: "Return on Equity",
      value: financialHighlightsData?.return_on_equity?.value || "-",
      change: financialHighlightsData?.return_on_equity?.change_pct || "-",
      isNegative: parseChange(financialHighlightsData?.return_on_equity?.change_pct),
    },
    {
      label: "Equity Multiplier",
      value: financialHighlightsData?.equity_multiplier?.value || "-",
      change: financialHighlightsData?.equity_multiplier?.change_pct || "-",
      isNegative: parseChange(financialHighlightsData?.equity_multiplier?.change_pct),
    },
  ];

  // const chartData = [
  //   { year: "2015", revenue: 7800, profit: 3200 },
  //   { year: "2016", revenue: 7800, profit: 3200 },
  //   { year: "2017", revenue: 7800, profit: 3200 },
  //   { year: "2018", revenue: 7800, profit: 3200 },
  //   { year: "2019", revenue: 7800, profit: 3200 },
  //   { year: "2020", revenue: 7800, profit: 3200 },
  //   { year: "2021", revenue: 7800, profit: 3200 },
  //   { year: "2022", revenue: 7800, profit: 3200 },
  //   { year: "2023", revenue: 7800, profit: 3200 },
  //   { year: "2024", revenue: 7800, profit: 3200 },
  //   { year: "2025", revenue: 7800, profit: 3200 },
  const chartData = (revenueProfitTrend?.trend || [])
    .filter((item) => item.year !== "TTM" && item.year !== "isExpandable")
    .map((item) => ({
      year: item.year,
      revenue: item.revenue_cr,
      profit: item.profit_cr,
    }))
    .reverse();

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Financials</h1>
        <div className={styles.headerInfo}>
          <span className={styles.infoGroup}>
            <span className={styles.infoLabel}>Source:</span>
            <span className={styles.infoValue}>{financialHighlights.source || "-"}</span>
          </span>
          <span className={styles.infoDivider}></span>
          <span className={styles.infoGroup}>
            <span className={styles.infoLabel}>Last Updated:</span>
            <span className={styles.infoValue}>{financialHighlights.last_updated || "-"}</span>
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
              className={`${styles.rowBadge} ${
                item.change === '-' || item.change === null || item.change === undefined
                  ? styles.rowNegative 
                  : item.isNegative 
                    ? styles.rowNegative 
                    : styles.rowPositive
              }`}
            >
              {item.change === '-' || item.change === null || item.change === undefined ? (
                '-'
              ) : (
                <>
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
                </>
              )}
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
            <div className={styles.legendDivider}></div>
            <div className={styles.legendItem}>
              <span className={styles.greenDot}></span> Profit
            </div>
          </div>
        </div>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 10, left: 0, bottom: 0 }}
            >
              {/* Added strokeDasharray="5 5" for the dotted horizontal lines shown in design */}
              <CartesianGrid
                strokeDasharray="5 5"
                vertical={false}
                stroke="#E5E7EB"
              />
              <XAxis
                dataKey="year"
                axisLine={{ stroke: "rgba(229, 231, 235, 1)" }}
                tickLine={false}
                tick={{
                  fill: "rgba(113, 113, 122, 1)",
                  fontSize: 14,
                  fontWeight: 500,
                }}
                dy={6}
              />
              <YAxis
                width={70}
                axisLine={{ stroke: "rgba(229, 231, 235, 1)" }}
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
                barSize={32.73}
              />
              <Bar
                dataKey="profit"
                fill="rgba(34, 197, 94, 1)"
                radius={[20, 20, 0, 0]}
                barSize={32.73}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <FinancialHighlightsTables 
        pnlApiData={pnlApiData}
        pnlLoading={pnlLoading}
        pnlError={pnlError}
        pnlViewType={pnlViewType}
        setPnlViewType={setPnlViewType}
        auditorsData={auditorsData}
        auditorsLoading={auditorsLoading}
        auditorsError={auditorsError}
        audType={audType}
        setAudType={setAudType}
        balanceSheetData={balanceSheetData}
        balanceSheetLoading={balanceSheetLoading}
        balanceSheetError={balanceSheetError}
        bsType={bsType}
        setBsType={setBsType} cashFlowData={cashFlowData} cashFlowLoading={cashFlowLoading} cashFlowError={cashFlowError} cfType={cfType} setCfType={setCfType}
      />
    </div>
  );
};

export default FinancialHighlights;
