"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import styles from "../components/company/newLayout/CompanyNewLayout.module.css";

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [activeTab, setActiveTab] = useState("home");

  /* 🔁 Sync activeTab with URL */
  useEffect(() => {
    if (pathname === "/") {
      setActiveTab("home");
    } else if (pathname.startsWith("/CompanyDatabase")) {
      setActiveTab("company");
    } else if (pathname.startsWith("/PeopleDatabase")) {
      setActiveTab("profile");
    }
  }, [pathname]);

  return (
    <html>
      <body>
        <div className={styles.layoutContainer}>

          {/* ===== TOP HEADER ===== */}
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

            {/* ===== LEFT SIDEBAR ===== */}
            <aside className={styles.sidebar}>
              <div className={styles.sidebarIcons}>

                {/* 🏠 Home */}
                <div
                  className={`${styles.iconTab} ${
                    activeTab === "home" ? styles.activeTab : ""
                  }`}
                  onClick={() => {
                    setActiveTab("home");
                    router.push("/");
                  }}
                >
                  <img src="/icons/home-icon.svg" alt="Home" />
                </div>

                {/* 🏢 Company Database */}
                <div
                  className={`${styles.iconTab} ${
                    activeTab === "company" ? styles.activeTab : ""
                  }`}
                  onClick={() => {
                    setActiveTab("company");
                    router.push("/CompanyDatabase");
                  }}
                >
                  <img src="/icons/company-icon.svg" alt="Companies" />
                </div>

                {/* 👤 People Database */}
                <div
                  className={`${styles.iconTab} ${
                    activeTab === "profile" ? styles.activeTab : ""
                  }`}
                  onClick={() => {
                    setActiveTab("profile");
                    router.push("/PeopleDatabase");
                  }}
                >
                  <img src="/icons/profile-icon.svg" alt="Profile" />
                </div>

              </div>
            </aside>

            {/* ===== PAGE CONTENT ===== */}
            <main className={styles.contentArea}>
              {children}
            </main>

          </div>
        </div>
      </body>
    </html>
  );
}
