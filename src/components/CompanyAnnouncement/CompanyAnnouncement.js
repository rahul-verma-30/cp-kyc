"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./CompanyAnnouncement.module.css";
import Image from "next/image";
import Link from "next/link";
import RowsPerPage from "@/components/common/RowsPerPage";
import CustomCalendar from "@/components/common/CustomCalendar";

export default function CompanyAnnouncement() {
  const calendarRef = useRef(null);

  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: "market_cap", direction: "desc" });

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 350);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Format date for table display: YYYY-MM-DD -> DD/MM/YYYY
  const formatDate = (dateString) => {
    if (!dateString || dateString === "-") return "-";

    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) return dateString;

    let date = new Date(dateString);

    if (isNaN(date.getTime()) && typeof dateString === "string" && dateString.includes("/")) {
      const parts = dateString.split("/");
      if (parts.length === 3) {
        date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
      }
    }

    if (isNaN(date.getTime())) return dateString;

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Format date for API query parameters: Date -> YYYY-MM-DD
  const formatApiDate = (dateVal) => {
    if (!dateVal || dateVal === "-") return "";
    let dateObj = dateVal;
    if (typeof dateVal === "string") {
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateVal)) return dateVal;
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateVal)) {
        const parts = dateVal.split("/");
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
      dateObj = new Date(dateVal);
    }
    if (dateObj instanceof Date && !isNaN(dateObj.getTime())) {
      const day = String(dateObj.getDate()).padStart(2, "0");
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const year = dateObj.getFullYear();
      return `${year}-${month}-${day}`;
    }
    return "";
  };

  // Fetch Company Announcements from API
  useEffect(() => {
    const fetchCompanyAnnouncements = async () => {
      try {
        setLoading(true);
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://cpkycapi.webninjaz.com";

        const formattedStartDate = formatApiDate(startDate);
        const formattedEndDate = formatApiDate(endDate);

        const params = new URLSearchParams({
          page: currentPage,
          per_page: rowsPerPage,
        });

        if (debouncedSearch.trim()) {
          params.append("search", debouncedSearch.trim());
        }

        if (sortConfig.key && sortConfig.direction) {
          params.append("sort_by", sortConfig.key);
          params.append("sort_order", sortConfig.direction);
        }

        if (formattedStartDate && formattedEndDate) {
          params.append("from_date", formattedStartDate);
          params.append("to_date", formattedEndDate);
        } else if (formattedStartDate) {
          params.append("date", formattedStartDate);
        }

        const res = await fetch(
          `${baseUrl}/api/companies/listed-announcements?${params.toString()}`,
          {
            headers: {
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error(`HTTP Error ${res.status}`);
        }

        const result = await res.json();

        if (result && Array.isArray(result.data)) {
          setCompanies(result.data);
          setTotalCompanies(result.total || result.data.length);
          setTotalPages(
            result.total_pages ||
              result.pages ||
              Math.ceil((result.total || result.data.length) / rowsPerPage) ||
              1
          );
        } else if (result && Array.isArray(result.items)) {
          setCompanies(result.items);
          setTotalCompanies(result.total || result.items.length);
          setTotalPages(
            result.total_pages ||
              result.pages ||
              Math.ceil((result.total || result.items.length) / rowsPerPage) ||
              1
          );
        } else if (Array.isArray(result)) {
          setCompanies(result);
          setTotalCompanies(result.length);
          setTotalPages(Math.ceil(result.length / rowsPerPage) || 1);
        } else {
          setCompanies([]);
          setTotalCompanies(0);
          setTotalPages(1);
        }
      } catch (error) {
        console.error("Error fetching company announcements:", error);
        setCompanies([]);
        setTotalCompanies(0);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyAnnouncements();
  }, [rowsPerPage, currentPage, debouncedSearch, sortConfig, startDate, endDate]);

  // Handle Column Sorting
  const handleSort = (key) => {
    let direction = "asc";

    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        direction = "desc";
      } else if (sortConfig.direction === "desc") {
        setSortConfig({ key: "market_cap", direction: "desc" });
        setCurrentPage(1);
        return;
      } else {
        direction = "asc";
      }
    }

    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  // Close calendar popup on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!calendarRef.current?.contains(e.target)) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, rowsPerPage, startDate, endDate]);

  const visibleData = companies;

  // Pagination Handlers
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Company Announcement</h1>
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
        </div>

        <div className={styles.rightTools}>
          <Link
            href="/company-announcement/view"
            className={styles.viewAnnouncementBtn}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span>View Announcements</span>
          </Link>

          <div ref={calendarRef} className={styles.datePickerWrapper}>
            <div
              className={styles.datePicker}
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            >
              <img src="/icons/Calender.svg" alt="" className={styles.icon} />
              <span>
                {startDate
                  ? `${new Date(startDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}${
                      endDate
                        ? ` - ${new Date(endDate).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}`
                        : ""
                    }`
                  : "Filter by date"}
              </span>
              {startDate && (
                <button
                  type="button"
                  className={styles.clearDateBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    setStartDate(null);
                    setEndDate(null);
                    setIsCalendarOpen(false);
                  }}
                  aria-label="Clear date filter"
                >
                  <img src="/icons/close.svg" alt="Clear" className={styles.clearIcon} />
                </button>
              )}
            </div>

            {isCalendarOpen && (
              <div className={styles.popupDateInput}>
                <CustomCalendar
                  initialStartDate={startDate}
                  initialEndDate={endDate}
                  onSelect={(start, end) => {
                    setStartDate(start);
                    setEndDate(end);
                    if (start && end) {
                      setIsCalendarOpen(false);
                    }
                  }}
                />
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
              <th
                className={styles.sortableHeader}
                onClick={() => handleSort("company_name")}
              >
                <div className={styles.headerContent}>
                  Company Name
                  <img
                    src={
                      sortConfig.key === "company_name"
                        ? sortConfig.direction === "asc"
                          ? "/icons/arrow-up.svg"
                          : "/icons/arrow-down.svg"
                        : "/icons/chevrons-up-down.svg"
                    }
                    alt=""
                    className={styles.sortIcon}
                  />
                </div>
              </th>

              <th
                className={styles.sortableHeader}
                onClick={() => handleSort("total_announcements_count")}
              >
                <div className={styles.headerContent}>
                  Total Announcement
                  <img
                    src={
                      sortConfig.key === "total_announcements_count" ||
                      sortConfig.key === "total_announcements"
                        ? sortConfig.direction === "asc"
                          ? "/icons/arrow-up.svg"
                          : "/icons/arrow-down.svg"
                        : "/icons/chevrons-up-down.svg"
                    }
                    alt=""
                    className={styles.sortIcon}
                  />
                </div>
              </th>

              <th>
                <div className={styles.headerContent}>
                  Latest Announcement
                </div>
              </th>

              <th
                className={styles.sortableHeader}
                onClick={() => handleSort("latest_announcement_date")}
              >
                <div className={styles.headerContent}>
                  Latest announcement Date
                  <img
                    src={
                      sortConfig.key === "latest_announcement_date"
                        ? sortConfig.direction === "asc"
                          ? "/icons/arrow-up.svg"
                          : "/icons/arrow-down.svg"
                        : "/icons/chevrons-up-down.svg"
                    }
                    alt=""
                    className={styles.sortIcon}
                  />
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              Array.from({ length: 15 }).map((_, i) => (
                <tr key={`skeleton-${i}`}>
                  <td className={styles.companyCell}>
                    <div className={styles.companyCellWrapper}>
                      <div className={`${styles.skeleton} ${styles.skeletonCircle}`}></div>
                      <div
                        className={`${styles.skeleton} ${styles.skeletonText}`}
                        style={{ width: "180px" }}
                      ></div>
                      <div
                        className={`${styles.skeleton} ${styles.skeletonBadge}`}
                        style={{ width: "50px", height: "18px" }}
                      ></div>
                    </div>
                  </td>
                  <td>
                    <div
                      className={`${styles.skeleton} ${styles.skeletonText}`}
                      style={{ width: "40px" }}
                    ></div>
                  </td>
                  <td>
                    <div
                      className={`${styles.skeleton} ${styles.skeletonText}`}
                      style={{ width: "40px" }}
                    ></div>
                  </td>
                  <td>
                    <div
                      className={`${styles.skeleton} ${styles.skeletonText}`}
                      style={{ width: "90px" }}
                    ></div>
                  </td>
                </tr>
              ))
            ) : visibleData.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", padding: "32px", color: "#64748b" }}>
                  No announcements found
                </td>
              </tr>
            ) : (
              visibleData.map((company, index) => {
                const companyName = company.company_name || company.name || "-";
                const slug =
                  typeof companyName === "string" && companyName !== "-"
                    ? companyName.toLowerCase().replace(/\s+/g, "-")
                    : "";

                const logoSrc =
                  company.logo_url && company.logo_url !== "-"
                    ? company.logo_url
                    : company.logo && company.logo !== "-"
                    ? company.logo
                    : "/icons/Image.svg";

                const isListed =
                  company.listed_flag === "Yes" ||
                  company.listed_flag === "Listed" ||
                  company.company_class?.toLowerCase() === "public";

                return (
                  <tr key={company.cin || index}>
                    <td className={styles.companyCell}>
                      <div className={styles.companyCellWrapper}>
                        <Image
                          src={logoSrc}
                          alt={companyName}
                          className={styles.companyIcon}
                          width={32}
                          height={32}
                          unoptimized={true}
                        />
                        {companyName && companyName !== "-" ? (
                          <Link
                            href={`/company-announcement/view?search=${encodeURIComponent(companyName)}`}
                            className={styles.companyLink}
                          >
                            {companyName}
                          </Link>
                        ) : (
                          <span>{companyName}</span>
                        )}

                        {isListed ? (
                          <span className={`${styles.companyClassTag} ${styles.tagPublic}`}>
                            Listed
                          </span>
                        ) : company.company_class && company.company_class !== "-" ? (
                          <span
                            className={`${styles.companyClassTag} ${
                              company.company_class.toLowerCase() === "public"
                                ? styles.tagPublic
                                : styles.tagPrivate
                            }`}
                          >
                            {company.company_class}
                          </span>
                        ) : null}
                      </div>
                    </td>

                    <td>
                      {company.total_announcements_count ??
                        company.total_announcements ??
                        company.announcements_count ??
                        "-"}
                    </td>

                    <td className={styles.latestAnnouncementCell}>
                      {company.latest_announcements_count ??
                        company.announcements_count ??
                        company.latest_announcement?.title ??
                        company.latest_announcement_title ??
                        (typeof company.latest_announcement === "string"
                          ? company.latest_announcement
                          : "-")}
                    </td>

                    <td>
                      {formatDate(
                        company.latest_announcement_date ||
                          company.latest_announcement?.date ||
                          company.latest_date
                      )}
                    </td>
                  </tr>
                );
              })
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
                options={[20, 50, 100]}
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
                type="button"
                className={
                  currentPage === 1 ? styles.navBtnDisabled : styles.navBtn
                }
                onClick={goToFirstPage}
                disabled={currentPage === 1}
                aria-label="First page"
              >
                <img src="/icons/chevrons-left.svg" className={styles.navIcon} alt="First" />
              </button>

              <button
                type="button"
                className={
                  currentPage === 1 ? styles.navBtnDisabled : styles.navBtn
                }
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <img src="/icons/chevron-left.svg" className={styles.navIcon} alt="Previous" />
              </button>

              <button
                type="button"
                className={
                  currentPage === totalPages
                    ? styles.navBtnDisabled
                    : styles.navBtn
                }
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                <img
                  src="/icons/chevron-right-black.svg"
                  className={styles.navIcon}
                  alt="Next"
                />
              </button>

              <button
                type="button"
                className={
                  currentPage === totalPages
                    ? styles.navBtnDisabled
                    : styles.navBtn
                }
                onClick={goToLastPage}
                disabled={currentPage === totalPages}
                aria-label="Last page"
              >
                <img src="/icons/chevrons-right.svg" className={styles.navIcon} alt="Last" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
