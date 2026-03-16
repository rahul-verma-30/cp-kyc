"use client";
import styles from "./CompanyDatabase.module.css";
import { useState, useRef, useEffect } from "react";
import RowsPerPage from "@/components/common/RowsPerPage";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CompanyDatabase() {
  const bulkRef = useRef(null);
  const headerCheckboxRef = useRef(null);
  const dateInputRef = useRef(null);

  const [bulkOpen, setBulkOpen] = useState(false);
  const [bulkDirection, setBulkDirection] = useState("down");

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch Companies
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        // Using both size and limit to be safe, adding search query if possible
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/companies?page=${currentPage}&size=${rowsPerPage}&limit=${rowsPerPage}&per_page=${rowsPerPage}&search=${searchQuery}&query=${searchQuery}`
        );

        const result = await res.json();

        if (result && Array.isArray(result.items)) {
          setCompanies(result.items);
          setTotalCompanies(result.total || result.items.length);
          setTotalPages(result.pages || Math.ceil((result.total || result.items.length) / rowsPerPage));
        } else if (Array.isArray(result)) {
          setCompanies(result);
          setTotalCompanies(result.length);
          setTotalPages(Math.ceil(result.length / rowsPerPage));
        } else {
          setCompanies([]);
          setTotalCompanies(0);
          setTotalPages(1);
        }
      } catch (error) {
        console.log("Error fetching companies:", error);
        setCompanies([]);
        setTotalCompanies(0);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [rowsPerPage, currentPage, searchQuery]);

  const toggleBulk = () => {
    if (!bulkRef.current) return;

    const rect = bulkRef.current.getBoundingClientRect();
    const dropdownHeight = 140;
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

  // Search filter
  const filteredData = companies.filter((company) =>
    (company.company_name || "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, rowsPerPage]);

  // Basic client-side filtering and slicing as a fallback/secondary filter
  const visibleData = filteredData;

  const allChecked = selectedRows.length === visibleData.length;
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
      setSelectedRows(visibleData.map((_, i) => i));
    }
  };

  const handleRowSelect = (index) => {
    setSelectedRows((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  // Pagination handlers
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPrevPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Company Database</h1>
      </header>

      {/* Toolbar */}
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
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <div ref={bulkRef} className={styles.bulkWrapper}>
            <button className={styles.bulkActionBtn} onClick={toggleBulk}>
              Bulk Action
              <img
                src="/icons/chevron-down.svg"
                alt=""
                className={`${styles.chevron} ${bulkOpen ? styles.rotated : ""
                  }`}
              />
            </button>

            {bulkOpen && (
              <div
                className={`${styles.bulkDropdown} ${bulkDirection === "up"
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

      {/* Table */}
      <div className={styles.tableContainer}>
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

              <th>Company Name</th>
              <th>Authorised Capital (Cr.)</th>
              <th>PUC/OOC (Cr.)</th>
              <th>SOC (Cr.)</th>
              <th>DOI</th>
              <th>Location</th>
              <th>Industry</th>
              <th>Company Status</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                  Loading companies...
                </td>
              </tr>
            ) : visibleData.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                  No companies found
                </td>
              </tr>
            ) : (
              visibleData.map((company, index) => (
                <tr key={index}>
                  <td className={styles.checkboxCol}>
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
                    <Link href={`/company/${(company.company_name || "").toLowerCase().replace(/\s+/g, "-")}`} className={styles.companyLink}>{company.company_name || "-"}</Link>
                  </td>
             <td>{company.authorised_capital || "-"}</td>

                  <td>{company.paid_up_capital || "-"}</td>
                  <td>{company.soc || "-"}</td>
                  <td>{company.doi || "-"}</td>
                  <td>{company.registered_address?.split(',').slice(-4, -1)[0]?.trim() + ", " + company.registered_address?.split(',').slice(-4, -1)[1]?.trim() || company.registered_address?.split(',').slice(-4, -1)[0]?.trim() || "-"}</td>
                  <td>{company.industry || "-"}</td>
                  <td>
                    <span className={styles.statusBadge}>
                      {company.company_status || "-"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Pagination */}
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
            Found:{" "}
            <span className={styles.boldText}>
              {totalCompanies} Companies
            </span>
          </span>
        </div>

        <div className={styles.footerRight}>
          <div className={styles.paginationControls}>
            <div className={styles.rowsPerPage}>
              <span className={styles.rowsPerPageText}>Rows per page</span>
              <RowsPerPage
                value={rowsPerPage}
                onChange={(val) => {
                  setRowsPerPage(val);
                  setCurrentPage(1);
                }}
              />
            </div>

            <span className={styles.pageLabel}>
              Page {currentPage} of {totalPages || 1}
            </span>

            <div className={styles.navButtons}>
              <button
                className={
                  currentPage === 1 ? styles.navBtnDisabled : styles.navBtn
                }
                onClick={goToFirstPage}
              >
                <img src="/icons/chevrons-left.svg" className={styles.navIcon} />
              </button>

              <button
                className={
                  currentPage === 1 ? styles.navBtnDisabled : styles.navBtn
                }
                onClick={goToPrevPage}
              >
                <img src="/icons/chevron-left.svg" className={styles.navIcon} />
              </button>

              <button
                className={
                  currentPage === totalPages
                    ? styles.navBtnDisabled
                    : styles.navBtn
                }
                onClick={goToNextPage}
              >
                <img
                  src="/icons/chevron-right-black.svg"
                  className={styles.navIcon}
                />
              </button>

              <button
                className={
                  currentPage === totalPages
                    ? styles.navBtnDisabled
                    : styles.navBtn
                }
                onClick={goToLastPage}
              >
                <img src="/icons/chevrons-right.svg" className={styles.navIcon} />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}