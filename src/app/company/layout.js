"use client";

<<<<<<< HEAD
import styles from "@/components/company/layout/CompanyLayout.module.css";
import CompanyNewHeader from "@/components/company/newHeader/newHeader";
=======
import { useEffect, useState } from "react";
import styles from "@/components/company/layout/CompanyLayout.module.css";
import CompanyNewHeader from "@/components/company/newHeader/newHeader";
import CompanyStickyHeader from "@/components/company/newHeader/CompanyStickyHeader";
>>>>>>> origin/ayush-sharma
import CompanyNewSidebar from "@/components/company/newSidebar/newSidebar";
import { CompanySectionProvider } from "@/components/company/context/CompanySectionContext";

export default function CompanyLayout({ children }) {
<<<<<<< HEAD
  return (
    <CompanySectionProvider>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.headerWrapper}>
          <CompanyNewHeader />
        </div>
=======
  const [showStickyHeader, setShowStickyHeader] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowStickyHeader(window.scrollY > 220);
    };

    onScroll();

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <CompanySectionProvider>
      {/* 🔹 Compact sticky header */}
      <CompanyStickyHeader visible={showStickyHeader} />

      <div className={styles.container}>
        {/* 🔹 Full header */}
        <CompanyNewHeader />
>>>>>>> origin/ayush-sharma

        {/* Sidebar + Content */}
        <div className={styles.contentWrapper}>
          <div className={styles.contentRow}>
            <aside className={styles.sidebar}>
              <CompanyNewSidebar />
            </aside>

            <main className={styles.main}>{children}</main>
          </div>
        </div>
      </div>
    </CompanySectionProvider>
  );
}
