"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./FinancialHighlightsTables.module.css";
import { useCompanySection } from "@/components/company/context/CompanySectionContext";
import { useParams } from "next/navigation";
import { scrollToElementWithOffset } from "@/utils/scrollUtils";


const FinancialHighlightsTables = ({ 
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
  setCfType,
  ratiosData,
  ratiosLoading,
  ratiosError,
  ratiosType,
  setRatiosType
}) => {
  const params = useParams();
  const companyName = params?.name ? decodeURIComponent(params.name.replace(/-/g, " ")).toUpperCase() : "";

  // Helper: get value for a period from a row's values object
  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const getValue = (valuesObj, period) => {
    if (!valuesObj) return "-";
    const v = valuesObj[period];
    return v === undefined || v === null || v === "-" ? "-" : v;
  };

  // Build Balance Sheet period columns
  const bsPeriods = balanceSheetData?.periods
    ? balanceSheetData.periods.filter((p) => p !== "setAttributes" && p !== "isExpandable")
    : [];

  const getBsValue = (valuesObj, period) => getValue(valuesObj, period);

  // Build Cash Flow period columns
  const cfPeriods = cashFlowData?.periods
    ? cashFlowData.periods.filter((p) => p !== "setAttributes")
    : [];

  const getCfValue = (valuesObj, period) => getValue(valuesObj, period);

  // Build Ratios period columns
  const ratiosPeriods = ratiosData?.periods || [];

  const getRatioValue = (valuesObj, period) => getValue(valuesObj, period);

  const buildRatioRows = () => {
    if (!ratiosData) return [];
    const sections = [
      { label: "Liquidity", data: ratiosData.liquidity },
      { label: "Turnover", data: ratiosData.turnover },
      { label: "Profitability", data: ratiosData.profitability },
      { label: "Earning/Growth", data: ratiosData.earning_growth },
      { label: "Leverage", data: ratiosData.leverage },
      { label: "Solvency", data: ratiosData.solvency },
    ];
    const rows = [];
    sections.forEach(({ label, data }) => {
      if (!data || !Array.isArray(data)) return;
      rows.push({ type: "header", label });
      data.forEach((item) => {
        rows.push({
          type: "data",
          label: item.particular_name,
          valuesObj: item.values,
        });
      });
    });
    return rows;
  };

  const ratioRows = buildRatioRows();

  const CASH_FLOW_MAPPING = {
    "Prot Before tax": "operating_activities.profit_before_tax",
    "Adjustments For Finance Costs": "operating_activities.finance_costs",
    "Adjustments For Depreciation And Amortisation": "operating_activities.depreciation",
    "Adjustments For Other Non-Cash Items": "operating_activities.other_adjustments",
    "Changes in Working Capital": "operating_activities.changes_in_working_capital",
    "Income Taxes Paid (Net)": "operating_activities.income_tax_paid",
    "Net Cash Flows From Operating Activities": "operating_activities.net_cash_from_operating_activities",
    "Purchase Of Property Plant And Equipment (Net)": "investing_activities.purchase_of_fixed_assets",
    "Proceeds From Disposal Of Property Plant And Equipment": "investing_activities.proceeds_from_sale_of_assets",
    "Interest Received": "investing_activities.interest_received",
    "Other Income Received": "investing_activities.other_income_received",
    "Net Cash Flows From/(Used In) Investing Activities": "investing_activities.net_cash_from_investing_activities",
    "Proceeds From Long-term Borrowings": "financing_activities.proceeds_from_borrowings",
    "Repayment Of Long-term Borrowings": "financing_activities.repayment_of_borrowings",
    "Dividend Paid": "financing_activities.dividend_paid",
    "Interest Paid": "financing_activities.finance_costs_paid",
    "Other Financing Activities (Net)": "financing_activities.other_financing_activities",
    "Net Cash Flows From/(Used In) Financing Activities": "financing_activities.net_cash_from_financing_activities",
    "Net Increase/(Decrease) In Cash And Cash Equivalents": "net_change_in_cash",
    "Cash And Cash Equivalents At The Beginning Of The Period": "opening_cash_balance",
    "Cash And Cash Equivalents At The End Of The Period": "closing_cash_balance"
  };

  const cfRows = [
    { type: "header", label: "Operating Activities" },
    { label: "Prot Before tax", path: "operating_activities.profit_before_tax" },
    { label: "Adjustments For Finance Costs", path: "operating_activities.finance_costs" },
    { label: "Adjustments For Other Non-Cash Items", path: "operating_activities.other_adjustments" },
    { label: "Adjustments For Depreciation And Amortisation", path: "operating_activities.depreciation" },
    { label: "Adjustments For Other Non-Operating Non-Cash Items", path: "operating_activities.other_non_operating" },
    { label: "Adjustments For (Gain)/Loss On Disposal Of Property Plant And Equipment (Net)", path: "operating_activities.gain_loss_assets" },
    { label: "Operating Prot Before Working Capital Changes", path: "operating_activities.op_profit_before_wc" },
    { label: "(Increase)/Decrease In Trade And Other Receivables", path: "operating_activities.receivables" },
    { label: "(Increase)/Decrease In Inventories", path: "operating_activities.inventories" },
    { label: "(Increase)/Decrease In Other Assets", path: "operating_activities.other_assets" },
    { label: "Increase/(Decrease) In Trade And Other Payables", path: "operating_activities.payables" },
    { label: "Increase/(Decrease) In Other Liabilities", path: "operating_activities.other_liabilities" },
    { label: "Cash Generated From Operations", path: "operating_activities.cash_from_ops" },
    { label: "Income Taxes Paid (Net)", path: "operating_activities.income_tax_paid" },
    { type: "total", label: "Net Cash Flows From Operating Activities", path: "operating_activities.net_cash_from_operating_activities" },

    { type: "header", label: "Investing Activities" },
    { label: "Purchase Of Property Plant And Equipment (Net)", path: "investing_activities.purchase_of_fixed_assets" },
    { label: "Proceeds From Disposal Of Property Plant And Equipment", path: "investing_activities.proceeds_from_sale_of_assets" },
    { label: "(Purchase)/Proceeds From Sale Of Investments (Net)", path: "investing_activities.purchase_of_investments" },
    { label: "Interest Received", path: "investing_activities.interest_received" },
    { label: "Dividend Received", path: "investing_activities.dividend_received" },
    { label: "(Purchase)/Proceeds From Other Investing Activities (Net)", path: "investing_activities.other_income_received" },
    { type: "total", label: "Net Cash Flows From/(Used In) Investing Activities", path: "investing_activities.net_cash_from_investing_activities" },

    { type: "header", label: "Financing Activities" },
    { label: "Proceeds From Issue Of Share Capital", path: "financing_activities.proceeds_from_shares" },
    { label: "Proceeds From Long-term Borrowings", path: "financing_activities.proceeds_from_borrowings" },
    { label: "Repayment Of Long-term Borrowings", path: "financing_activities.repayment_of_borrowings" },
    { label: "Short-term Borrowings (Net)", path: "financing_activities.short_term_borrowings" },
    { label: "Interest Paid", path: "financing_activities.finance_costs_paid" },
    { label: "Dividend Paid", path: "financing_activities.dividend_paid" },
    { label: "Other Financing Activities (Net)", path: "financing_activities.other_financing_activities" },
    { type: "total", label: "Net Cash Flows From/(Used In) Financing Activities", path: "financing_activities.net_cash_from_financing_activities" },

    { type: "grand-total", label: "Net Increase/(Decrease) In Cash And Cash Equivalents", path: "net_change_in_cash" },
    { label: "Cash And Cash Equivalents At The Beginning Of The Period", path: "opening_cash_balance" },
    { label: "Cash And Cash Equivalents At The End Of The Period", path: "closing_cash_balance" },
  ].map(row => {
    if (row.type === "header") return row;
    const dataObj = row.path ? getNestedValue(cashFlowData, row.path) : null;
    return {
      ...row,
      valuesObj: dataObj?.values || null
    };
  });

  const buildBsRows = () => {
    if (!balanceSheetData) return [];
    const sections = [
      { label: "Shareholder's Fund", data: balanceSheetData.shareholders_fund },
      { label: "Non Current Liabilities", data: balanceSheetData.non_current_liabilities },
      { label: "Current Liabilities", data: balanceSheetData.current_liabilities },
      { label: "Non Current Assets", data: balanceSheetData.non_current_assets },
      { label: "Current Assets", data: balanceSheetData.current_assets },
    ];
    const rows = [];
    sections.forEach(({ label, data }) => {
      if (!data) return;
      rows.push({ type: "header", label });
      Object.entries(data).forEach(([key, rowData]) => {
        const displayLabel = key.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
        const isTotal = key.startsWith("total_");
        rows.push({
          type: isTotal ? "grand-total" : "data",
          label: displayLabel,
          valuesObj: rowData?.values,
        });
      });
    });
    return rows;
  };

  const bsRows = buildBsRows();

  const profitLossData = [
    { type: "header", label: "Revenue", values: [] },
    {
      label: "Other Income",
      values: ["17,723.00", "17,720.00", "17,718.00", "17,679.00", "17,674.00"],
    },
    {
      label: "Revenue From Operations",
      values: [
        "724,606.00",
        "673,817.00",
        "610,970.00",
        "568,708.00",
        "521,448.00",
      ],
    },
    {
      type: "grand-total",
      label: "Total Revenue",
      values: [
        "952,265.00",
        "955,322.00",
        "907,652.00",
        "852,105.00",
        "746,138.00",
      ],
    },

    { type: "header", label: "Expenses", values: [] },
    {
      label: "Cost Of Material Consumed",
      values: ["24,942.00", "49,893.00", "24,945.00", "24,910.00", "1,962.00"],
    },
    {
      label: "Finished Goods",
      values: ["13,325.00", "10,050.00", "7,676.00", "7,004.00", "0.00"],
    },
    {
      label: "Other Long Term Liabilities",
      values: ["7,432.00", "6,694.00", "5,015.00", "4,459.00", "137.00"],
    },
    {
      label: "Work-In-Progress",
      values: ["6,258.00", "6,004.00", "5,768.00", "5,657.00", "5,555.00"],
    },
    {
      label: "Stock In Trade",
      values: ["51,957.00", "72,641.00", "43,404.00", "42,030.00", "7,654.00"],
    },
    {
      label: "Employee Benefit Expense",
      values: ["51,957.00", "72,641.00", "43,404.00", "42,030.00", "7,654.00"],
    },
    {
      label: "Managerial Remuneration",
      values: ["51,957.00", "72,641.00", "43,404.00", "42,030.00", "7,654.00"],
    },
    {
      label: "Payment To Auditors",
      values: ["51,957.00", "72,641.00", "43,404.00", "42,030.00", "7,654.00"],
    },
    {
      label: "Insurance Expenses",
      values: ["51,957.00", "72,641.00", "43,404.00", "42,030.00", "7,654.00"],
    },
    {
      label: "Power And Fuel",
      values: ["51,957.00", "72,641.00", "43,404.00", "42,030.00", "7,654.00"],
    },
    {
      label: "Finance Cost",
      values: ["51,957.00", "72,641.00", "43,404.00", "42,030.00", "7,654.00"],
    },
    {
      label: "Depreciation And Amortisation",
      values: ["51,957.00", "72,641.00", "43,404.00", "42,030.00", "7,654.00"],
    },
    {
      label: "Other Expenses",
      values: ["51,957.00", "72,641.00", "43,404.00", "42,030.00", "7,654.00"],
    },
    {
      type: "grand-total",
      label: "Total Expense",
      values: [
        "771,431.00",
        "758,652.00",
        "721,820.00",
        "662,474.00",
        "577,807.00",
      ],
    },
    {
      type: "grand-total",
      label: "Ebitda",
      values: [
        "771,431.00",
        "758,652.00",
        "721,820.00",
        "662,474.00",
        "577,807.00",
      ],
    },

    { type: "header", label: "Exceptional & Extra Ordinary Item", values: [] },
    {
      label: "Exceptional Items",
      values: ["3,538.00", "19,899.00", "30,776.00", "26,188.00", "15,196.00"],
    },
    {
      label: "Extraordinary Items",
      values: ["3,538.00", "19,899.00", "30,776.00", "26,188.00", "15,196.00"],
    },
    {
      label: "Profit Before Extraordinary & Exceptional",
      values: ["3,538.00", "19,899.00", "30,776.00", "26,188.00", "15,196.00"],
    },
    {
      label: "Profit Before Tax",
      values: ["3,538.00", "19,899.00", "30,776.00", "26,188.00", "15,196.00"],
    },

    { type: "header", label: "Tax Expense", values: [] },
    {
      label: "Current Tax",
      values: [
        "198,711.00",
        "185,440.00",
        "164,096.00",
        "137,556.00",
        "117,839.00",
      ],
    },
    {
      label: "Deferred Tax",
      values: ["4,851.00", "2,380.00", "2,101.00", "2,344.00", "2,642.00"],
    },
    {
      label: "Profit From Discontinuing Operations",
      values: ["222.00", "2,269.00", "0.00", "0.00", "0.00"],
    },
    {
      label: "Tax Expense Of Discontinuing Operations",
      values: [
        "473,046.00",
        "488,830.00",
        "520,252.00",
        "432,770.00",
        "312,276.00",
      ],
    },
    {
      type: "Profit/Loss",
      label: "Profit/Loss",
      values: ["0.00", "0.00", "0.00", "0.00", "0.00"],
    },
  ];


  const ratioData = [
    { type: "header", label: "Liquidity", values: [] },
    {
      label: "Current Ratio",
      values: [
        // "17,723.00", "17,720.00", "17,718.00", "17,679.00", "17,674.00"
      ],
    },
    {
      label: "Quick Ratio",
      values: [
        // "724,606.00",
        // "673,817.00",
        // "610,970.00",
        // "568,708.00",
        // "521,448.00",
      ],
    },
    { label: "Cash Ratio", 
      values: [
        // "0.00", "0.00", "0.00", "0.00", "0.00"
      ] },

    { type: "header", label: "Turnover", values: [] },
    {
      label: "Inventory To Sales",
      values: [
        // "24,942.00", "49,893.00", "24,945.00", "24,910.00", "1,962.00"
      ],
    },
    {
      label: "Debtor To Sales",
      values: [
        // "13,325.00", "10,050.00", "7,676.00", "7,004.00", "0.00"
      ],
    },
    {
      label: "Payable To Sales",
      values: [
        // "7,432.00", "6,694.00", "5,015.00", "4,459.00", "137.00"
      ],
    },
    {
      label: "Cash Conversion Cycle (days)",
      values: [
        // "6,258.00", "6,004.00", "5,768.00", "5,657.00", "5,555.00"
      ],
    },
    {
      label: "Sales To Fixed Asset",
      values: [
        // "51,957.00", "72,641.00", "43,404.00", "42,030.00", "7,654.00"
      ],
    },

    { type: "header", label: "Protability", values: [] },
    {
      label: "Net Prot Margin",
      values: [
        // "3,538.00", "19,899.00", "30,776.00", "26,188.00", "15,196.00"
      ],
    },
    {
      label: "Ebitda Margin",
      values: [
        // "3,538.00", "19,899.00", "30,776.00", "26,188.00", "15,196.00"
      ],
    },
    {
      label: "Return On Equity",
      values: [
        // "3,538.00", "19,899.00", "30,776.00", "26,188.00", "15,196.00"
      ],
    },
    {
      label: "Return On Capital Employed",
      values: [
        // "3,538.00", "19,899.00", "30,776.00", "26,188.00", "15,196.00"
      ],
    },
    {
      label: "Net Worth Margin",
      values: [
        // "3,538.00", "19,899.00", "30,776.00", "26,188.00", "15,196.00"
      ],
    },

    { type: "header", label: "Earning/Growth", values: [] },
    {
      label: "Equity Multiplier",
      values: [
        // "3,538.00", "19,899.00", "30,776.00", "26,188.00", "15,196.00"
      ],
    },
    {
      label: "Revenue Growth",
      values: [
        // "3,538.00", "19,899.00", "30,776.00", "26,188.00", "15,196.00"
      ],
    },

    { type: "header", label: "Leverage", values: [] },
    {
      label: "Debt To Ebitda",
      values: [
        // "3,538.00", "19,899.00", "30,776.00", "26,188.00", "15,196.00"
      ],
    },

    { type: "header", label: "Solvency", values: [] },
    {
      label: "Interest Coverage Ratio",
      values: [
        // "3,538.00", "19,899.00", "30,776.00", "26,188.00", "15,196.00"
      ],
    },
  ];


  const { activeSubSection } = useCompanySection();

  const balanceSheetRef = useRef(null);
  const profitLossRef = useRef(null);
  const cashFlowRef = useRef(null);
  const ratioRef = useRef(null);
  const auditorsRef = useRef(null);

  /* ================= Profit & Loss Reference ================= */

  // Build period columns (excluding 'isExpandable' and 'TTM'), limited to first 5
  const pnlPeriods = pnlApiData?.periods
    ? pnlApiData.periods.filter((p) => p !== "isExpandable" && p !== "TTM")
    : [];

  // Helper: get value for a period from a row's values object
  const getPnlValue = (valuesObj, period) => {
    if (!valuesObj) return "-";
    const v = valuesObj[period];
    return v === undefined || v === null ? "-" : v;
  };

  // Flatten API sections into rows for the P&L table
  const buildPnlRows = () => {
    if (!pnlApiData) return [];
    const sections = [
      { label: "Revenue", data: pnlApiData.revenue },
      { label: "Expenses", data: pnlApiData.expenses },
      { label: "Exceptional & Extra Ordinary Items", data: pnlApiData.exceptional },
      { label: "Tax Expense", data: pnlApiData.tax_expense },
    ];
    const rows = [];
    sections.forEach(({ label, data }) => {
      if (!data) return;
      rows.push({ type: "header", label });
      Object.entries(data).forEach(([key, rowData]) => {
        const isTotal = [
          "Total Revenue", "Total Expense", "Ebitda", "Profit Before Tax", "Profit/Loss"
        ].includes(key);
        rows.push({
          type: isTotal ? "grand-total" : "data",
          label: key,
          valuesObj: rowData?.values,
        });
      });
    });
    return rows;
  };

  const pnlRows = buildPnlRows();
  // =========================================


  useEffect(() => {
    if (!activeSubSection) return;

    const scroll = (ref) => {
      if (ref?.current) {
        scrollToElementWithOffset(ref.current, 140);
      }
    };


    switch (activeSubSection) {
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

  const renderTableBody = (data) => (
    <tbody>
      {data.map((row, index) => {
        const isHeader = row.type === "header";
        const isTotal =
          row.type === "total" ||
          row.type === "total-sub" ||
          row.type === "grand-total";

        let rowClass = styles.row;
        if (isHeader) rowClass = styles.sectionHeaderRow;
        if (isTotal) rowClass = styles.totalRow;
        if (row.type === "grand-total")
          rowClass = `${styles.totalRow} ${styles.grandTotalRow}`;

        return (
          <tr key={index} className={rowClass}>
            <td className={styles.labelCell}>{row.label}</td>
            {isHeader ? (
              // Sectors/Headers should have empty cells
              [1, 2, 3, 4, 5].map((_, i) => (
                <td key={i} className={styles.valueCell}></td>
              ))
            ) : row.values.length > 0 ? (
              row.values.map((val, i) => (
                <td key={i} className={styles.valueCell}>
                  {val || "-"}
                </td>
              ))
            ) : (
              // Fallback for missing row values
              [1, 2, 3, 4, 5].map((_, i) => (
                <td key={i} className={styles.valueCell}>-</td>
              ))
            )}
          </tr>
        );
      })}
    </tbody>
  );

  const [viewType, setViewType] = React.useState("Standalone");

  return (
    <div className={styles.container}>
      <div
        ref={balanceSheetRef}
        style={{ marginTop: "20px" }}
        className={styles.headerContainer}
      >
        <div className={styles.headerTitle}>Balance Sheet</div>
        <div className={styles.headerControls}>
          <span className={styles.currencyText}>{balanceSheetData?.currency || "Values in Cr."}</span>
          <div className={styles.toggleContainer}>
            <div
              className={`${styles.toggleSlider} ${bsType === "Standalone" ? styles.sliderStandalone : styles.sliderConsolidated
                }`}
            ></div>
            <button
              className={`${styles.toggleBtn} ${bsType === "Standalone" ? styles.activeToggle : ""}`}
              onClick={() => setBsType("Standalone")}
            >
              Standalone
            </button>
            <button
              className={`${styles.toggleBtn} ${bsType === "Consolidated" ? styles.activeToggle : ""}`}
              onClick={() => setBsType("Consolidated")}
            >
              Consolidated
            </button>
          </div>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        {balanceSheetLoading ? (
          <div style={{ padding: "24px 16px", color: "#71717A", fontSize: "14px" }}>
            Loading Balance Sheet data...
          </div>
        ) : balanceSheetError ? (
          <div style={{ padding: "24px 16px", color: "#EF4444", fontSize: "14px" }}>
            Error: {balanceSheetError}
          </div>
        ) : balanceSheetData && bsPeriods.length > 0 ? (
          <table
            className={styles.table}
            style={{ minWidth: `${250 + bsPeriods.length * 130}px` }}
          >
            <thead>
              <tr className={styles.headerRow}>
                <th className={styles.particularsCell}>Particulars</th>
                {bsPeriods.map((period) => (
                  <th key={period} className={styles.dateCell}>
                    {period}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bsRows.map((row, index) => {
                const isHeader = row.type === "header";
                const isGrandTotal = row.type === "grand-total";
                let rowClass = styles.row;
                if (isHeader) rowClass = styles.sectionHeaderRow;
                if (isGrandTotal)
                  rowClass = `${styles.totalRow} ${styles.grandTotalRow}`;

                return (
                  <tr key={index} className={rowClass}>
                    <td className={styles.labelCell}>{row.label}</td>
                    {isHeader
                      ? bsPeriods.map((p) => (
                          <td key={p} className={styles.valueCell}></td>
                        ))
                      : bsPeriods.map((p) => (
                          <td key={p} className={styles.valueCell}>
                            {getBsValue(row.valuesObj, p)}
                          </td>
                        ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div style={{ padding: "24px 16px", color: "#71717A", fontSize: "14px" }}>
            No Balance Sheet data available.
          </div>
        )}
      </div>

      <div
        ref={profitLossRef}
        style={{ marginTop: "32px" }}
        className={styles.headerContainer}
      >
        <div className={styles.headerTitle}>Profit &amp; Loss</div>
        <div className={styles.headerControls}>
          <span className={styles.currencyText}>
            {pnlApiData?.currency || "Values in Cr."}
          </span>
          <div className={styles.toggleContainer}>
            <div
              className={`${styles.toggleSlider} ${
                pnlViewType === "Standalone"
                  ? styles.sliderStandalone
                  : styles.sliderConsolidated
              }`}
            ></div>
            <button
              className={`${styles.toggleBtn} ${
                pnlViewType === "Standalone" ? styles.activeToggle : ""
              }`}
              onClick={() => setPnlViewType("Standalone")}
            >
              Standalone
            </button>
            <button
              className={`${styles.toggleBtn} ${
                pnlViewType === "Consolidated" ? styles.activeToggle : ""
              }`}
              onClick={() => setPnlViewType("Consolidated")}
            >
              Consolidated
            </button>
          </div>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        {pnlLoading ? (
          <div style={{ padding: "24px 16px", color: "#71717A", fontSize: "14px" }}>
            Loading Profit &amp; Loss data...
          </div>
        )
        //  : pnlError ? (
        //   <div style={{ padding: "24px 16px", color: "#EF4444", fontSize: "14px" }}>
        //     Error: {pnlError}
        //   </div>
        //         ) 
                : pnlApiData && pnlPeriods.length > 0 ? (
          <table
            className={styles.table}
            style={{ minWidth: `${250 + pnlPeriods.length * 130}px` }}
          >
            <thead>
              <tr className={styles.headerRow}>
                <th className={styles.particularsCell}>Particulars</th>
                {pnlPeriods.map((period) => (
                  <th key={period} className={styles.dateCell}>
                    {period}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pnlRows.map((row, index) => {
                const isHeader = row.type === "header";
                const isGrandTotal = row.type === "grand-total";
                let rowClass = styles.row;
                if (isHeader) rowClass = styles.sectionHeaderRow;
                if (isGrandTotal)
                  rowClass = `${styles.totalRow} ${styles.grandTotalRow}`;

                return (
                  <tr key={index} className={rowClass}>
                    <td className={styles.labelCell}>{row.label}</td>
                    {isHeader
                      ? pnlPeriods.map((p) => (
                          <td key={p} className={styles.valueCell}></td>
                        ))
                      : pnlPeriods.map((p) => (
                          <td key={p} className={styles.valueCell}>
                            {getPnlValue(row.valuesObj, p)}
                          </td>
                        ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div style={{ padding: "24px 16px", color: "#71717A", fontSize: "14px" }}>
            No Profit & Loss data available.
          </div>
        )}
      </div>

      <div
        ref={cashFlowRef}
        style={{ marginTop: "32px" }}
        className={styles.headerContainer}
      >
        <div className={styles.headerTitle}>Cash Flow</div>
        <div className={styles.headerControls}>
          <span className={styles.currencyText}>Values in Cr.</span>
          <div className={styles.toggleContainer}>
            <div
              className={`${styles.toggleSlider} ${cfType === "Standalone" ? styles.sliderStandalone : styles.sliderConsolidated
                }`}
            ></div>
            <button
              className={`${styles.toggleBtn} ${cfType === "Standalone" ? styles.activeToggle : ""}`}
              onClick={() => setCfType("Standalone")}
            >
              Standalone
            </button>
            <button
              className={`${styles.toggleBtn} ${cfType === "Consolidated" ? styles.activeToggle : ""}`}
              onClick={() => setCfType("Consolidated")}
            >
              Consolidated
            </button>
          </div>
        </div>
      </div>

      <div className={`${styles.tableWrapper} ${styles.cashFlowTable}`}>
        {cashFlowLoading ? (
          <div style={{ padding: "24px 16px", color: "#71717A", fontSize: "14px" }}>
            Loading Cash Flow data...
          </div>
        
        ) : cashFlowData && cfPeriods.length > 0 ? (
          <table
            className={styles.table}
            style={{ minWidth: `${250 + cfPeriods.length * 130}px` }}
          >
            <thead>
              <tr className={styles.headerRow}>
                <th className={styles.particularsCell}>Particulars</th>
                {cfPeriods.map((p) => (
                  <th key={p} className={styles.dateCell}>{p}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cfRows.map((row, index) => {
                const isHeader = row.type === "header";
                const isTotal = row.type === "total" || row.type === "grand-total";

                let rowClass = styles.row;
                if (isHeader) rowClass = styles.sectionHeaderRow;
                if (isTotal) rowClass = styles.totalRow;
                if (row.type === "grand-total") rowClass = `${styles.totalRow} ${styles.grandTotalRow}`;

                return (
                  <tr key={index} className={rowClass}>
                    <td className={styles.labelCell}>{row.label}</td>
                    {isHeader
                      ? cfPeriods.map((p) => (
                          <td key={p} className={styles.valueCell}></td>
                        ))
                      : cfPeriods.map((p) => (
                          <td key={p} className={styles.valueCell}>
                            {getCfValue(row.valuesObj, p)}
                          </td>
                        ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div style={{ padding: "24px 16px", color: "#71717A", fontSize: "14px" }}>
            No Cash Flow data available.
          </div>
        )}
      </div>

      <div
        ref={ratioRef}
        style={{ marginTop: "32px" }}
        className={styles.headerContainer}
      >
        <div className={styles.headerTitle}>Ratio </div>
        <div className={styles.headerControls}>
          <span className={styles.currencyText}>Values in Cr.</span>
          <div className={styles.toggleContainer}>
            <div
              className={`${styles.toggleSlider} ${ratiosType === "Standalone" ? styles.sliderStandalone : styles.sliderConsolidated
                }`}
            ></div>
            <button
              className={`${styles.toggleBtn} ${ratiosType === "Standalone" ? styles.activeToggle : ""}`}
              onClick={() => setRatiosType("Standalone")}
            >
              Standalone
            </button>
            <button
              className={`${styles.toggleBtn} ${ratiosType === "Consolidated" ? styles.activeToggle : ""}`}
              onClick={() => setRatiosType("Consolidated")}
            >
              Consolidated
            </button>
          </div>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        {ratiosLoading ? (
          <div style={{ padding: "24px 16px", color: "#71717A", fontSize: "14px" }}>
            Loading Ratios data...
          </div>
        ) : ratiosError ? (
          <div style={{ padding: "24px 16px", color: "#EF4444", fontSize: "14px" }}>
            Error: {ratiosError}
          </div>
        ) : ratiosData && ratiosPeriods.length > 0 ? (
          <table
            className={styles.table}
            style={{ minWidth: `${250 + ratiosPeriods.length * 130}px` }}
          >
            <thead>
              <tr className={styles.headerRow}>
                <th className={styles.particularsCell}>Particulars</th>
                {ratiosPeriods.map((p) => (
                  <th key={p} className={styles.dateCell}>{p}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ratioRows.map((row, index) => {
                const isHeader = row.type === "header";
                let rowClass = styles.row;
                if (isHeader) rowClass = styles.sectionHeaderRow;

                return (
                  <tr key={index} className={rowClass}>
                    <td className={styles.labelCell}>{row.label}</td>
                    {isHeader
                      ? ratiosPeriods.map((p) => (
                          <td key={p} className={styles.valueCell}></td>
                        ))
                      : ratiosPeriods.map((p) => (
                          <td key={p} className={styles.valueCell}>
                            {getRatioValue(row.valuesObj, p)}
                          </td>
                        ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div style={{ padding: "24px 16px", color: "#71717A", fontSize: "14px" }}>
            No Ratios data available.
          </div>
        )}
      </div>

      <div
        ref={auditorsRef}
        style={{ marginTop: "32px" }}
        className={styles.headerContainer}
      >
        <div className={styles.headerTitle}>Auditor's Detail </div>
        <div className={styles.headerControls}>
          <span className={styles.currencyText}>Values in Cr.</span>
          <div className={styles.toggleContainer}>
            <div
              className={`${styles.toggleSlider} ${audType == "Standalone" ? styles.sliderStandalone : styles.sliderConsolidated
                }`}
            ></div>
            <button
              className={`${styles.toggleBtn} ${audType == "Standalone" ? styles.activeToggle : ""}`}
              onClick={() => setAudType("Standalone")}
            >
              Standalone
            </button>
            <button
              className={`${styles.toggleBtn} ${audType == "Consolidated" ? styles.activeToggle : ""}`}
              onClick={() => setAudType("Consolidated")}
            >
              Consolidated
            </button>
          </div>
        </div>
      </div>

      {auditorsLoading ? (
        <div style={{ padding: "24px 16px", color: "#71717A", fontSize: "14px" }}>
          Loading Auditors data...
        </div>
      ) : auditorsError ? (
        <div style={{ padding: "24px 16px", color: "#EF4444", fontSize: "14px" }}>
          Error: {auditorsError}
        </div>
      ) : auditorsData && auditorsData.length > 0 ? (
        <div className={`${styles.tableWrapper} ${styles.auditorTable}`}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.headerRow}>
                <th className={styles.dateCell}>Particulars</th>
                <th className={styles.dateCell}>Membership Number</th>
                <th className={styles.dateCell}>Firm Registration number</th>
                <th className={styles.dateCell}>Name of auditor firm</th>
                <th className={styles.dateCell}>PAN</th>
                <th className={styles.dateCell}>Period</th>
              </tr>
            </thead>
            <tbody>
              {auditorsData?.map((row, index) => (
                <tr key={index}>
                  <td className={styles.labelCell}>{row?.auditor_type || "-"}</td>
                  <td className={styles.valueCell}>{row?.membership || "-"}</td>
                  <td className={styles.valueCell}>{row?.registration_no || "-"}</td>
                  <td className={styles.valueCell}>{row?.firm_name || "-"}</td>
                  <td className={styles.valueCell}>{row?.pan || "-"}</td>
                  <td className={styles.valueCell}>{row?.period || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ padding: "24px 16px", color: "#71717A", fontSize: "14px" }}>
          No Auditors data available.
        </div>
      )}
    </div>
  );
};

export default FinancialHighlightsTables;
