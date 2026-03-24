"use client";

import React from "react";
import styles from "./OwnershipSection.module.css";
import Link from "next/link";
import ShareHoldingsTables from "../shareHoldingsPattern/ShareHoldingsTables";
import ShareHoldingsTables2 from "../shareHoldingsPattern/ShareHoldingsTables2";
import SubsidiaryAccordion from "../subsidiary/SubsidiaryAccordion";
import InvestmentPage from "../overseasDirectInvestment/OverseasDirectInvestment";
import { useCompanySection } from "@/components/company/context/CompanySectionContext";
import { useEffect, useRef } from "react";
import { scrollToElementWithOffset } from "@/utils/scrollUtils";


import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const OwnershipSection = ({ companyHighlights, shareholdingData, shareholdingLoading, shareholdingError, securityAllotmentData, groupStructureData, overseasInvestmentData }) => {

  const shareholding = shareholdingData?.overview || companyHighlights?.shareholding;

  const { activeSubSection } = useCompanySection();
  const mainWrapperRef = useRef(null); // Shareholding
  const securitiesRef = useRef(null); // Securities Allotment
  const groupStructureRef = useRef(null); // Group Structure
  const odiRef = useRef(null); // ODI

  useEffect(() => {
    if (!activeSubSection) return;

    const scroll = (ref) => {
      if (ref?.current) {
        scrollToElementWithOffset(ref.current, 140);
      }
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

  const rawPromoterHoldingData = (shareholdingData?.promoter_holding_section?.non_promoter_holding_breakdown || [])
    .filter(item => item.holding_percentage && item.holding_percentage !== "-")
    .map(item => ({
      name: item.holder_category,
      value: parseFloat(item.holding_percentage.replace('%', '')),
      color: colorMap[item.holder_category] || "#CBD5E1"
    }));

  const totalHolding = rawPromoterHoldingData.reduce((acc, curr) => acc + curr.value, 0);
  const promoterHoldingData = [...rawPromoterHoldingData];
  
  if (totalHolding < 100 && totalHolding > 0) {
    promoterHoldingData.push({
      name: "Remaining",
      value: parseFloat((100 - totalHolding).toFixed(2)),
      color: "#F1F5F9" // A light gray for remaining
    });
  }

  const [isPromoterOpen, setIsPromoterOpen] = React.useState(false);

  const groupStats = [
    { label: "Holding Company", value: groupStructureData?.summary?.other_entities || "-", type: "blue" },
    { label: "Subsidiary Company", value: groupStructureData?.summary?.subsidiaries || "-", type: "red" },
    { label: "Associate Company", value: groupStructureData?.summary?.associates || "-", type: "purple" },
    { label: "Joint Ventures", value: groupStructureData?.summary?.joint_ventures || "-", type: "green" },
  ];

  if (shareholdingLoading) {
    return <div className={styles.loading}>Loading Shareholding...</div>;
  }

  return (
    <div ref={mainWrapperRef} className={styles.mainWrapper}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Control & Ownership</h1>
        <div className={styles.headerInfo}>
          <span className={styles.infoGroup}>
            <span className={styles.infoLabel}>Source:</span>
            <span className={styles.infoValue}>{shareholdingData?.source || "-"}</span>
          </span>
          <span className={styles.infoDivider}></span>
          <span className={styles.infoGroup}>
            <span className={styles.infoLabel}>Last Updated:</span>
            <span className={styles.infoValue}>{shareholdingData?.last_updated || "-"}</span>
          </span>
        </div>
      </div>

      <section className={styles.section}>

        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Shareholding</h2>
        </div>

        <div className={styles.card}>
          <div className={styles.shareholdingSection}>
            <div className={styles.statsGrid}>
              <div className={`${styles.statItem} ${styles.statItemFirst}`}>
                <span className={styles.statLabel}>Total Equity Shares</span>
                <span className={styles.statValue}>{shareholding?.total_equity_shares ?? "-"}</span>
              </div>
              <div className={`${styles.statItem} ${styles.statItemMiddle}`}>
                <span className={styles.statLabel}>Promoter Holding</span>
                <span className={styles.statValue}>{shareholding?.promoter_holding_shares ?? "-"}</span>
              </div>
              <div className={`${styles.statItem} ${styles.statItemLast}`}>
                <span className={styles.statLabel}>Non-Promoter Holding</span>
                <span className={styles.statValue}>{shareholding?.non_promoter_holding_shares ?? "-"}</span>
              </div>
            </div>
            <div className={styles.chartHeader}>
              <div className={styles.chartLine}></div>
              <span className={styles.chartHeaderText}>Shareholding</span>
              <div className={styles.chartLine}></div>
            </div>

            <div className={styles.progressContainer}>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressPromoter}
                  style={{ width: `${shareholding?.promoter_holding_percentage ?? "-"}%` }}
                ></div>
                <div
                  className={styles.progressNonPromoter}
                  style={{ width: `${shareholding?.non_promoter_holding_percentage ?? "-"}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className={styles.legendGrid}>
            <div className={styles.legendItem}>
              <div className={`${styles.dot} ${styles.dotPromoter}`}></div>
              <div>
                <p className={styles.legendLabel}>Promoter </p>
                <p className={styles.legendValue}>{shareholding?.promoter_holding_percentage && shareholding?.promoter_holding_percentage !== "-" ? `${shareholding?.promoter_holding_percentage}%` : "-"}</p>
              </div>
            </div>
            <div className={styles.legendItem}>
              <div className={`${styles.dot} ${styles.dotNonPromoter}`}></div>
              <div>
                <p className={styles.legendLabel}>Non Promoter</p>
                <p className={styles.legendValue}>{shareholding?.non_promoter_holding_percentage && shareholding?.non_promoter_holding_percentage !== "-" ? `${shareholding?.non_promoter_holding_percentage}%` : "-"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Control Insight */}
        <div className={styles.controlInsightCard}>
          <div className={styles.controlInsightHeader}>
            <img src="/icons/blacktick.svg" alt="" className={styles.controlInsightIcon} />
            <h3 className={styles.controlInsightTitle}>Control Insight</h3>
          </div>
          <p className={styles.controlInsightText}>
            {shareholdingData?.control_insight?.replace(/;/g, ' ') || "No control insight available."}
          </p>
        </div>

        {/* Promoter Holding Section */}
        <div className={styles.promoterHoldingSection}>
          <div
            className={styles.promoterHeader}
            onClick={() => setIsPromoterOpen(!isPromoterOpen)}
            style={{ cursor: "pointer" }}
          >
            <h3 className={styles.promoterTitle}>Promoter Holding</h3>
            <img
              src="/icons/chevron-down-dark.svg"
              alt="Expand"
              className={`${styles.expandIcon} ${isPromoterOpen ? styles.rotateIcon : ""}`}
            />
          </div>

          {isPromoterOpen && (
            <div className={styles.promoterContent}>
              {/* LEFT COLUMN */}
              <div className={styles.promoterLeft}>
                <div className={styles.promoterStatBig}>
                  <span className={styles.promoterStatValue}>{shareholdingData?.promoter_holding_section?.promoter_holding_shares || "-"}</span>
                  <span className={styles.promoterStatLabel}>Shares</span>
                </div>

                <div className={styles.promoterBadge}>
                  <span className={styles.promoterBadgeValue}>
                    {shareholdingData?.promoter_holding_section?.promoter_holding_percentage_of_total_equity &&
                      shareholdingData?.promoter_holding_section?.promoter_holding_percentage_of_total_equity !== "-"
                      ? `${shareholdingData?.promoter_holding_section?.promoter_holding_percentage_of_total_equity}%`
                      : "-"}
                  </span>
                  <span className={styles.promoterBadgeLabel}>of total equity</span>
                </div>
                      
                <p className={styles.promoterDescription}>
                  {shareholdingData?.promoter_holding_section?.detailed_classification_note || "Detailed classification not available in current filings."}
                </p>

                <div className={styles.pledgeLockin}>
                  <div className={styles.pledgeBox}>Pledge: {shareholdingData?.promoter_holding_section?.pledge_status || "-"}</div>
                  <div className={styles.pledgeBox}>Lock-in: {shareholdingData?.promoter_holding_section?.lock_in_status || "-"}</div>
                </div>
              </div>



              {/* RIGHT COLUMN - Donut Chart */}
              <div className={styles.promoterRight}>
                <h4 className={styles.chartTitle}>Non-Promoter Holding Breakdown</h4>
                <div className={styles.chartContainer}>
                  <div className={styles.donutWrapper}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={promoterHoldingData}
                          innerRadius={55}
                          outerRadius={80}
                          paddingAngle={0.5}
                          dataKey="value"
                          stroke="none"
                        >
                          {promoterHoldingData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className={styles.chartLegendGrid}>
                    {promoterHoldingData
                      .filter(item => item.name !== "Remaining")
                      .map((item, idx) => (
                      <div key={idx} className={styles.chartLegendItem}>
                        <div className={styles.legendLeft}>
                          <div
                            className={styles.legendColor}
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className={styles.legendName}>{item.name}:</span>
                        </div>
                        <span className={styles.legendPercent}>{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </section>
      <div ref={securitiesRef}>
        <ShareHoldingsTables 
          shareholdingData={shareholdingData} 
          promoters_table_totals={shareholdingData?.promoters_table_totals}
          public_table_totals={shareholdingData?.public_other_than_promoters_table_totals}
        />
        <ShareHoldingsTables2 
          shareholdingData={shareholdingData} 
          securityAllotmentData={securityAllotmentData}
        />
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
      </section>
      <SubsidiaryAccordion groupStructureData={groupStructureData} />
      <div ref={odiRef}>
        <InvestmentPage overseasInvestmentData={overseasInvestmentData} />
      </div>
    </div>
  );
};

export default OwnershipSection;
