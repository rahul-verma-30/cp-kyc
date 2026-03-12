"use client";

import styles from "./AlertsTabs.module.css";

export default function AlertsTabs({ activeTab, setActiveTab, alertsData  }) {
  const tabs = [
    { key: "overview", label: "Alert Overview" },
    { key: "observation", label: "Observation" },
    { key: "defaults", label: "Defaults & Violations" },
    { key: "formerDirectors", label: "Defaults & Violations (Former Directors)" },
    { key: "news", label: "News" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Alerts</h1>
        <div className={styles.headerInfo}>
          <span className={styles.infoGroup}>
            <span className={styles.infoLabel}>Source:</span>
            <span className={styles.infoValue}>{alertsData?.source || "-"}</span>
          </span>
          <span className={styles.infoDivider}></span>
          <span className={styles.infoGroup}>
            <span className={styles.infoLabel}>Last Updated:</span>
            <span className={styles.infoValue}>{alertsData?.last_updated || "-"}</span>
          </span>
        </div>
      </div>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <div
            key={tab.key}
            className={activeTab === tab.key ? styles.active : styles.tab}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </div>
        ))}
      </div>
    </div>
  );
}
