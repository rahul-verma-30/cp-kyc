"use client";

import React, { useState } from "react";
import styles from "./CompanySidebar.module.css";

const CompanySidebar = () => {
  const [expandedSections, setExpandedSections] = useState({
    companyDetails: true,
    controlOwnership: true,
    people: false,
    news: false,
    technology: false,
  });

  const [activeSection, setActiveSection] = useState("companyDetails");
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
      items: ["Summary", "Name History", "Contact Details", "Company News"],
    },
    {
      id: "companyHighlights",
      title: "Company Highlights",
      isStandalone: true,
    },
    {
      id: "controlOwnership",
      title: "Control & Ownership",
      items: [
        "Shareholding",
        "Securities Allotment",
        "Group Structure",
        "Overseas Direct Investment (ODI)",
        "Items",
      ],
    },
    { id: "people", title: "People", items: [] },
    { id: "news", title: "News", items: [] },
    { id: "technology", title: "Technology", items: [] },
  ];

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {menuData.map((section) => (
          <div key={section.id} className={styles.section}>
            {section.isStandalone ? (
              <div className={styles.standaloneHeader}>{section.title}</div>
            ) : (
              <>
                <button
                  className={`${styles.sectionHeader} ${
                    activeSection === section.id ? styles.headerActive : ""
                  }`}
                  onClick={() => toggleSection(section.id)}
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

                {expandedSections[section.id] && section.items.length > 0 && (
                  <ul className={styles.itemList}>
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className={`${styles.navItem} ${
                          activeTab === item ? styles.navItemActive : ""
                        }`}
                        onClick={() => {
                          setActiveTab(item);
                          setActiveSection(section.id);
                        }}
                      >
                        {item}
                      </li>
                    ))}
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

export default CompanySidebar;
