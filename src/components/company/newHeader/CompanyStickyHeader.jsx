"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./CompanyStickyHeader.module.css";

export default function CompanyStickyHeader({ visible, companyData }) {
  const actionsRef = useRef(null);

  const [actionsOpen, setActionsOpen] = useState(false);
  const [actionsDirection, setActionsDirection] = useState("down");

  const toggleActions = () => {
    if (!actionsRef.current) return;

    const rect = actionsRef.current.getBoundingClientRect();
    const dropdownHeight = 160;
    const spaceBelow = window.innerHeight - rect.bottom;

    setActionsDirection(spaceBelow > dropdownHeight ? "down" : "up");
    setActionsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!actionsRef.current?.contains(e.target)) {
        setActionsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const getTruncatedText = (text, limit = 30) => {
    if (!text) return { display: "N/A", full: "N/A" };

    return {
      display: text.length > limit ? text.slice(0, limit) + "..." : text,
      full: text
    };
  };

  const companyName = getTruncatedText(companyData?.company_information?.legal_name, 5);
  const companyAddress = getTruncatedText(companyData?.contact_details?.registered_address, 30);


  return (
    <header
      className={`${styles.stickyHeader} ${visible ? styles.visible : styles.hidden
        }`}
    >
      <div className={styles.inner}>
        {/* CENTER */}
        <div className={styles.contentSection}>
          <div className={styles.titleRow}>
            {/* LEFT */}
            <div className={styles.left}>
              <div className={styles.logo}>
                <img src="/icons/dabur-logo.svg" alt="Dabur" />
              </div>
            </div>
            <h1 className={styles.companyName} title={companyName?.full}>{companyName?.display}</h1>

            <div className={styles.statsContainer}>

              <div className={styles.statItem}>
                <span className={styles.cinBadge}>{companyData?.company_information?.industry || "N/A"}</span>
              </div>

              <div className={styles.divider}></div>
              <div className={styles.statItem}>
                <span className={styles.scoreBadgeGreen}>
                  <img
                    src="/icons/greencheck.svg"
                    alt="arrow down"
                    className={styles.arrowDownGreen}
                  />
                  NSE & BSE</span>
              </div>

              <div className={styles.divider}></div>
              <div className={styles.infoMetaItem}>
                <span>Founded {companyData?.company_information?.incorporation_date.split("/")[2] || "N/A"}</span>
              </div>

              <div className={styles.divider}></div>
              <div className={styles.infoMetaItem}>
                <span>{companyData?.company_information?.classification || "N/A"}</span>
              </div>

              <div className={styles.divider}></div>
              <div className={styles.infoMetaItem}>
                <span title={companyAddress?.full}>{companyAddress?.display || "N/A"}</span>
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className={styles.actionSection}>
          <div className={styles.buttonGroup}>
            <button className={styles.saveButton}>
              <img
                src="/icons/refresh.svg"
                alt=""
                className={styles.buttonIcon}
              />
              Refresh Company
            </button>

            <button className={styles.saveButton}>
              <img
                src="/icons/bookmark.svg"
                alt=""
                className={styles.buttonIcon}
              />
              Save
            </button>

            <div ref={actionsRef} className={styles.actionsWrapper}>
              <button className={styles.actionsButton} onClick={toggleActions}>
                Actions
                <img
                  src="/icons/chevron-down.svg"
                  alt=""
                  className={`${styles.chevronDown} ${actionsOpen ? styles.rotated : ""
                    }`}
                />
              </button>

              {actionsOpen && (
                <div
                  className={`${styles.actionsDropdown} ${actionsDirection === "up"
                    ? styles.dropdownUp
                    : styles.dropdownDown
                    }`}
                >
                  <button className={styles.dropdownItem}>View Company</button>
                  <button className={styles.dropdownItem}>
                    Download Report
                  </button>
                  <button className={styles.dropdownItem}>Share</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
