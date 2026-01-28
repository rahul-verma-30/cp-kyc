"use client";

import styles from "@/components/company/layout/CompanyLayout.module.css";
import CompanyNewHeader from "@/components/company/newHeader/newHeader";
import CompanyNewSidebar from "@/components/company/newSidebar/newSidebar";
import { CompanySectionProvider } from "@/components/company/context/CompanySectionContext";

export default function CompanyLayout({ children }) {
  return (
    <CompanySectionProvider>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.headerWrapper}>
          <CompanyNewHeader />
        </div>

        {/* Sidebar + Content */}
        <div className={styles.contentRow}>
          <aside className={styles.sidebar}>
            <CompanyNewSidebar />
          </aside>

          <main className={styles.main}>
            {children}
          </main>
        </div>
      </div>
    </CompanySectionProvider>
  );
}
