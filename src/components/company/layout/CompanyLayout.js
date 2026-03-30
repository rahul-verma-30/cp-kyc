"use client";

import styles from "./CompanyLayout.module.css";
import CompanyNewHeader from "../newHeader/newHeader";
import CompanyNewSidebar from "../newSidebar/newSidebar";
import { CompanySectionProvider } from "../context/CompanySectionContext";
import VersionHistory from "../versionHistory/VersionHistory";

export default function CompanyLayout({ children }) {
  return (
    <>
      <div className={styles.container} >
        {/* Header */}
        <div className={styles.headerWrapper}>
          <CompanyNewHeader />
        </div>

        {/* Sidebar + Content */}
        <div className={styles.contentWrapper}  >
          <div className={styles.contentRow}>
            <aside className={styles.sidebar}>
              <CompanyNewSidebar />
            </aside>

            <main className={styles.main}>{children}</main>
          </div>
        </div>
      </div>
    </>
  );
}
