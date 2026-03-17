"use client";
import React from "react";
import styles from "./PeopleDatabase.module.css";
import { useState, useRef, useEffect } from "react";
import RowsPerPage from "@/components/common/RowsPerPage";

const peopleData = [
  {
    name: "Sachin Bansal",
    location: "New Delhi, Delhi, India",
    current: "Navi , Navi Finserv +4 more",
    previous: "Gpcubs Motorsport , Navi +13 more",
    sector: "-",
  },
  {
    name: "Priya Gupta",
    location: "Hyderabad, Telangana, India",
    current: "CloudNet, DataWise +6 more",
    previous: "FutureCloud, Hyderabad +12 more",
    sector: "-",
  },
  {
    name: "Vikram Desai",
    location: "Ahmedabad, Gujarat, India",
    current: "EduTech, LearnSmart +5 more",
    previous: "SkillUp, Ahmedabad +7 more",
    sector: "-",
  },
  {
    name: "Sachin Bansal",
    location: "New Delhi, Delhi, India",
    current: "Navi , Navi Finserv +4 more",
    previous: "Gpcubs Motorsport , Navi +13 more",
    sector: "-",
  },
  {
    name: "Anjali Sharma",
    location: "Bangalore, Karnataka, India",
    current: "TechWave, Fintech Solutions +3 more",
    previous: "EagleTech Systems, Bangalore +10 more",
    sector: "-",
  },
  {
    name: "Karan Singh",
    location: "Chennai, Tamil Nadu, India",
    current: "GreenTech, Urban Solutions +4 more",
    previous: "SmartCity Innovations, Chennai +9 more",
    sector: "-",
  },
  {
    name: "Riya Verma",
    location: "Kolkata, West Bengal, India",
    current: "Artistry, CultureConnect +2 more",
    previous: "Kolkata Arts, Kolkata +6 more",
    sector: "-",
  },
  {
    name: "Neeta Joshi",
    location: "Pune, Maharashtra, India",
    current: "HealthSync, WellnessCo +3 more",
    previous: "Pune Healthcare, Pune +11 more",
    sector: "-",
  },
  {
    name: "Arjun Rao",
    location: "Jaipur, Rajasthan, India",
    current: "TravelSphere, Wanderlust +4 more",
    previous: "ExploreIndia, Jaipur +10 more",
    sector: "-",
  },
  {
    name: "Ravi Mehta",
    location: "Mumbai, Maharashtra, India",
    current: "InnoTech, InvestoHub +5 more",
    previous: "Visionary Ventures, Mumbai +8 more",
    sector: "-",
  },
];

export default function PeopleDatabase({ onRowClick }) {
  const headerCheckboxRef = useRef(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const allChecked = selectedRows.length === peopleData.length;
  const someChecked = selectedRows.length > 0 && !allChecked;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate = someChecked;
    }
  }, [someChecked]);
  const handleSelectAll = () => {
    if (allChecked) {
      setSelectedRows([]);
    } else {
      setSelectedRows(peopleData.map((_, i) => i));
    }
  };
  const handleRowSelect = (e, index) => {
    e.stopPropagation();
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredPeople = peopleData.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const visiblePeople = filteredPeople.slice(0, rowsPerPage);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>People Database</h1>

        <div className={styles.searchSection}>
          <div className={styles.searchBar}>
            <img src="/icons/search.svg" alt="" className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search Din/Pan E.g. Din no, Pan number"
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.tableCard}>
          <div className={styles.tableResponsive}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.checkboxCol}>
                    <div className={styles.checkboxOuter}>
                      <label className={styles.checkboxWrapper}>
                        <input
                          ref={headerCheckboxRef}
                          type="checkbox"
                          checked={allChecked}
                          onChange={handleSelectAll}
                        />

                        <span className={styles.customCheckbox}></span>
                      </label>
                    </div>
                  </th>

                  <th>Name</th>
                  <th>Location</th>
                  <th>Current Companies</th>
                  <th>Previous Companies</th>
                  <th>Sector</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: rowsPerPage }).map((_, index) => (
                    <tr key={`skeleton-${index}`} className={styles.skeletonRow}>
                      <td className={styles.checkboxCol}>
                        <div className={`${styles.skeleton} ${styles.skeletonCheckbox}`}></div>
                      </td>
                      <td className={styles.nameCell}>
                        <div className={`${styles.skeleton} ${styles.skeletonAvatar}`}></div>
                        <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '120px' }}></div>
                      </td>
                      <td><div className={`${styles.skeleton} ${styles.skeletonText}`}></div></td>
                      <td><div className={`${styles.skeleton} ${styles.skeletonText}`}></div></td>
                      <td><div className={`${styles.skeleton} ${styles.skeletonText}`}></div></td>
                      <td><div className={`${styles.skeleton} ${styles.skeletonText}`}></div></td>
                    </tr>
                  ))
                ) : (
                  visiblePeople.map((person, index) => (
                    <tr 
                      key={index} 
                      onClick={() => onRowClick && onRowClick(person)}
                      className={styles.clickableRow}
                    >
                      <td className={styles.checkboxCol}>
                        <div className={styles.checkboxOuter}>
                          <label className={styles.checkboxWrapper}>
                            <input
                              type="checkbox"
                              checked={selectedRows.includes(index)}
                              onChange={(e) => handleRowSelect(e, index)}
                            />

                            <span className={styles.customCheckbox}></span>
                          </label>
                        </div>
                      </td>

                      <td className={styles.nameCell}>
                        <img
                          src="/images/owner.svg"
                          alt=""
                          className={styles.avatar}
                        />
                        <span>{person.name}</span>
                      </td>
                      <td>{person.location}</td>
                      <td>{person.current}</td>
                      <td>{person.previous}</td>
                      <td>{person.sector}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <footer className={styles.footer}>
          <div className={styles.footerLeft}>
            <span className={styles.mutedText}>
              Loaded:{" "}
              <span className={styles.boldText}>
                {visiblePeople.length} People
              </span>
            </span>
            <span className={styles.separator}>|</span>
            <span className={styles.mutedText}>
              Found: <span className={styles.boldText}>3524709 Companies</span>
            </span>
          </div>
          <div className={styles.footerRight}>
            <div className={styles.paginationControls}>
              <div className={styles.rowsPerPage}>
                <div className={styles.rowsPerPage}>
                  <span className={styles.rowsPerPageText}>Rows per page</span>
                  <RowsPerPage value={rowsPerPage} onChange={setRowsPerPage} />
                </div>
              </div>

              <span className={styles.pageLabel}>Page 1 of 10</span>

              <div className={styles.navButtons}>
                <button className={styles.navBtnDisabled} disabled>
                  <img src="/icons/chevrons-left.svg" alt="First page" />
                </button>
                <button className={styles.navBtnDisabled} disabled>
                  <img src="/icons/chevron-left.svg" alt="Prev page" />
                </button>
                <button className={styles.navBtn}>
                  <img src="/icons/chevron-right-black.svg" alt="Next page" />
                </button>
                <button className={styles.navBtn}>
                  <img src="/icons/chevrons-right.svg" alt="Last page" />
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
