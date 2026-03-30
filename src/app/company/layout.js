"use client";

import { useEffect, useState } from "react";
import styles from "@/components/company/layout/CompanyLayout.module.css";
import CompanyNewHeader from "@/components/company/newHeader/newHeader";
import CompanyStickyHeader from "@/components/company/newHeader/CompanyStickyHeader";
import CompanyNewSidebar from "@/components/company/newSidebar/newSidebar";

export default function CompanyLayout({ children }) {
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
    <>
      {/* 🔹 Compact sticky header */}
      <CompanyStickyHeader visible={showStickyHeader} />

      <div className={styles.container}>
        {/* 🔹 Full header */}
        {/* <CompanyNewHeader /> */}

        {/* Sidebar + Content */}
        {/* <div className={styles.contentWrapper}> */}
          <div className={styles.contentRow}>
            {/* <aside className={styles.sidebar}>
              <CompanyNewSidebar />
            </aside> */}

            <main className={styles.main}>{children}</main>
          </div>
        {/* </div> */}
      </div>
    </>
  );
}
