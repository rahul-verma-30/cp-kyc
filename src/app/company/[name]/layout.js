"use client";

import { useEffect, useState } from "react";
import styles from "@/components/company/layout/CompanyLayout.module.css";
import CompanyNewHeader from "@/components/company/newHeader/newHeader";
import CompanyStickyHeader from "@/components/company/newHeader/CompanyStickyHeader";
import CompanyNewSidebar from "@/components/company/newSidebar/newSidebar";
import { CompanySectionProvider } from "@/components/company/context/CompanySectionContext";
import { useParams } from "next/navigation";

export default function CompanyLayout({ children }) {
  const [showStickyHeader, setShowStickyHeader] = useState(false);

  const params = useParams();
  const rawCompanyName = params.name; // from /company/dabur because route is [name]
  const [companyName, setCompanyName] = useState("");
  // Company Details
  const [companyData, setCompanyData] = useState(null);
  const [companyLoading, setCompanyLoading] = useState(false);
  const [companyError, setCompanyError] = useState(null);

  useEffect(() => {
    const onScroll = () => {
      setShowStickyHeader(window.scrollY > 220);
    };

    onScroll();

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);



  useEffect(() => {
    if (!rawCompanyName) return;
    const companyNamee = decodeURIComponent(rawCompanyName);
    setCompanyName(companyNamee);
  }, [rawCompanyName]);


  /* ================= GET COMPANY DETAILS ================= */

  useEffect(() => {
    if (!companyName) return;

    const getCompanyDetails = async () => {
      try {
        setCompanyLoading(true);
        setCompanyError(null);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/company-details/${encodeURIComponent(companyName)}`
        );

        let data;
        try {
          data = await response.json();
        } catch {
          throw new Error("Invalid server response");
        }

        if (!response.ok) {
          throw new Error(
            data?.detail ||
            data?.message ||
            `Company Details Error ${response.status}: ${response.statusText}`
          );
        }

        setCompanyData(data);

      } catch (error) {
        console.log("Error fetching company details rahul :", error);
        setCompanyError(error.message);
      } finally {
        setCompanyLoading(false);
      }
    };

    getCompanyDetails();
  }, [companyName]);

  return (
    <CompanySectionProvider>
      {/* 🔹 Compact sticky header */}
      <CompanyStickyHeader visible={showStickyHeader} companyData={companyData} />

      <div className={styles.container}>
        {/* 🔹 Full header */}
        <CompanyNewHeader companyData={companyData} />

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
