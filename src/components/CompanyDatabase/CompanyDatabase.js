"use client";
import styles from "./CompanyDatabase.module.css";
import { useState, useRef, useEffect } from "react";
import RowsPerPage from "@/components/common/RowsPerPage";

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
  const bulkRef = useRef(null);

  const [bulkOpen, setBulkOpen] = useState(false);
  const [bulkDirection, setBulkDirection] = useState("down");
  const toggleBulk = () => {
    if (!bulkRef.current) return;

    const rect = bulkRef.current.getBoundingClientRect();
    const dropdownHeight = 140; // adjust if needed
    const spaceBelow = window.innerHeight - rect.bottom;

    setBulkDirection(spaceBelow > dropdownHeight ? "down" : "up");
    setBulkOpen((prev) => !prev);
  };
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!bulkRef.current?.contains(e.target)) {
        setBulkOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const headerCheckboxRef = useRef(null);

  const [selectedRows, setSelectedRows] = useState([]);
  const [open, setOpen] = useState(false);
  const dateInputRef = useRef(null);

  const [selectedDate, setSelectedDate] = useState("");

  const allChecked = selectedRows.length === data.length;
  const someChecked = selectedRows.length > 0 && !allChecked;
  useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate = someChecked;
    }
  }, [someChecked]);
  const handleSelectAll = () => {
    if (allChecked) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((_, i) => i));
    }
  };
  const handleRowSelect = (index) => {
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = data.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const visibleData = filteredData.slice(0, rowsPerPage);

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
          <div
            className={styles.datePicker}
            onClick={() => dateInputRef.current?.showPicker()}
          >
            <img src="/icons/Calender.svg" alt="" className={styles.icon} />
            <span>
              {selectedDate
                ? new Date(selectedDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "Date of incorporation"}
            </span>

            <input
              ref={dateInputRef}
              type="date"
              className={styles.hiddenDateInput}
              onChange={(e) => {
                setSelectedDate(e.target.value);
              }}
            />
          </div>

          <div ref={bulkRef} className={styles.bulkWrapper}>
            <button className={styles.bulkActionBtn} onClick={toggleBulk}>
              Bulk Action
              <img
                src="/icons/chevron-down.svg"
                alt=""
                className={`${styles.chevron} ${bulkOpen ? styles.rotated : ""}`}
              />
            </button>

            {bulkOpen && (
              <div
                className={`${styles.bulkDropdown} ${
                  bulkDirection === "up"
                    ? styles.dropdownUp
                    : styles.dropdownDown
                }`}
              >
                <button className={styles.dropdownItem}>Export Selected</button>
                <button className={styles.dropdownItem}>
                  Mark as Inactive
                </button>
                <button className={styles.dropdownItem}>Delete</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.checkboxCell}>
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
            {visibleData.map((company, index) => (
              <tr key={index}>
                <td className={styles.checkboxCell}>
                  <div className={styles.checkboxOuter}>
                    <label className={styles.checkboxWrapper}>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(index)}
                        onChange={() => handleRowSelect(index)}
                      />

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
            Loaded:{" "}
            <span className={styles.boldText}>
              {visibleData.length} Companies
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
              <button className={styles.navBtnDisabled}>
                <img
                  src="/icons/chevrons-left.svg"
                  alt="First page"
                  className={styles.navIcon}
                />
              </button>
              <button className={styles.navBtnDisabled}>
                <img
                  src="/icons/chevron-left.svg"
                  alt="First page"
                  className={styles.navIcon}
                />
              </button>
              <button className={styles.navBtn}>
                <img
                  src="/icons/chevron-right-black.svg"
                  alt="First page"
                  className={styles.navIcon}
                />
              </button>
              <button className={styles.navBtn}>
                <img
                  src="/icons/chevrons-right.svg"
                  alt="First page"
                  className={styles.navIcon}
                />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
