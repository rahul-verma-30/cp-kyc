"use client";

import React, { useState } from "react";
import styles from "./newSidebar.module.css";

import { useCompanySection } from "@/components/company/context/CompanySectionContext";

const CompanyNewSidebar = () => {
  const { activeSection, setActiveSection } = useCompanySection();

  // Set default states to true to match the expanded look of the image
  const [expandedSections, setExpandedSections] = useState({
    companyDetails: true,
    directorsKmp: true,
    controlOwnership: true,
    financials: true,
    charges: true,
    compliance: true,
    litigation: true,
  });

  const [activeTab, setActiveTab] = useState("Summary");

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const menuData = [
    {
      id: "companyDetails",
      title: "Company Details",
      items: ["Summary", "Name History", "Contact Details"],
    },
    { id: "alerts", title: "Alerts", isStandalone: true },
    {
      id: "companyHighlights",
      title: "Company Highlights",
      isStandalone: true,
    },
    {
      id: "directorsKmp",
      title: "Directors & KMP Details",
      items: ["Current Directors", "Past Directors"],
    },
    {
      id: "controlOwnership",
      title: "Control & Ownership",
      items: [
        "Shareholding",
        "Securities Allotment",
        "Group Structure",
        "Overseas Direct Investment (ODI)",
      ],
    },
    {
      id: "financials",
      title: "Financials",
      items: [
        "Financials Highlights",
        "Balance Sheet",
        "Profit & Loss",
        "Cash Flow",
        "Ratios",
        "Auditors Details",
      ],
    },
    {
      id: "charges",
      title: "Charges",
      items: ["Open Charges", "Closed Charges"],
    },
    { id: "peerComparison", title: "Peer Comparison", isStandalone: true },
    {
      id: "relatedCorporates",
      title: "Related Corporates",
      isStandalone: true,
    },
    {
      id: "compliance",
      title: "Compliance Details",
      items: [
        "Auditors' Remarks",
        "CARO",
        "Goods & Service Tax (GST)",
        "EPFO",
        "CSR Credit Rating",
      ],
    },
    {
      id: "litigation",
      title: "Litigation",
      items: [
        "Pending Cases Filed against Company",
        "Pending Cases Led by Company",
        "Disposed Cases Led Against Company",
        "Disposed Cases Led by Company",
      ],
    },
    { id: "documents", title: "Documents", isStandalone: true },
  ];

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {menuData.map((section) => (
          <div key={section.id} className={styles.section}>
            {section.isStandalone ? (
              <div
                className={styles.standaloneHeader}
                onClick={() => setActiveSection(section.id)}
              >
                {section.title}
              </div>
            ) : (
              <>
                <button
                  className={`${styles.sectionHeader} ${
                    activeSection === section.id ? styles.headerActive : ""
                  }`}
                  onClick={() => {
                    toggleSection(section.id);
                    setActiveSection(section.id);
                  }}
                >
                  <span className={styles.title}>{section.title}</span>
                  <img
                    src="/icons/Up.svg"
                    alt="toggle"
                    className={`${styles.chevron} ${
                      expandedSections[section.id]
                        ? styles.chevronUp
                        : styles.chevronDown
                    }`}
                  />
                </button>

                {expandedSections[section.id] && section.items && (
                  <ul className={styles.itemList}>
                    {section.items.map((item) => {
                      const isActive = activeTab === item;

                      return (
                        <li
                          key={item}
                          className={`${styles.navItem} ${
                            isActive ? styles.navItemActive : ""
                          }`}
                          onClick={() => {
                            setActiveTab(item);
                            setActiveSection(section.id);
                          }}
                        >
                          <span
                            className={`${styles.timelineDot} ${
                              isActive ? styles.timelineDotActive : ""
                            }`}
                          />
                          <span className={styles.itemText}>{item}</span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default CompanyNewSidebar;
