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

const OwnershipSection = ({companyHighlights}) => {

  const shareholding=companyHighlights?.shareholding;

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

  const promoterHoldingData = [
    // { name: "Indian", value: 4.55, color: "#818CF8" },
    // { name: "Non-Resident Indian (NRI)", value: 0.28, color: "#A78BFA" },
    // { name: "Insurance Companies", value: 5.01, color: "#84CC16" },
    // { name: "Banks", value: 0.11, color: "#C084FC" },
    // { name: "Foreign Institutional Investor", value: 15.83, color: "#0F172A" },
    // { name: "Mutual Fund", value: 5.98, color: "#0EA5E9" },
    // { name: "Body Corporate", value: 0.30, color: "#14B8A6" },
    // { name: "Others", value: 1.71, color: "#D946EF" },
  ];

  /* 
    Calculate remaining to make 100% just in case, 
    but for this UI we just render what is given
  */

  const [isPromoterOpen, setIsPromoterOpen] = React.useState(false);

  const groupStats = [
    { label: "Holding Company", value: "-", type: "blue" },
    { label: "Subsidiary Company", value: "-", type: "red" },
    { label: "Associate Company", value: "-", type: "purple" },
    { label: "Joint Ventures", value: "-", type: "green" },
  ];

  return (
    <div ref={mainWrapperRef} className={styles.mainWrapper}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Control & Ownership</h1>
        <div className={styles.headerInfo}>
          <span className={styles.infoGroup}>
            <span className={styles.infoLabel}>Source:</span>
            <span className={styles.infoValue}>-</span>
          </span>
          <span className={styles.infoDivider}></span>
          <span className={styles.infoGroup}>
            <span className={styles.infoLabel}>Last Updated:</span>
            <span className={styles.infoValue}>-</span>
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
                <span className={styles.statValue}>{shareholding?.promoter_holding ?? "-"}</span>
              </div>
              <div className={`${styles.statItem} ${styles.statItemLast}`}>
                <span className={styles.statLabel}>Non-Promoter Holding</span>
                <span className={styles.statValue}>{shareholding?.non_promoter_holding ?? "-"}</span>
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
                  style={{  width: `${shareholding?.promoter_percentage ?? "-"}%`}}
                ></div>
                <div
                  className={styles.progressNonPromoter}
                  style={{ width: `${shareholding?.non_promoter_percentage ?? "-"}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className={styles.legendGrid}>
            <div className={styles.legendItem}>
              <div className={`${styles.dot} ${styles.dotPromoter}`}></div>
              <div>
                <p className={styles.legendLabel}>Promoter </p>
                <p className={styles.legendValue}>{shareholding?.promoter_percentage}%</p>
              </div>
            </div>
            <div className={styles.legendItem}>
              <div className={`${styles.dot} ${styles.dotNonPromoter}`}></div>
              <div>
                <p className={styles.legendLabel}>Non Promoter</p>
                <p className={styles.legendValue}>{shareholding?.non_promoter_percentage}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Control Insight */}
        <div className={styles.controlInsightCard}>
          <div className={styles.controlInsightHeader}>
             <img src="/icons/blacktick.svg" alt="" className={styles.controlInsightIcon} /> 
             {/* Using a placeholder SVG if needed, or check-circle if available. 
                 Assuming a check icon is needed. 
             */}
             <h3 className={styles.controlInsightTitle}>Control Insight</h3>
          </div>
          <p className={styles.controlInsightText}>
            Promotors hold a controlling majority (-%), enabling full control over ordinary and special resoltuions, with sufficient public float for liquidity.
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
                        <span className={styles.promoterStatValue}>-</span>
                        <span className={styles.promoterStatLabel}>Shares</span>
                    </div>

                    <div className={styles.promoterBadge}>
                        <span className={styles.promoterBadgeValue}>-%</span>
                        <span className={styles.promoterBadgeLabel}>of total equity</span>
                    </div>

                    <p className={styles.promoterDescription}>
                        Detailed classification not available in current fillings.
                    </p>

                    <div className={styles.pledgeLockin}>
                        <div className={styles.pledgeBox}>Pledge:-</div>
                        <div className={styles.pledgeBox}>Lock-in:-</div>
                    </div>
                </div>

                

                {/* RIGHT COLUMN - Donut Chart */}
                <div className={styles.promoterRight}>
                   <h4 className={styles.chartTitle}>Non-Promotor Holding</h4>
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
                          {promoterHoldingData.map((item, idx) => (
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
