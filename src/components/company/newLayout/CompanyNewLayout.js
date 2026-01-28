"use client";
import React, { useState } from "react";
import styles from "./CompanyNewLayout.module.css";
import CompanyNewHeader from "../newHeader/newHeader";
import CompanyNewSidebar from "../newSidebar/newSidebar";

const CompanyNewLayout = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className={styles.layoutContainer}>

      <div className={styles.mainWrapper}>

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
