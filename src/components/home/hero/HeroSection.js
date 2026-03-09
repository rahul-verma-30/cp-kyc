"use client";

import { useRouter } from "next/navigation";
import styles from "./HeroSection.module.css";
import { useState } from "react";

export default function HeroSection() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");

  const handleSearch = () => {
    const query = companyName.trim();
    if (!query) return;

    router.push(`/company/${encodeURIComponent(query)}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
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
          <form className={styles.searchContainer} onSubmit={handleSubmit}>
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
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />

            <button type="submit" className={styles.searchBtn}>
              <span className={styles.arrowUp}>
                <img
                  src="/icons/arrow-up.svg"
                  alt="Search"
                  className={styles.arrowImg}
                />
              </span>
            </button>
          </form>
        </div>
      </div>

      <div className={styles.gridOverlay}></div>
    </section>
  );
}