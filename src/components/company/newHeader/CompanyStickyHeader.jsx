"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./CompanyStickyHeader.module.css";

export default function CompanyStickyHeader({ visible }) {
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

  return (
    <header
      className={`${styles.stickyHeader} ${
        visible ? styles.visible : styles.hidden
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
            <h1 className={styles.companyName}>Dabur India</h1>

            <div className={styles.statsContainer}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Growth Score</span>
                <span className={styles.scoreBadgeRed}>69</span>
                <img
                  src="/icons/arrow-down.svg"
                  alt=""
                  className={styles.arrowDownRed}
                />
              </div>

              <div className={styles.statItem}>
                <span className={styles.statLabel}>CB Rank</span>
                <span className={styles.scoreBadgeRed}>268240</span>
                <img
                  src="/icons/arrow-down.svg"
                  alt=""
                  className={styles.arrowDownRed}
                />
              </div>

              <div className={styles.statItem}>
                <span className={styles.statLabel}>Heat Score</span>
                <span className={styles.scoreBadgeRed}>59</span>
                <img
                  src="/icons/arrow-down.svg"
                  alt=""
                  className={styles.arrowDownRed}
                />
              </div>

              <div className={styles.statItem}>
                <span className={styles.statLabel}>CIN</span>
                <span className={styles.cinBadge}>L24230DL1975PLC007908</span>
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
                  className={`${styles.chevronDown} ${
                    actionsOpen ? styles.rotated : ""
                  }`}
                />
              </button>

              {actionsOpen && (
                <div
                  className={`${styles.actionsDropdown} ${
                    actionsDirection === "up"
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
