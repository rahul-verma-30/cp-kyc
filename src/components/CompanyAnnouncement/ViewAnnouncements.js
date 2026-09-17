"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./ViewAnnouncements.module.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import RowsPerPage from "@/components/common/RowsPerPage";
import CustomCalendar from "@/components/common/CustomCalendar";

export default function ViewAnnouncements() {
  const calendarRef = useRef(null);
  const searchParams = useSearchParams();
  const searchParamVal = searchParams ? searchParams.get("search") || "" : "";
  const prevSearchParamRef = useRef(searchParamVal);

  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [days, setDays] = useState(1);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState(searchParamVal);
  const [debouncedSearch, setDebouncedSearch] = useState(searchParamVal);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalAnnouncements, setTotalAnnouncements] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: "received_time", direction: "desc" });
  const [expandedRows, setExpandedRows] = useState({});

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 350);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Sync URL search query if it changes externally (e.g. navigation)
  useEffect(() => {
    if (prevSearchParamRef.current !== searchParamVal) {
      prevSearchParamRef.current = searchParamVal;
      setSearchQuery(searchParamVal);
      setDebouncedSearch(searchParamVal);
      setCurrentPage(1);
    }
  }, [searchParamVal]);

  // Toggle expanded state for long descriptions
  const toggleRowExpand = (index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Format date to display ONLY date (without time): DD/MM/YYYY
  const formatDateOnly = (dateStr) => {
    if (!dateStr || dateStr === "-") return "-";
    const cleanStr = String(dateStr).trim();
    const datePart = cleanStr.split(" ")[0].split("T")[0];

    // DD-MM-YYYY -> DD/MM/YYYY
    if (/^\d{2}-\d{2}-\d{4}$/.test(datePart)) {
      const [d, m, y] = datePart.split("-");
      return `${d}/${m}/${y}`;
    }
    // DD/MM/YYYY
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(datePart)) {
      return datePart;
    }
    // YYYY-MM-DD -> DD/MM/YYYY
    if (/^\d{4}-\d{2}-\d{2}$/.test(datePart)) {
      const [y, m, d] = datePart.split("-");
      return `${d}/${m}/${y}`;
    }

    const parsedDate = new Date(dateStr);
    if (!isNaN(parsedDate.getTime())) {
      const day = String(parsedDate.getDate()).padStart(2, "0");
      const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
      const year = parsedDate.getFullYear();
      return `${day}/${month}/${year}`;
    }

    return datePart || "-";
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

  // Fetch Announcements from /api/announcements/latest
  const fetchAnnouncements = useCallback(async () => {
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

      // Date range or specific single date, or days parameter
      if (formattedStartDate && formattedEndDate) {
        params.append("from_date", formattedStartDate);
        params.append("to_date", formattedEndDate);
      } else if (formattedStartDate) {
        params.append("date", formattedStartDate);
      } else if (days) {
        params.append("days", days);
      }

      let loadedItems = [];
      let totalCount = 0;
      let totalPageCount = 1;

      // 1. Primary API call to /api/announcements/latest
      try {
        const res = await fetch(`${baseUrl}/api/announcements/latest?${params.toString()}`, {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          cache: "no-store",
        });

        if (res.ok) {
          const result = await res.json();
          if (result && (result.status === "success" || result.announcements)) {
            const rawItems = result.announcements?.items || result.items || result.data || [];
            loadedItems = rawItems;

            let apiTotal =
              result.total ??
              result.total_announcements ??
              result.total_count ??
              result.count ??
              result.announcements?.total ??
              result.announcements?.total_count ??
              result.announcements?.total_announcements ??
              result.announcements?.count ??
              null;

            let apiTotalPages =
              result.total_pages ??
              result.pages ??
              result.announcements?.total_pages ??
              result.announcements?.pages ??
              null;

            // If API does not provide total, fetch from listed-announcements to get accurate total
            if (apiTotal == null) {
              try {
                const countRes = await fetch(
                  `${baseUrl}/api/companies/listed-announcements?page=1&per_page=1`,
                  {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                    cache: "no-store",
                  }
                );
                if (countRes.ok) {
                  const countData = await countRes.json();
                  if (countData.total) {
                    apiTotal = countData.total;
                  }
                }
              } catch (e) {
                // Ignore
              }
            }

            if (apiTotal != null) {
              totalCount = Number(apiTotal);
              totalPageCount = apiTotalPages
                ? Number(apiTotalPages)
                : Math.ceil(totalCount / rowsPerPage) || 1;
            } else if (apiTotalPages != null) {
              totalPageCount = Number(apiTotalPages);
              totalCount = totalPageCount * rowsPerPage;
            } else {
              if (rawItems.length === rowsPerPage) {
                totalPageCount = Math.max(currentPage + 1, 2);
                totalCount = Math.max(currentPage * rowsPerPage + 1, rawItems.length);
              } else {
                totalPageCount = currentPage;
                totalCount = (currentPage - 1) * rowsPerPage + rawItems.length;
              }
            }
          }
        } else {
          console.warn(`/api/announcements/latest returned HTTP ${res.status}`);
        }
      } catch (apiErr) {
        console.warn("API /api/announcements/latest fetch error:", apiErr);
      }

      // 2. Resilient fallback if API returns empty/401 during local unauthenticated tests
      if (loadedItems.length === 0) {
        try {
          const companiesRes = await fetch(
            `${baseUrl}/api/companies/listed-announcements?page=1&per_page=50${
              debouncedSearch.trim()
                ? `&search=${encodeURIComponent(debouncedSearch.trim())}`
                : ""
            }`,
            {
              headers: {
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
              },
              cache: "no-store",
            }
          );

          if (companiesRes.ok) {
            const compData = await companiesRes.json();
            const compList = compData.data || compData.items || [];
            const globalTotal = compData.total || compList.length;

            const promises = compList.slice(0, 10).map(async (company) => {
              try {
                const compName = company.company_name || company.name;
                const aRes = await fetch(
                  `${baseUrl}/api/company/${encodeURIComponent(compName)}/announcements?page=1&per_page=5`,
                  {
                    headers: {
                      ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                    cache: "no-store",
                  }
                );

                if (aRes.ok) {
                  const aData = await aRes.json();
                  const aItems = aData.announcements?.items || [];
                  return aItems.map((it, idx) => ({
                    ...it,
                    unique_id: it.id || `${company.cin || compName}-${idx}`,
                    company_name: it.company_name || compName,
                    cin: company.cin || aData.company_cin,
                    scrip_code: company.scrip_code || it.scrip_code,
                  }));
                }
              } catch (e) {
                return [];
              }
              return [];
            });

            const results = await Promise.all(promises);
            let combined = results.flat().filter(Boolean);

            if (debouncedSearch.trim()) {
              const q = debouncedSearch.toLowerCase();
              combined = combined.filter(
                (it) =>
                  (it.company_name && it.company_name.toLowerCase().includes(q)) ||
                  (it.cin && it.cin.toLowerCase().includes(q)) ||
                  (it.headline && it.headline.toLowerCase().includes(q)) ||
                  (it.description && it.description.toLowerCase().includes(q))
              );
            }

            totalCount = globalTotal || combined.length;
            totalPageCount = Math.ceil(totalCount / rowsPerPage) || 1;
            const startIndex = (currentPage - 1) * rowsPerPage;
            loadedItems = combined.slice(startIndex, startIndex + rowsPerPage);
          }
        } catch (fallbackErr) {
          console.warn("Fallback fetch error:", fallbackErr);
        }
      }

      setAnnouncements(loadedItems);
      setTotalAnnouncements(totalCount);
      setTotalPages(totalPageCount);
    } catch (error) {
      console.error("Error fetching announcements:", error);
      setAnnouncements([]);
      setTotalAnnouncements(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [
    currentPage,
    rowsPerPage,
    days,
    debouncedSearch,
    startDate,
    endDate,
  ]);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  // Handle Column Sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        direction = "desc";
      } else if (sortConfig.direction === "desc") {
        setSortConfig({ key: "received_time", direction: "desc" });
        return;
      } else {
        direction = "asc";
      }
    }
    setSortConfig({ key, direction });

    setAnnouncements((prev) => {
      const sorted = [...prev].sort((a, b) => {
        const valA = a[key] || "";
        const valB = b[key] || "";
        const dir = direction === "asc" ? 1 : -1;
        return String(valA).localeCompare(String(valB)) * dir;
      });
      return sorted;
    });
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
  }, [debouncedSearch, rowsPerPage, days, startDate, endDate]);

  // Pagination Handlers
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.headerLeft}>
            <h1 className={styles.title}>Company Announcements</h1>
          </div>
        </div>

        <p className={styles.subtitle}>
          Official corporate disclosures, regulatory announcements, and filings across listed companies
        </p>
      </header>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.leftTools}>
          <div className={styles.searchWrapper}>
            <img src="/icons/search.svg" alt="" className={styles.icon} />
            <input
              type="text"
              placeholder="Search by Company Name or CIN..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
            {searchQuery && (
              <button
                type="button"
                className={styles.clearDateBtn}
                onClick={() => {
                  setSearchQuery("");
                  setDebouncedSearch("");
                  setCurrentPage(1);
                }}
                aria-label="Clear search query"
              >
                <img src="/icons/close.svg" alt="Clear" className={styles.clearIcon} />
              </button>
            )}
          </div>

          {/* Quick Days Selector */}
          <div className={styles.daysToggleWrapper}>
            {[
              { label: "Last 24h", value: 1 },
              { label: "7 Days", value: 7 },
              { label: "30 Days", value: 30 },
            ].map((d) => (
              <button
                key={d.value}
                type="button"
                className={`${styles.daysBtn} ${
                  days === d.value && !startDate ? styles.activeDaysBtn : ""
                }`}
                onClick={() => {
                  setStartDate(null);
                  setEndDate(null);
                  setDays(d.value);
                  setCurrentPage(1);
                }}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.rightTools}>
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
                onClick={() => handleSort("headline")}
              >
                <div className={styles.headerContent}>
                  Heading
                  <img
                    src={
                      sortConfig.key === "headline"
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
                <div className={styles.headerContent}>Description</div>
              </th>

              <th
                className={styles.sortableHeader}
                onClick={() => handleSort("category")}
              >
                <div className={styles.headerContent}>
                  Category
                  <img
                    src={
                      sortConfig.key === "category"
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
                onClick={() => handleSort("received_time")}
              >
                <div className={styles.headerContent}>
                  Received Time
                  <img
                    src={
                      sortConfig.key === "received_time"
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
                onClick={() => handleSort("disseminated_time")}
              >
                <div className={styles.headerContent}>
                  Disseminated Time
                  <img
                    src={
                      sortConfig.key === "disseminated_time"
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

              <th style={{ textAlign: "center" }}>
                <div className={styles.headerContent} style={{ justifyContent: "center" }}>
                  PDF
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              Array.from({ length: rowsPerPage || 20 }).map((_, i) => (
                <tr key={`skeleton-${i}`}>
                  <td className={styles.companyCell}>
                    <div
                      className={`${styles.skeleton} ${styles.skeletonText}`}
                      style={{ width: "160px" }}
                    ></div>
                    <div
                      className={`${styles.skeleton} ${styles.skeletonText}`}
                      style={{ width: "90px", marginTop: "4px" }}
                    ></div>
                  </td>
                  <td>
                    <div
                      className={`${styles.skeleton} ${styles.skeletonText}`}
                      style={{ width: "180px" }}
                    ></div>
                  </td>
                  <td>
                    <div
                      className={`${styles.skeleton} ${styles.skeletonText}`}
                      style={{ width: "220px" }}
                    ></div>
                  </td>
                  <td>
                    <div
                      className={`${styles.skeleton} ${styles.skeletonBadge}`}
                      style={{ width: "90px" }}
                    ></div>
                  </td>
                  <td>
                    <div
                      className={`${styles.skeleton} ${styles.skeletonText}`}
                      style={{ width: "80px" }}
                    ></div>
                  </td>
                  <td>
                    <div
                      className={`${styles.skeleton} ${styles.skeletonText}`}
                      style={{ width: "80px" }}
                    ></div>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <div
                      className={`${styles.skeleton} ${styles.skeletonCircle}`}
                      style={{ width: "24px", height: "24px", margin: "0 auto" }}
                    ></div>
                  </td>
                </tr>
              ))
            ) : announcements.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  style={{ textAlign: "center", padding: "40px", color: "#64748b" }}
                >
                  No announcements found matching your criteria.
                </td>
              </tr>
            ) : (
              announcements.map((item, index) => {
                const companyName = item.company_name || item.name || "-";
                const slug =
                  typeof companyName === "string" && companyName !== "-"
                    ? companyName.toLowerCase().replace(/\s+/g, "-")
                    : "";

                const heading = item.headline || item.description || "-";
                const description = item.description || item.headline || "-";
                const category = item.category || "Company Update";
                const receivedDateOnly = formatDateOnly(item.received_time || item.date);
                const disseminatedDateOnly = formatDateOnly(item.disseminated_time);
                const isExpanded = !!expandedRows[index];
                const isLongDesc = typeof description === "string" && description.length > 120;

                return (
                  <tr key={item.unique_id || item.id || `${item.cin || companyName}-${index}`}>
                    {/* Company Name (without logo) */}
                    <td className={styles.companyCell}>
                      <div className={styles.companyInfo}>
                        {slug ? (
                          <Link
                            href={`/company/${slug}`}
                            onClick={() => {
                              if (typeof window !== "undefined") {
                                sessionStorage.setItem("internalSearch", "true");
                              }
                            }}
                            className={styles.companyLink}
                          >
                            {companyName}
                          </Link>
                        ) : (
                          <span className={styles.companyLink}>{companyName}</span>
                        )}
                        {item.cin && (
                          <span className={styles.companySubText}>
                            {item.cin} {item.scrip_code ? `• ${item.scrip_code}` : ""}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Heading */}
                    <td className={styles.headingCell}>
                      {heading}
                    </td>

                    {/* Description */}
                    <td className={styles.descriptionCell}>
                      <span
                        className={`${styles.descText} ${
                          !isExpanded && isLongDesc ? styles.descClamped : ""
                        }`}
                      >
                        {description}
                      </span>
                      {isLongDesc && (
                        <button
                          type="button"
                          className={styles.showMoreBtn}
                          onClick={() => toggleRowExpand(index)}
                        >
                          {isExpanded ? "Show Less" : "Show More"}
                        </button>
                      )}
                    </td>

                    {/* Category */}
                    <td>
                      <span className={styles.categoryBadge}>{category}</span>
                    </td>

                    {/* Received Time (Date only) */}
                    <td className={styles.timeCell}>
                      {receivedDateOnly}
                    </td>

                    {/* Disseminated Time (Date only) */}
                    <td className={styles.timeCell}>
                      {disseminatedDateOnly}
                    </td>

                    {/* PDF URL Action */}
                    <td className={styles.pdfCell}>
                      {item.pdf_url && item.pdf_url !== "-" ? (
                        <a
                          href={item.pdf_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.pdfActionLink}
                          title="Open Announcement PDF"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#f70202"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-file-text"
                          >
                            <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
                            <path d="M14 2v5a1 1 0 0 0 1 1h5" />
                            <path d="M10 9H8" />
                            <path d="M16 13H8" />
                            <path d="M16 17H8" />
                          </svg>
                        </a>
                      ) : (
                        <span className={styles.noPdf}>-</span>
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
              {announcements.length} Announcements
            </span>
          </span>

          <span className={styles.separator}>|</span>

          <span className={styles.mutedText}>
            Found:{" "}
            <span className={styles.boldText}>
              {totalAnnouncements} Announcements
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
