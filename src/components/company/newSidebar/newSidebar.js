"use client";

import React, { useState } from "react";
import styles from "./newSidebar.module.css";
import { useRef, useLayoutEffect } from "react";

import { useCompanySection } from "@/components/company/context/CompanySectionContext";

const CompanyNewSidebar = () => {
<<<<<<< HEAD
  const {
    activeSection,
    setActiveSection,
    setActiveSubSection, // ✅ ADD THIS
  } = useCompanySection();

=======
  const { activeSection, setActiveSection } = useCompanySection();
>>>>>>> origin/main
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

  const sectionRefs = useRef({});

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

  const activateSection = (section) => {
    setActiveSection(section.id);
    if (section.items && section.items.length > 0) {
      setActiveTab(section.items[0]);
    } else {
      setActiveTab(null);
    }
  };
  const [indicatorTop, setIndicatorTop] = useState(0);

  useLayoutEffect(() => {
    const el = sectionRefs.current[activeSection];
    if (el) {
      setIndicatorTop(el.offsetTop);
    }
  }, [activeSection, expandedSections]);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.activeIndicator} style={{ top: indicatorTop }} />

      <nav className={styles.nav}>
        {menuData.map((section) => (
          <div key={section.id} className={styles.section}>
            {section.isStandalone ? (
              <div
                ref={(el) => (sectionRefs.current[section.id] = el)}
                className={`${styles.standaloneHeader} ${
                  activeSection === section.id ? styles.headerActive : ""
                }`}
<<<<<<< HEAD
                onClick={() => {
                  // Collapse ONLY if clicking the currently active section
                  if (activeSection === section.id) {
                    toggleSection(section.id);
                  } else {
                    // Ensure it stays expanded
                    setExpandedSections((prev) => ({
                      ...prev,
                      [section.id]: true,
                    }));
                  }

                  activateSection(section);
                }}
=======
                onClick={() => activateSection(section)}
>>>>>>> origin/main
              >
                {section.title}
              </div>
            ) : (
              <>
                <button
                  ref={(el) => (sectionRefs.current[section.id] = el)}
                  className={`${styles.sectionHeader} ${
                    activeSection === section.id ? styles.headerActive : ""
                  }`}
                  onClick={() => {
<<<<<<< HEAD
                    // Collapse ONLY if clicking the currently active section
                    if (activeSection === section.id) {
                      toggleSection(section.id);
                    } else {
                      // Ensure it stays expanded
                      setExpandedSections((prev) => ({
                        ...prev,
                        [section.id]: true,
                      }));
                    }

=======
                    toggleSection(section.id);
>>>>>>> origin/main
                    activateSection(section);
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
                            setActiveSubSection(item); // 🔥 ADD THIS LINE
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
