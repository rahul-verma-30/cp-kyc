"use client";
import styles from "./CompanyDatabase.module.css";
import { useRef } from "react";
import { useEffect } from "react";

const data = [
  {
    name: "One 97 Communications Limited",
    puc: "63.93 Cr",
    soc: "1,148.84 Cr",
    doi: "22 Dec, 2000",
    location: "New Delhi, Delhi, India",
    industry: "Financial Services",
    status: "Active",
  },
  {
    name: "Tech Innovations Corp",
    puc: "45.67 Cr",
    soc: "870.45 Cr",
    doi: "15 Mar, 2015",
    location: "Bengaluru, Karnataka, India",
    industry: "Technology",
    status: "Active",
  },
  {
    name: "Green Energy Solutions",
    puc: "30.12 Cr",
    soc: "500.30 Cr",
    doi: "10 Jul, 2018",
    location: "Mumbai, Maharashtra, India",
    industry: "Renewable Energy",
    status: "Active",
  },
  {
    name: "Global Health Alliance",
    puc: "75.34 Cr",
    soc: "1,200.00 Cr",
    doi: "22 Nov, 2010",
    location: "Chennai, Tamil Nadu, India",
    industry: "Healthcare",
    status: "Active",
  },
  {
    name: "NextGen Robotics",
    puc: "56.78 Cr",
    soc: "900.00 Cr",
    doi: "5 Jun, 2020",
    location: "Hyderabad, Telangana, India",
    industry: "Manufacturing",
    status: "Active",
  },
  {
    name: "Smart Agriculture Tech",
    puc: "20.45 Cr",
    soc: "300.25 Cr",
    doi: "28 Jan, 2019",
    location: "Pune, Maharashtra, India",
    industry: "Agriculture",
    status: "Active",
  },
  {
    name: "E-commerce Solutions Inc.",
    puc: "88.10 Cr",
    soc: "1,500.00 Cr",
    doi: "1 Apr, 2021",
    location: "Noida, Uttar Pradesh, India",
    industry: "E-commerce",
    status: "Active",
  },
  {
    name: "Digital Marketing Group",
    puc: "40.00 Cr",
    soc: "600.50 Cr",
    doi: "19 Aug, 2017",
    location: "Ahmedabad, Gujarat, India",
    industry: "Marketing",
    status: "Active",
  },
  {
    name: "Cyber Security Solutions",
    puc: "25.90 Cr",
    soc: "400.75 Cr",
    doi: "12 Sep, 2016",
    location: "Kochi, Kerala, India",
    industry: "Cybersecurity",
    status: "Active",
  },
  {
    name: "Artificial Intelligence Corp",
    puc: "62.00 Cr",
    soc: "1,100.00 Cr",
    doi: "30 Oct, 2022",
    location: "Gurgaon, Haryana, India",
    industry: "AI & ML",
    status: "Active",
  },
];

export default function CompanyDatabase() {
  const checkboxRef = useRef(null);

  useEffect(() => {
    checkboxRef.current.indeterminate = true;
  }, []);
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Company Database</h1>
      </header>

      <div className={styles.toolbar}>
        <div className={styles.leftTools}>
          <div className={styles.searchWrapper}>
            <img src="/icons/search.svg" alt="" className={styles.icon} />
            <input
              type="text"
              placeholder="Search for company name"
              className={styles.searchInput}
            />
          </div>
          <div className={styles.filterDropdown}>
            <span>Status</span>
            <img
              src="/icons/chevron-down-dark.svg"
              alt=""
              className={styles.chevron}
            />
          </div>
        </div>
        <div className={styles.rightTools}>
          <div className={styles.datePicker}>
            <img src="/icons/Calender.svg" alt="" className={styles.icon} />
            <span>Date of incorporation</span>
          </div>
          <button className={styles.bulkActionBtn}>
            Bulk Action
            <img
              src="/icons/chevron-down.svg"
              alt=""
              className={styles.chevron}
            />
          </button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.checkboxCell}>
                <div className={styles.checkboxOuter}>
                  <label className={styles.checkboxWrapper}>
                    <input ref={checkboxRef} type="checkbox" />
                    <span className={styles.customCheckbox}></span>
                  </label>
                </div>
              </th>

              <th>Company Name</th>
              <th>PUC/OOC (Cr.)</th>
              <th>SOC (Cr.)</th>
              <th>DOI</th>
              <th>Location</th>
              <th>Industry</th>
              <th>Company Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((company, index) => (
              <tr key={index}>
                <td className={styles.checkboxCell}>
                  <div className={styles.checkboxOuter}>
                    <label className={styles.checkboxWrapper}>
                      <input ref={checkboxRef} type="checkbox" />
                      <span className={styles.customCheckbox}></span>
                    </label>
                  </div>
                </td>
                <td className={styles.companyCell}>
                  <img
                    src="/icons/Image.svg"
                    alt=""
                    className={styles.companyIcon}
                  />
                  {company.name}
                </td>
                <td>{company.puc}</td>
                <td>{company.soc}</td>
                <td>{company.doi}</td>
                <td>{company.location}</td>
                <td>{company.industry}</td>
                <td>
                  <span className={styles.statusBadge}>{company.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerLeft}>
          <span className={styles.mutedText}>
            Loaded: <span className={styles.boldText}>10 Companies</span>
          </span>
          <span className={styles.separator}>|</span>
          <span className={styles.mutedText}>
            Found: <span className={styles.boldText}>3524709 Companies</span>
          </span>
        </div>
        <div className={styles.footerRight}>
          <div className={styles.paginationControls}>
            <span className={styles.rowsLabel}>Rows per page</span>
            <div className={styles.selectBox}>
              10
              <img
                src="/icons/chevrons-up-down.svg"
                alt="down"
                className={styles.icon}
              />
            </div>
            <span className={styles.pageLabel}>Page 1 of 10</span>
            <div className={styles.navButtons}>
              <button className={styles.navBtnDisabled}>«</button>
              <button className={styles.navBtnDisabled}>‹</button>
              <button className={styles.navBtn}>›</button>
              <button className={styles.navBtn}>»</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
