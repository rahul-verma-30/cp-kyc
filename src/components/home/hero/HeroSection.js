"use client";

import { useRouter } from "next/navigation";
import styles from "./HeroSection.module.css";
import { useState } from "react";

export default function HeroSection() {
  const router = useRouter();
  const [companyName, setCompanyName]= useState(null)

  const handleSearch = () => {
    router.push(`/company/${companyName}`);
  };

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.textWrapper}>
          <h1 className={styles.title}>
            Know who you’re dealing with — before you decide
          </h1>

          <p className={styles.subtitle}>
            Comprehensive company KYC with ownership, control, financial health,
            and compliance insights
          </p>
        </div>

<div className={styles.searchOuter}>
  <div className={styles.searchContainer}>
    <div className={styles.searchIcon}>
      <div className={styles.squareIcon}>
        <img
          src="/icons/company.svg"
          alt="Company Icon"
          className={styles.iconImg}
        />
      </div>
    </div>

    <input
      type="text"
      placeholder="Search by company name, CIN, LLPIN, or director name"
      className={styles.input}
      onChange={(e)=>setCompanyName(e.target.value)}
    />

    <button
      className={styles.searchBtn}
      onClick={handleSearch}
    >
      <span className={styles.arrowUp}>
        <img
          src="/icons/arrow-up.svg"
          alt="Arrow up"
          className={styles.arrowImg}
        />
      </span>
    </button>
  </div>
</div>

      </div>

      <div className={styles.gridOverlay}></div>
    </section>
  );
}
