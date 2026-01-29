import styles from "./Documents.module.css";
import { useState } from "react";

const Documents = () => {
  const [openCategory, setOpenCategory] = useState(true);
  const [openYear, setOpenYear] = useState(true);

  const categories = [
    "Annual Returns and Balance Sheet Forms",
    "Annual Returns and Balance Sheet Forms (Attachments)",
    "Certificates",
    "Change in Directors",
    "Charge Documents",
    "Incorporation Documents",
    "Other Attachments",
    "Other eForm Documents",
  ];

  const years = [
    2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014,
  ];

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Documents</h2>
          <div className={styles.sourceRow}>
            <span className={styles.sourceLabel}>Source:</span>
            <span className={styles.sourceValue}>MCA</span>
            <span className={styles.divider}></span>
            <span className={styles.updatedText}>
              <span> Last Updated:</span>
              30-Dec-2024, 11:45 AM IST
            </span>
          </div>
        </div>

        <div className={styles.contentContainer}>
          {/* FILTER SIDEBAR */}
          <aside className={styles.sideBar}>
            <div className={styles.filterHeader}>
              <span className={styles.filterTitle}>Filters</span>
              <button className={styles.clearBtn}>Clear</button>
            </div>
            <div className={styles.seperator} />
            {/* CATEGORY */}

            <div className={styles.filterBlock}>
              <div
                className={styles.filterBlockHeader}
                onClick={() => setOpenCategory(!openCategory)}
              >
                <span>Category</span>
                <span
                  className={`${styles.chevron} ${openCategory ? styles.open : ""}`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 12.5L10 7.5L5 12.5"
                      stroke="#041E42"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </div>

              {openCategory && (
                <div className={styles.filterOptions}>
                  {categories.map((item) => (
                    <label key={item} className={styles.checkboxRow}>
                      <input type="checkbox" />
                      <span className={styles.checkboxLabel}>{item}</span>
                      <span className={styles.countBadge}>16</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            <div className={styles.seperator} />
            {/* YEAR */}
            <div className={styles.filterBlock}>
              <div
                className={styles.filterBlockHeader}
                onClick={() => setOpenYear(!openYear)}
              >
                <span>Year</span>
                <span className={styles.chevron}>{openYear ? "˄" : "˅"}</span>
              </div>

              {openYear && (
                <div className={styles.filterOptions}>
                  {years.map((year) => (
                    <label key={year} className={styles.checkboxRow}>
                      <input type="checkbox" />
                      <span className={styles.checkboxLabel}>{year}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </aside>

          {/* DOCUMENT LIST */}
          <div className={styles.documentsSectionContainer}>Documents</div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
