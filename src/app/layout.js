"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import styles from "../components/company/newLayout/CompanyNewLayout.module.css";
import { CompanySectionProvider } from "@/components/company/context/CompanySectionContext";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [activeTab, setActiveTab] = useState("home");

  // Sync activeTab with URL
  useEffect(() => {
    if (pathname === "/") {
      setActiveTab("home");
    } else if (pathname.startsWith("/CompanyDatabase")) {
      setActiveTab("company");
    } else if (pathname.startsWith("/PeopleDatabase")) {
      setActiveTab("profile");
    }
  }, [pathname]);

  const handleNav = (tab, path) => {
    setActiveTab(tab);
    router.push(path);
  };

  return (
    <Suspense fallback={null}>
      <CompanySectionProvider>
        <html lang="en">
          <body className={inter.className}>
            <div className={styles.layoutContainer}>
              {/* ===== TOP HEADER ===== */}
              <header className={styles.header}>
                <div className={styles.headerLeft}>
                  <img
                    src="/icons/logo2.svg"
                    alt="Corporate Professionals"
                    className={styles.logo}
                  />

                  <div className={styles.divider} />

                  <div className={styles.searchContainer}>
                    <img
                      src="/icons/search.svg"
                      alt=""
                      className={styles.searchIcon}
                    />
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

              {/* ===== MAIN WRAPPER (SIDEBAR + CONTENT) ===== */}
              <div className={styles.mainWrapper}>
                {/* ===== LEFT SIDEBAR ===== */}
                <aside className={styles.sidebar}>
                  <div className={styles.sidebarIcons}>
                    {/* 🏠 Home */}
                    <button
                      type="button"
                      className={`${styles.iconTab} ${
                        activeTab === "home" ? styles.activeTab : ""
                      }`}
                      onClick={() => handleNav("home", "/")}
                    >
                      <img src="/icons/home-icon.svg" alt="Home" />
                    </button>

                    {/* 🏢 Company Database */}
                    <button
                      type="button"
                      className={`${styles.iconTab} ${
                        activeTab === "company" ? styles.activeTab : ""
                      }`}
                      onClick={() => handleNav("company", "/CompanyDatabase")}
                    >
                      <img src="/icons/company-icon.svg" alt="Companies" />
                    </button>

                    {/* 👤 People Database */}
                    <button
                      type="button"
                      className={`${styles.iconTab} ${
                        activeTab === "profile" ? styles.activeTab : ""
                      }`}
                      onClick={() => handleNav("profile", "/PeopleDatabase")}
                    >
                      <img src="/icons/profile-icon.svg" alt="Profile" />
                    </button>
                  </div>
                </aside>

                {/* ===== PAGE CONTENT ===== */}
                <main className={styles.contentArea}>{children}</main>
              </div>
            </div>
          </body>
        </html>
      </CompanySectionProvider>
    </Suspense>
  );
}
