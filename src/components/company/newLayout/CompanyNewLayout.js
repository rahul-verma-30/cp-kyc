"use client";
import React, { useState } from "react";
import styles from "./CompanyNewLayout.module.css";
import CompanyNewHeader from "../newHeader/newHeader";
import CompanyNewSidebar from "../newSidebar/newSidebar";

const CompanyNewLayout = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className={styles.layoutContainer}>
      {/* Top Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <img
            src="/icons/logo2.svg"
            alt="Corporate Professionals"
            className={styles.logo}
          />
          <div className={styles.divider}></div>

          <div className={styles.searchContainer}>
            <img src="/icons/search.svg" alt="" className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by company name, CIN, LLPIN, or director name"
              className={styles.searchInput}
            />
            <div className={styles.shortcut}>⌘ K</div>
          </div>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.avatarWrapper}>
            <div className={styles.avatarText}>DS</div>
          </div>
        </div>
      </header>

      <div className={styles.mainWrapper}>
        {/* Left Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarIcons}>
            <div
              className={`${styles.iconTab} ${
                activeTab === "home" ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab("home")}
            >
              <img src="/icons/home-icon.svg" alt="Home" />
            </div>

            <div
              className={`${styles.iconTab} ${
                activeTab === "company" ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab("company")}
            >
              <img src="/icons/company-icon.svg" alt="Companies" />
            </div>

            <div
              className={`${styles.iconTab} ${
                activeTab === "profile" ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab("profile")}
            >
              <img src="/icons/profile-icon.svg" alt="Profile" />
            </div>
          </div>
        </aside>

        <main className={styles.contentArea}>
        {/* Company Page Header */}
        <CompanyNewHeader />

        {/* Company Page Body */}
        <div className={styles.companyBody}>
            {/* LEFT: Company Sidebar */}
            <CompanyNewSidebar />

            {/* RIGHT: Company Main Content */}
            <div className={styles.companyContent}>
            {/* future tabs / tables / sections */}
            </div>
        </div>
        </main>

      </div>
    </div>
  );
};

export default CompanyNewLayout;
