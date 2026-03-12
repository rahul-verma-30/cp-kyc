"use client";

import React, { useEffect, useRef } from "react";
import styles from "./FinancialHighlightsTables.module.css";
import { useCompanySection } from "@/components/company/context/CompanySectionContext";
import { useParams } from "next/navigation";
import { useState } from "react";

const FinancialHighlightsTables = () => {
  const tableData = [
    { type: "header", label: "Shareholder's Fund", values: [] },
    {
      label: "Share Capital",
      values: ["17,723.00", "17,720.00", "17,718.00", "17,679.00", "17,674.00"],
    },
    {
      label: "Reserves And Surplus",
      values: [
        "724,606.00",
        "673,817.00",
        "610,970.00",
        "568,708.00",
        "521,448.00",
      ],
    },
    {
      label: "Money Against Warrant",
      values: ["0.00", "0.00", "0.00", "0.00", "0.00"],
    },
    { label: "Other Equity", values: ["0.00", "0.00", "0.00", "0.00", "0.00"] },
    {
      type: "grand-total",
      label: "Total Equity",
      values: [
        "742,329.00",
        "691,537.00",
        "628,688.00",
        "586,387.00",
        "539,122.00",
      ],
    },

    { type: "header", label: "Non Current Liabilities", values: [] },
    {
      label: "Long Term Borrowings",
      values: ["24,942.00", "49,893.00", "24,945.00", "24,910.00", "1,962.00"],
    },
    {
      label: "Deferred Tax Liabilities (NET)",
      values: ["13,325.00", "10,050.00", "7,676.00", "7,004.00", "0.00"],
    },
    {
      label: "Other Long Term Liabilities",
      values: ["7,432.00", "6,694.00", "5,015.00", "4,459.00", "137.00"],
    },
    {
      label: "Long Term Provisions",
      values: ["6,258.00", "6,004.00", "5,768.00", "5,657.00", "5,555.00"],
    },
    {
      type: "Total Non Current Liabilities-sub",
      label: "Total Non Current Liabilities",
      values: ["51,957.00", "72,641.00", "43,404.00", "42,030.00", "7,654.00"],
    },

    { type: "header", label: "Current Liabilities", values: [] },
    {
      label: "Short Term Borrowings",
      values: ["3,538.00", "19,899.00", "30,776.00", "26,188.00", "15,196.00"],
    },
    {
      label: "Trade Payables",
      values: ["3,538.00", "19,899.00", "30,776.00", "26,188.00", "15,196.00"],
    },
    {
      label: "Other Current Liabilities",
      values: ["3,538.00", "19,899.00", "30,776.00", "26,188.00", "15,196.00"],
    },
    {
      label: "Short Term Provisions",
      values: ["3,538.00", "19,899.00", "30,776.00", "26,188.00", "15,196.00"],
    },
    {
      type: "grand-total",
      label: "Total Current Liabilities",
      values: [
        "306,261.00",
        "289,103.00",
        "263,152.00",
        "230,783.00",
        "203,640.00",
      ],
    },

    {
      type: "grand-total",
      label: "Total Equities & Liabilities",
      values: [
        "1,100,547.00",
        "1,053,281.00",
        "935,244.00",
        "859,200.00",
        "750,416.00",
      ],
    },

    { type: "header", label: "Non-Current Assests", values: [] },
    {
      label: "Tangible Assets",
      values: [
        "198,711.00",
        "185,440.00",
        "164,096.00",
        "137,556.00",
        "117,839.00",
      ],
    },
    {
      label: "Intangible Assets",
      values: ["4,851.00", "2,380.00", "2,101.00", "2,344.00", "2,642.00"],
    },
    {
      label: "Capital Work-In-Progress",
      values: ["13,466.00", "16,154.00", "10,943.00", "12,848.00", "10,726.00"],
    },
    {
      label: "Intangible Assets Under Development",
      values: ["222.00", "2,269.00", "0.00", "0.00", "0.00"],
    },
    {
      label: "Non-Current Investment",
      values: [
        "473,046.00",
        "488,830.00",
        "520,252.00",
        "432,770.00",
        "312,276.00",
      ],
    },
    {
      label: "Deferred Tax Assets(NET)",
      values: ["0.00", "0.00", "0.00", "0.00", "0.00"],
    },
    {
      label: "Long Term Loans And Advances",
      values: ["2,571.00", "3,856.00", "5,141.00", "0.00", "1,637.00"],
    },
    {
      label: "Other Non Current Assets",
      values: ["14,670.00", "11,115.00", "9,583.00", "10,266.00", "20,552.00"],
    },
    {
      type: "grand-total",
      label: "Total Non Current Assets",
      values: [
        "707,537.00",
        "710,044.00",
        "712,116.00",
        "595,784.00",
        "467,417.00",
      ],
    },

    { type: "header", label: "Current Assests", values: [] },
    {
      label: "Current Investment",
      values: ["14,670.00", "11,115.00", "9,583.00", "10,266.00", "20,552.00"],
    },
    {
      label: "Inventories",
      values: ["14,670.00", "11,115.00", "9,583.00", "10,266.00", "20,552.00"],
    },
    {
      label: "Trade Receivables",
      values: ["14,670.00", "11,115.00", "9,583.00", "10,266.00", "20,552.00"],
    },
    {
      label: "Cash And Bank Balance",
      values: ["14,670.00", "11,115.00", "9,583.00", "10,266.00", "20,552.00"],
    },
    {
      label: "Short Term Loans And Advances",
      values: ["14,670.00", "11,115.00", "9,583.00", "10,266.00", "20,552.00"],
    },
    {
      label: "Other Current Assets",
      values: ["14,670.00", "11,115.00", "9,583.00", "10,266.00", "20,552.00"],
    },
    {
      type: "Total Current Assets",
      label: "Total Current Assets",
      values: ["14,670.00", "11,115.00", "9,583.00", "10,266.00", "20,552.00"],
    },

    {
      type: "grand-total",
      label: "Total Assets",
      values: [
        "1,100,547.00",
        "1,053,281.00",
        "935,244.00",
        "859,200.00",
        "750,416.00",
      ],
    },
  ];

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

  const cashFlowData = [
    {
      type: "header",
      label: "Cash Flows From/Used In Operating Activities",
      values: [],
    },
    {
      label: "Prot Before tax",
      values: ["17,723.00", "17,720.00", "17,718.00", "17,679.00", "17,674.00"],
    },
    {
      label: "Adjustments For Finance Costs",
      values: [
        "724,606.00",
        "673,817.00",
        "610,970.00",
        "568,708.00",
        "521,448.00",
      ],
    },
    {
      label: "Adjustments For Decrease/Increase In Inventories",
      values: ["0.00", "0.00", "0.00", "0.00", "0.00"],
    },
    {
      label: "Adjustments For Decrease/Increase In Trade Receivables",
      values: ["0.00", "0.00", "0.00", "0.00", "0.00"],
    },
    {
      label: "Adjustments For Increase/Decrease In Trade Payables",
      values: ["0.00", "0.00", "0.00", "0.00", "0.00"],
    },
    {
      label: "Adjustments For Provisions Current",
      values: ["0.00", "0.00", "0.00", "0.00", "0.00"],
    },
    {
      label: "Adjustments For Other Financial Assets",
      values: ["0.00", "0.00", "0.00", "0.00", "0.00"],
    },
    {
      label: "Adjustments For Other Financial Liabilities Non Current",
      values: ["0.00", "0.00", "0.00", "0.00", "0.00"],
    },
    {
      label: "Adjustments For Decrease/Increase In Other Current Assets",
      values: ["0.00", "0.00", "0.00", "0.00", "0.00"],
    },
    {
      label: "Adjustments For Increase/Decrease In Other Current Liabilities",
      values: ["0.00", "0.00", "0.00", "0.00", "0.00"],
    },
    {
      label: "Adjustments For Depreciation & Amortisation Expense",
      values: ["0.00", "0.00", "0.00", "0.00", "0.00"],
    },
    {
      label: "Adjustments For Unrealised Foreign Exchange Losses Gains",
      values: ["0.00", "0.00", "0.00", "0.00", "0.00"],
    },
    {
      label: "Adjustments For Dividend Income",
      values: ["0.00", "0.00", "0.00", "0.00", "0.00"],
    },
    {
      label: "Adjustments For Interest Income",
      values: ["0.00", "0.00", "0.00", "0.00", "0.00"],
    },
    {
      label: "Other Adjustments For Which Cash Effects Are Investing",
      values: ["0.00", "0.00", "0.00", "0.00", "0.00"],
    },
    {
      label: "Other Adjustments For Non Cash Items",
      values: ["0.00", "0.00", "0.00", "0.00", "0.00"],
    },
    {
      label: "Adjustments For Reconcile Prot Loss",
      values: ["0.00", "0.00", "0.00", "0.00", "0.00"],
    },
    {
      label: "Net Cash Flows From Operations",
      values: ["0.00", "0.00", "0.00", "0.00", "0.00"],
    },
    {
      label: "Income Taxes Paid Refund",
      values: ["0.00", "0.00", "0.00", "0.00", "0.00"],
    },
    {
      type: "Net Cash Flows From Operating Activities",
      label: "Net Cash Flows From Operating Activities",
      values: ["0.00", "0.00", "0.00", "0.00", "0.00"],
    },

    {
      type: "header",
      label: "Cash Flows From/Used In Investing Activities",
      values: [],
    },
    {
      label: "Cash Flows From Losing Control Of Subsidiaries",
      values: ["24,942.00", "49,893.00", "24,945.00", "24,910.00", "1,962.00"],
    },
    {
      label: "Cash Flows Used In Obtaining Control Of Subsidiaries",
      values: ["13,325.00", "10,050.00", "7,676.00", "7,004.00", "0.00"],
    },
    {
      label: "Other Cash Payments To Acquire Equity/Debt",
      values: ["7,432.00", "6,694.00", "5,015.00", "4,459.00", "137.00"],
    },
    {
      label: "Other Cash Receipts From Sales Of Interests",
      values: ["6,258.00", "6,004.00", "5,768.00", "5,657.00", "5,555.00"],
    },
    {
      label: "Proceeds From Sales Of Property Plant & Equipment",
      values: ["51,957.00", "72,641.00", "43,404.00", "42,030.00", "7,654.00"],
    },
    {
      label: "Purchase Of Property Plant & Equipment",
      values: ["51,957.00", "72,641.00", "43,404.00", "42,030.00", "7,654.00"],
    },
    {
      label: "Dividends Received",
      values: ["51,957.00", "72,641.00", "43,404.00", "42,030.00", "7,654.00"],
    },
    {
      label: "Interest Received",
      values: ["51,957.00", "72,641.00", "43,404.00", "42,030.00", "7,654.00"],
    },
    {
      label: "Other Inows Outows Of Cash",
      values: ["51,957.00", "72,641.00", "43,404.00", "42,030.00", "7,654.00"],
    },
    {
      type: "Net Cash Flows From Investing Activities",
      label: "Net Cash Flows From Investing Activities",
      values: ["51,957.00", "72,641.00", "43,404.00", "42,030.00", "7,654.00"],
    },

    {
      type: "header",
      label: "Cash Flows From/Used In Financing Activities",
      values: [],
    },
    {
      label: "Proceeds From Issuing Shares",
      values: ["3,538.00", "19,899.00", "30,776.00", "26,188.00", "15,196.00"],
    },
    {
      label: "Proceeds From Borrowings",
      values: ["3,538.00", "19,899.00", "30,776.00", "26,188.00", "15,196.00"],
    },
    {
      label: "Repayments Of Borrowings",
      values: ["3,538.00", "19,899.00", "30,776.00", "26,188.00", "15,196.00"],
    },
    {
      label: "Payments Of Lease Liabilities",
      values: ["3,538.00", "19,899.00", "30,776.00", "26,188.00", "15,196.00"],
    },
    {
      label: "Dividends Paid",
      values: ["3,538.00", "19,899.00", "30,776.00", "26,188.00", "15,196.00"],
    },
    {
      label: "Interest Paid",
      values: ["3,538.00", "19,899.00", "30,776.00", "26,188.00", "15,196.00"],
    },
    {
      label: "Other Inows Of Cash",
      values: ["3,538.00", "19,899.00", "30,776.00", "26,188.00", "15,196.00"],
    },
    {
      label: "Net Cash Flows From Financing Activities",
      values: ["3,538.00", "19,899.00", "30,776.00", "26,188.00", "15,196.00"],
    },
    {
      label:
        "Net Change In Cash & Cash Equivalent Before Effect Of Exchange Rate Changes",
      values: ["3,538.00", "19,899.00", "30,776.00", "26,188.00", "15,196.00"],
    },
    {
      label: "Net Increase/Decrease In Cash & Cash Equivalents",
      values: ["3,538.00", "19,899.00", "30,776.00", "26,188.00", "15,196.00"],
    },
    {
      type: "Cash And Cash Equivalents At End Of Period",
      label: "Cash And Cash Equivalents At End Of Period",
      values: ["3,538.00", "19,899.00", "30,776.00", "26,188.00", "15,196.00"],
    },
  ];

  const ratioData = [
    { type: "header", label: "Liquidity", values: [] },
    {
      label: "Current Ratio",
      values: ["17,723.00", "17,720.00", "17,718.00", "17,679.00", "17,674.00"],
    },
    {
      label: "Quick Ratio",
      values: [
        "724,606.00",
        "673,817.00",
        "610,970.00",
        "568,708.00",
        "521,448.00",
      ],
    },
    { label: "Cash Ratio", values: ["0.00", "0.00", "0.00", "0.00", "0.00"] },

    { type: "header", label: "Turnover", values: [] },
    {
      label: "Inventory To Sales",
      values: ["24,942.00", "49,893.00", "24,945.00", "24,910.00", "1,962.00"],
    },
    {
      label: "Debtor To Sales",
      values: ["13,325.00", "10,050.00", "7,676.00", "7,004.00", "0.00"],
    },
    {
      label: "Payable To Sales",
      values: ["7,432.00", "6,694.00", "5,015.00", "4,459.00", "137.00"],
    },
    {
      label: "Cash Conversion Cycle (days)",
      values: ["6,258.00", "6,004.00", "5,768.00", "5,657.00", "5,555.00"],
    },
    {
      label: "Sales To Fixed Asset",
      values: ["51,957.00", "72,641.00", "43,404.00", "42,030.00", "7,654.00"],
    },

    { type: "header", label: "Protability", values: [] },
    {
      label: "Net Prot Margin",
      values: ["3,538.00", "19,899.00", "30,776.00", "26,188.00", "15,196.00"],
    },
    {
      label: "Ebitda Margin",
      values: ["3,538.00", "19,899.00", "30,776.00", "26,188.00", "15,196.00"],
    },
    {
      label: "Return On Equity",
      values: ["3,538.00", "19,899.00", "30,776.00", "26,188.00", "15,196.00"],
    },
    {
      label: "Return On Capital Employed",
      values: ["3,538.00", "19,899.00", "30,776.00", "26,188.00", "15,196.00"],
    },
    {
      label: "Net Worth Margin",
      values: ["3,538.00", "19,899.00", "30,776.00", "26,188.00", "15,196.00"],
    },

    { type: "header", label: "Earning/Growth", values: [] },
    {
      label: "Equity Multiplier",
      values: ["3,538.00", "19,899.00", "30,776.00", "26,188.00", "15,196.00"],
    },
    {
      label: "Revenue Growth",
      values: ["3,538.00", "19,899.00", "30,776.00", "26,188.00", "15,196.00"],
    },

    { type: "header", label: "Leverage", values: [] },
    {
      label: "Debt To Ebitda",
      values: ["3,538.00", "19,899.00", "30,776.00", "26,188.00", "15,196.00"],
    },

    { type: "header", label: "Solvency", values: [] },
    {
      label: "Debt To Equity",
      values: ["3,538.00", "19,899.00", "30,776.00", "26,188.00", "15,196.00"],
    },
    {
      label: "Interest Coverage Ratio",
      values: ["3,538.00", "19,899.00", "30,776.00", "26,188.00", "15,196.00"],
    },
  ];


  const { activeSubSection } = useCompanySection();

  const balanceSheetRef = useRef(null);
  const profitLossRef = useRef(null);
  const cashFlowRef = useRef(null);
  const ratioRef = useRef(null);
  const auditorsRef = useRef(null);

  /* ================= Auditor's data ================= */

  const params = useParams();
  const companyName = params?.name;

  const [auditorsData, setAuditorsDatas] = useState([]);
  const [audType, setAudType] = useState("Standalone")

  useEffect(() => {
    console.log("Fetching auditors for:", companyName);

    if (!companyName && !audType) return;

    const getAuditorsData = async () => {
      try {
        console.log("Fetching auditors for:", companyName);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/financials/${companyName}/auditors?type=${audType}`
        );

        const data = await response.json();
        setAuditorsDatas(data?.auditors || []);

      } catch (error) {
        console.log("Error in auditors fetch:", error);
      }
    };

    getAuditorsData();
  }, [companyName, audType]);
  // =========================================


  useEffect(() => {
    if (!activeSubSection) return;

    const scroll = (ref) => {
      ref?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
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
            {row.values.length > 0 ? (
              row.values.map((val, i) => (
                <td key={i} className={styles.valueCell}>
                  {val}
                </td>
              ))
            ) : (
              <>
                <td className={styles.valueCell}></td>
                <td className={styles.valueCell}></td>
                <td className={styles.valueCell}></td>
                <td className={styles.valueCell}></td>
                <td className={styles.valueCell}></td>
              </>
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
          <span className={styles.currencyText}>Values in Cr.</span>
          <div className={styles.toggleContainer}>
            <div
              className={`${styles.toggleSlider} ${viewType === "Standalone" ? styles.sliderStandalone : styles.sliderConsolidated
                }`}
            ></div>
            <button
              className={`${styles.toggleBtn} ${viewType === "Standalone" ? styles.activeToggle : ""}`}
              onClick={() => setViewType("Standalone")}
            >
              Standalone
            </button>
            <button
              className={`${styles.toggleBtn} ${viewType === "Consolidated" ? styles.activeToggle : ""}`}
              onClick={() => setViewType("Consolidated")}
            >
              Consolidated
            </button>
          </div>
        </div>
      </div>


      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.headerRow}>
              <th className={styles.particularsCell}>Particulars</th>
              <th className={styles.dateCell}>31 Mar 2025</th>
              <th className={styles.dateCell}>31 Mar 2024</th>
              <th className={styles.dateCell}>31 Mar 2023</th>
              <th className={styles.dateCell}>31 Mar 2022</th>
              <th className={styles.dateCell}>31 Mar 2021</th>
            </tr>
          </thead>
          {renderTableBody(tableData)}
        </table>
      </div>

      <div
        ref={profitLossRef}
        style={{ marginTop: "32px" }}
        className={styles.headerContainer}
      >
        <div className={styles.headerTitle}>Profit & Loss </div>
        <div className={styles.headerControls}>
          <span className={styles.currencyText}>Values in Cr.</span>
          <div className={styles.toggleContainer}>
            <div
              className={`${styles.toggleSlider} ${viewType === "Standalone" ? styles.sliderStandalone : styles.sliderConsolidated
                }`}
            ></div>
            <button
              className={`${styles.toggleBtn} ${viewType === "Standalone" ? styles.activeToggle : ""}`}
              onClick={() => setViewType("Standalone")}
            >
              Standalone
            </button>
            <button
              className={`${styles.toggleBtn} ${viewType === "Consolidated" ? styles.activeToggle : ""}`}
              onClick={() => setViewType("Consolidated")}
            >
              Consolidated
            </button>
          </div>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.headerRow}>
              <th className={styles.particularsCell}>Particulars</th>
              <th className={styles.dateCell}>31 Mar 2025</th>
              <th className={styles.dateCell}>31 Mar 2024</th>
              <th className={styles.dateCell}>31 Mar 2023</th>
              <th className={styles.dateCell}>31 Mar 2022</th>
              <th className={styles.dateCell}>31 Mar 2021</th>
            </tr>
          </thead>
          {renderTableBody(profitLossData)}
        </table>
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
              className={`${styles.toggleSlider} ${viewType === "Standalone" ? styles.sliderStandalone : styles.sliderConsolidated
                }`}
            ></div>
            <button
              className={`${styles.toggleBtn} ${viewType === "Standalone" ? styles.activeToggle : ""}`}
              onClick={() => setViewType("Standalone")}
            >
              Standalone
            </button>
            <button
              className={`${styles.toggleBtn} ${viewType === "Consolidated" ? styles.activeToggle : ""}`}
              onClick={() => setViewType("Consolidated")}
            >
              Consolidated
            </button>
          </div>
        </div>
      </div>

      <div className={`${styles.tableWrapper} ${styles.cashFlowTable}`}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.headerRow}>
              <th className={styles.particularsCell}>Particulars</th>
              <th className={styles.dateCell}>31 Mar 2025</th>
              <th className={styles.dateCell}>31 Mar 2024</th>
              <th className={styles.dateCell}>31 Mar 2023</th>
              <th className={styles.dateCell}>31 Mar 2022</th>
              <th className={styles.dateCell}>31 Mar 2021</th>
            </tr>
          </thead>
          {renderTableBody(cashFlowData)}
        </table>
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
              className={`${styles.toggleSlider} ${viewType === "Standalone" ? styles.sliderStandalone : styles.sliderConsolidated
                }`}
            ></div>
            <button
              className={`${styles.toggleBtn} ${viewType === "Standalone" ? styles.activeToggle : ""}`}
              onClick={() => setViewType("Standalone")}
            >
              Standalone
            </button>
            <button
              className={`${styles.toggleBtn} ${viewType === "Consolidated" ? styles.activeToggle : ""}`}
              onClick={() => setViewType("Consolidated")}
            >
              Consolidated
            </button>
          </div>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.headerRow}>
              <th className={styles.particularsCell}>Particulars</th>
              <th className={styles.dateCell}>31 Mar 2025</th>
              <th className={styles.dateCell}>31 Mar 2024</th>
              <th className={styles.dateCell}>31 Mar 2023</th>
              <th className={styles.dateCell}>31 Mar 2022</th>
              <th className={styles.dateCell}>31 Mar 2021</th>
            </tr>
          </thead>
          {renderTableBody(ratioData)}
        </table>
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
              className={`${styles.toggleSlider} ${audType == "standalone" ? styles.sliderStandalone : styles.sliderConsolidated
                }`}
            ></div>
            <button
              className={`${styles.toggleBtn} ${audType == "standalone" ? styles.activeToggle : ""}`}
              onClick={() => setAudType("standalone")}
            >
              Standalone
            </button>
            <button
              className={`${styles.toggleBtn} ${audType == "consolidated" ? styles.activeToggle : ""}`}
              onClick={() => setAudType("consolidated")}
            >
              Consolidated
            </button>
          </div>
        </div>
      </div>

      {auditorsData.length > 0 ? <div className={`${styles.tableWrapper} ${styles.auditorTable}`}>
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
      </div> : <div>No Data Available to show</div>}
    </div>
  );
};

export default FinancialHighlightsTables;
