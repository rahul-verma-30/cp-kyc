"use client";

import styles from "./ComplianceDetails.module.css";

import React, { useRef, useEffect, useState } from "react";

import { useCompanySection } from "@/components/company/context/CompanySectionContext";
import { scrollToElementWithOffset } from "@/utils/scrollUtils";
import { formatDateToIST } from "@/utils/dateFormatter";

import {
  complianceKpis,
  creditRatingDates,
  creditRatings,
  csrDetails2021_22,
  epfoYearlyTableData,
  pendingCasesTable,
} from "./dummyData";
import { ChevronsDownUp } from "lucide-react";

import { createPortal } from "react-dom";
import { useParams } from "next/navigation";
import { auditorsRemarksStandalone } from "./dummyData";
import { inactiveGstTable } from "./dummyData";
import { activeGstTable } from "./dummyData";
import { inactiveEstablishmentTable } from "./dummyData";
import { activeEstablishmentTable } from "./dummyData";
import EpfoSummaryChart from "./EpfoSummaryChart";
import CSRYearlyBarChart from "./CSRYearlyBarChart";
import CSRSectorDonutChart from "./CSRSectorDonutChart";

const defaultSectorWiseData = [
  // {
  //   name: "Poverty, Eradicating Hunger, Malnutrition",
  //   value: 108.81,
  //   color: "#0EA5E9",
  // },
  // { name: "Health Care", value: 99.62, color: "#041E42" },
  // { name: "Environmental Sustainability", value: 51.86, color: "#F59E0B" },
  // { name: "Education", value: 15.42, color: "#EAB308" },
  // { name: "Livelihood Enhancement Projects", value: 2.2, color: "#22C55E" },
];

const defaultYearWiseData = [
  // { year: "2015", value: 135 },
  // { year: "2016", value: 160 },
  // { year: "2017", value: 190 },
  // { year: "2018", value: 220 },
  // { year: "2019", value: 250 },
  // { year: "2020", value: 270 },
  // { year: "2021", value: 290 },
  // { year: "2022", value: 300 },
];

function CustomPagination({ page, size, total, onPageChange }) {
  const totalPages = Math.ceil(total / size) || 1;
  const isFirst = page === 1;
  const isLast = page >= totalPages;

  return (
    <div className={styles.controls}>
      <span className={styles.pageInfo}>Page {page} of {totalPages}</span>
      <div className={styles.pageControls}>
        <button disabled={isFirst} onClick={() => onPageChange(1)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.33333 11.3346L4 8.0013L7.33333 4.66797M12 11.3346L8.66667 8.0013L12 4.66797" stroke="#041E42" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button disabled={isFirst} onClick={() => onPageChange(page - 1)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 12L6 8L10 4" stroke="#041E42" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button disabled={isLast} onClick={() => onPageChange(page + 1)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 12L10 8L6 4" stroke="#041E42" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button disabled={isLast} onClick={() => onPageChange(totalPages)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 11.3346L7.33333 8.0013L4 4.66797M8.66667 11.3346L12 8.0013L8.66667 4.66797" stroke="#041E42" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function RowsPerPage({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState(null);

  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggle = () => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const dropdownHeight = 176;

    const spaceBelow = window.innerHeight - rect.bottom;
    const openUp = spaceBelow < dropdownHeight;

    setCoords({
      left: rect.left,
      width: rect.width,
      top: openUp ? rect.top - 135 : rect.bottom + 4,
    });

    setOpen(true);
  };

  // ✅ CLOSE ON OUTSIDE CLICK
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e) => {
      if (
        triggerRef.current?.contains(e.target) ||
        dropdownRef.current?.contains(e.target)
      ) {
        return;
      }
      setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // close on scroll / resize
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [open]);

  return (
    <>
      <div
        ref={triggerRef}
        className={styles.pageSizeControl}
        onClick={(e) => {
          e.stopPropagation();
          toggle();
        }}
      >
        <span className={styles.pageSizeValue}>{value}</span>
        <div className={styles.pageSizeArrows}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M4.66406 10.0013L7.9974 13.3346L11.3307 10.0013
                 M4.66406 6.0013L7.9974 2.66797L11.3307 6.0013"
              stroke="#1E293B"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {open &&
        coords &&
        createPortal(
          <div
            ref={dropdownRef}
            className={styles.portalDropdown}
            style={{
              top: coords.top,
              left: coords.left,
              width: coords.width,
            }}
          >
            {[10, 20, 50, 100].map((val) => (
              <button
                key={val}
                className={styles.rowsOption}
                onClick={() => {
                  onChange(val);
                  setOpen(false);
                }}
              >
                {val}
              </button>
            ))}
          </div>,
          document.body,
        )}
    </>
  );
}

// epfoData.ts
export const epfoSummaryGraphData = [
  // { period: "Jul-Sep 23", employees: 2000, amount: 28 },
  // { period: "Oct-Dec 23", employees: 5600, amount: 65 },
  // { period: "Jan-Mar 24", employees: 5450, amount: 63 },
  // { period: "Apr-Jun 24", employees: 5500, amount: 64 },
  // { period: "Jul-Sep 24", employees: 5520, amount: 64.5 },
  // { period: "Oct-Dec 24", employees: 5480, amount: 63.8 },

  // { period: "Oct-Dec 24", employees: 7000, amount: 63.8 },
];

// export default RowsPerPage;

const ComplianceDetails = () => {
  const { activeSubSection } = useCompanySection();

  // ✅ ADD THIS EXACT useEffect HERE
  useEffect(() => {
    if (!activeSubSection) return;

    const sectionMap = {
      "Auditors' Remarks": "auditors-remarks",
      CARO: "caro",
      "Goods & Service Tax (GST)": "gst",
      EPFO: "epfo",
      "CSR Credit Rating": "csr",
    };

    const targetId = sectionMap[activeSubSection];
    if (!targetId) return;

    const element = document.getElementById(targetId);
    if (element) {
      scrollToElementWithOffset(element, 140);
    }

  }, [activeSubSection]);

  // ⬇️ keep your states AFTER this
  const [rowsOpen, setRowsOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const params = useParams();
  const companySlug = params?.name;

  const [auditorsRemarksStandaloneAPI, setAuditorsRemarksStandaloneAPI] = useState(null);
  const [auditorsRemarksConsolidatedAPI, setAuditorsRemarksConsolidatedAPI] = useState(null);

  const [activeGstParams, setActiveGstParams] = useState({ page: 1, size: 10 });
  const [inactiveGstParams, setInactiveGstParams] = useState({ page: 1, size: 10 });
  const [gstData, setGstData] = useState(null);
  const [loadingActiveGst, setLoadingActiveGst] = useState(false);
  const [loadingInactiveGst, setLoadingInactiveGst] = useState(false);

  useEffect(() => {
    if (!companySlug) return;
    const fetchGstData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `https://cpkycapi.webninjaz.com/api/company/${companySlug}/compliance-details/gst?active_page=${activeGstParams.page}&active_size=${activeGstParams.size}&inactive_page=${inactiveGstParams.page}&inactive_size=${inactiveGstParams.size}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );
        const data = await res.json();
        setGstData(data);
      } catch (err) {
        console.error("Failed to fetch GST data:", err);
      } finally {
        setLoadingActiveGst(false);
        setLoadingInactiveGst(false);
      }
    };
    fetchGstData();
  }, [companySlug, activeGstParams.page, activeGstParams.size, inactiveGstParams.page, inactiveGstParams.size]);

  useEffect(() => {
    if (!companySlug) return;
    const fetchAuditorRemarks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`https://cpkycapi.webninjaz.com/api/company/${companySlug}/compliance-details/auditors-remark`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        const data = await res.json();
        
        if (data.auditors_remarks_standalone_table) {
           setAuditorsRemarksStandaloneAPI(data.auditors_remarks_standalone_table);
        }
        if (data.auditors_remarks_consolidated_table) {
           setAuditorsRemarksConsolidatedAPI(data.auditors_remarks_consolidated_table);
        }
      } catch (err) {
        console.error("Failed to fetch auditor remarks:", err);
      }
    };
    fetchAuditorRemarks();
  }, [companySlug]);


  const [agency, setAgency] = useState("CRISIL");
  const [selectedDate, setSelectedDate] = useState("2023-11-24");

  const gstTablesConfig = [
    {
      id: "active-gst",
      isInactive: false,
      title: gstData?.active_gst_table?.table_title || "Active Gst",
      data: gstData?.active_gst_table,
      params: activeGstParams,
      loading: loadingActiveGst,
      onSizeChange: (val) => { setLoadingActiveGst(true); setActiveGstParams(p => ({ ...p, size: val, page: 1 })); },
      onPageChange: (val) => { setLoadingActiveGst(true); setActiveGstParams(p => ({ ...p, page: val })); },
      fallbackRows: activeGstTable
    },
    {
      id: "inactive-gst",
      isInactive: true,
      title: gstData?.inactive_gst_table?.table_title || "Inactive Gst",
      data: gstData?.inactive_gst_table,
      params: inactiveGstParams,
      loading: loadingInactiveGst,
      onSizeChange: (val) => { setLoadingInactiveGst(true); setInactiveGstParams(p => ({ ...p, size: val, page: 1 })); },
      onPageChange: (val) => { setLoadingInactiveGst(true); setInactiveGstParams(p => ({ ...p, page: val })); },
      fallbackRows: inactiveGstTable
    }
  ];

  const complianceTableSections3 = [
    {
      id: "active-stablishment",
      label: "Active Establishment",
    },
    {
      id: "inactive-establishment",
      label: "Inactive Establishment",
    },
  ];
  const sectionRefs = React.useRef({});

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Compliance Details</h2>
          <div className={styles.sourceRow}>
            <span className={styles.sourceLabel}>Source:</span>
            <span className={styles.sourceValue}>MCA</span>
            <span className={styles.divider}></span>
            <span className={styles.updatedText}>
              <span> Last Updated:</span>
              {formatDateToIST("-")}
            </span>
          </div>
        </div>
        {/* Auditors' Remarks Standalone table */}
        <div id="auditors-remarks" className={styles.tableSection}>
          {" "}
          <h6
            className={styles.tableTitle}
          >{auditorsRemarksStandaloneAPI?.table_title || `Auditors' Remarks Standalone`}</h6>
          <div className={styles.tableContainer}>
            <table className={styles.litigationTable}>
              <thead>
                <tr>
                  <th className={styles.firstCol}>Financial Year</th>
                  {auditorsRemarksStandaloneAPI?.financial_year_columns?.map((col, i) => (
                    <th key={i}>{col.label}</th>
                  ))}
                  {!auditorsRemarksStandaloneAPI && auditorsRemarksStandalone.years.map((year) => (
                    <th key={year}>{year}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {auditorsRemarksStandaloneAPI ? (
                  auditorsRemarksStandaloneAPI.rows?.map((row, idx) => (
                    <tr key={idx}>
                      <td className={styles.firstCol}>{row.row_label}</td>
                      {auditorsRemarksStandaloneAPI.financial_year_columns?.map((col, i) => {
                        const cell = row.financial_year_cells?.[col.key];
                        return (
                          <td key={i}>{cell?.value || "-"}</td>
                        );
                      })}
                    </tr>
                  ))
                ) : (
                  auditorsRemarksStandalone.rows.map((row, idx) => (
                    <tr key={idx}>
                      <td className={styles.firstCol}>{row.label}</td>
                      {row.values.map((val, i) => (
                        <td key={i}>{val}</td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Auditors' Remarks Consolidated table */}
        <div className={styles.tableSection}>
          {" "}
          <h6
            className={styles.tableTitle}
          >{auditorsRemarksConsolidatedAPI?.table_title || `Auditors' Remarks Consolidated`}</h6>
          <div className={styles.tableContainer}>
            <table className={styles.litigationTable}>
              <thead>
                <tr>
                  <th className={styles.firstCol}>Financial Year</th>
                  {auditorsRemarksConsolidatedAPI?.financial_year_columns?.map((col, i) => (
                    <th key={i}>{col.label}</th>
                  ))}
                  {!auditorsRemarksConsolidatedAPI && auditorsRemarksStandalone.years.map((year) => (
                    <th key={year}>{year}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {auditorsRemarksConsolidatedAPI ? (
                  auditorsRemarksConsolidatedAPI.rows?.map((row, idx) => (
                    <tr key={idx}>
                      <td className={styles.firstCol}>{row.row_label}</td>
                      {auditorsRemarksConsolidatedAPI.financial_year_columns?.map((col, i) => {
                        const cell = row.financial_year_cells?.[col.key];
                        return (
                          <td key={i}>{cell?.value || "-"}</td>
                        );
                      })}
                    </tr>
                  ))
                ) : (
                  auditorsRemarksStandalone.rows.map((row, idx) => (
                    <tr key={idx}>
                      <td className={styles.firstCol}>{row.label}</td>
                      {row.values.map((val, i) => (
                        <td key={i}>{val}</td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* CARO Standalone table*/}
        <div id="caro" className={styles.tableSection}>
          {" "}
          <h6 className={styles.tableTitle}>{`CARO Standalone`}</h6>
          <div className={styles.tableContainer}>
            <table className={styles.litigationTable}>
              <thead>
                <tr>
                  <th className={styles.firstCol}>Financial Year</th>
                  {auditorsRemarksStandalone.years.map((year) => (
                    <th key={year}>{year}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {auditorsRemarksStandalone.rows.map((row, idx) => (
                  <tr key={idx}>
                    <td className={styles.firstCol}>{row.label}</td>
                    {row.values.map((val, i) => (
                      <td key={i}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CARO Consolidated table*/}
        <div className={styles.tableSection}>
          {" "}
          <h6 className={styles.tableTitle}>{`CARO Consolidated`}</h6>
          <div className={styles.tableContainer}>
            <table className={styles.litigationTable}>
              <thead>
                <tr>
                  <th className={styles.firstCol}>Financial Year</th>
                  {auditorsRemarksStandalone.years.map((year) => (
                    <th key={year}>{year}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {auditorsRemarksStandalone.rows.map((row, idx) => (
                  <tr key={idx}>
                    <td className={styles.firstCol}>{row.label}</td>
                    {row.values.map((val, i) => (
                      <td key={i}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* KPI SECTION */}
        <div id="gst" className={styles.kpiSectionContainer}>
          <h6 className={styles.tableTitle}>{gstData?.gstin_details_cards_section?.section_title || `Gstin Details`}</h6>
          <div className={styles.kpiSection}>
            {gstData?.gstin_details_cards_section ? (
              gstData.gstin_details_cards_section.cards.map((kpi, idx) => {
                 const variant = idx === 0 ? "blue" : idx === 1 ? "red" : "purple";
                 return (
                  <div key={idx} className={`${styles.kpiCard} ${styles[variant]}`}>
                    <span className={styles.kpiLabel}>{kpi.label}</span>
                    <span className={styles.kpiValue}>{kpi.count}</span>
                  </div>
                 )
              })
            ) : (
              complianceKpis.map((kpi, idx) => (
                <div key={idx} className={`${styles.kpiCard} ${styles[kpi.variant]}`}>
                  <span className={styles.kpiLabel}>{kpi.label}</span>
                  <span className={styles.kpiValue}>{kpi.value}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {gstTablesConfig.map((section, index) => {
          const rowsToRender = section.data?.rows || section.fallbackRows;
          const totalRows = section.data?.total || section.fallbackRows.length;
          const showingStart = totalRows > 0 ? (section.params.page - 1) * section.params.size + 1 : 0;
          const showingEnd = Math.min(section.params.page * section.params.size, totalRows);

          return (
            <div
              key={section.id}
              id={section.id}
              ref={(el) => (sectionRefs.current[section.id] = el)}
              className={styles.tableSection}
              style={{ position: 'relative' }}
            >
              <h6 className={styles.tableTitle}>{section.title}</h6>
              <div className={styles.tableContainer}>
                {section.loading && (
                  <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255,255,255,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10 }}>
                    Loading...
                  </div>
                )}
                <table className={styles.litigationTable}>
                  <thead>
                    <tr>
                      <th>GSTIN</th>
                      <th>State</th>
                      <th>Last Filing</th>
                      <th>Due Date</th>
                      <th>Delay in 12 Months</th>
                      <th className={styles.statusCol}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rowsToRender.map((row, idx) => (
                      <tr key={idx}>
                        <td className={styles.caseNumber}>{row.gstin}</td>
                        <td>{row.state}</td>
                        {/* Handle both API snake_case and dummy camelCase fields */}
                        <td>{row.last_filing || row.lastFiling}</td>
                        <td>{row.due_date || row.dueDate}</td>
                        <td>{row.delay_in_12_months || row.delay}</td>
                        <td className={styles.statusCol}>
                          <span
                            className={`${styles.statusPill} ${
                              row.status === "Active"
                                ? styles.statusActive
                                : styles.inactiveNormalText
                            }`}
                          >
                            <span className={styles.statusText}>
                              {row.status}
                            </span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={styles.tableFooter}>
                <span className={styles.entriesInfo}>
                  Showing {showingStart}–{showingEnd} of {totalRows}
                </span>

                <div className={styles.pagination}>
                  <div className={styles.rowsPerpage}>
                    <span>Rows per page</span>
                    <RowsPerPage
                      value={section.params.size}
                      onChange={section.onSizeChange}
                    />
                  </div>
                  <CustomPagination
                    page={section.params.page}
                    size={section.params.size}
                    total={totalRows}
                    onPageChange={section.onPageChange}
                  />
                </div>
              </div>
            </div>
          );
        })}

        {/* EPFO graph */}
        <div id="epfo" className={styles.epfoGrapgAndTitleContainer}>
          <h6 className={styles.tableTitle}>{`EPFO Summary`}</h6>

          <div className={styles.epfoGraphContainer}>
            <EpfoSummaryChart epfoSummaryData={epfoSummaryGraphData} />
          </div>
        </div>

        {/* EPFO Year-wise Summary Table */}
        <div className={styles.tableSection}>
          {/* <h6 className={styles.tableTitle}>{`EPFO Year-wise Summary`}</h6> */}

          <div className={styles.tableContainer}>
            <table className={styles.litigationTable}>
              <thead>
                <tr>
                  <th className={styles.financialYearHead}>Financial Year</th>
                  <th>Number of Employees</th>
                  <th>PF Contribution</th>
                  <th>Entity with Delay</th>
                </tr>
              </thead>

              <tbody>
                {epfoYearlyTableData.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.year}</td>
                    <td>{row.employees}</td>
                    <td>{row.contribution}</td>
                    <td
                      style={{
                        color: row.delay > 0 ? "#EF4444" : "inherit",
                        fontWeight: row.delay > 0 ? 500 : 400,
                      }}
                    >
                      {row.delay}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {complianceTableSections3.map((section, index) => (
          <div
            key={section.id}
            id={section.id}
            ref={(el) => (sectionRefs.current[section.id] = el)}
            className={styles.tableSection}
          >
            <h6 className={styles.tableTitle}>{section.label}</h6>

            {/* table + footer here */}

            <div className={styles.tableContainer}>
              <table className={styles.litigationTable}>
                <thead>
                  <tr>
                    <th>Establishment Code </th>
                    <th>State</th>
                    <th>Last Filing</th>
                    <th>Due Date</th>
                    <th>Delay in 12 Months</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {(section.id === "active-gst" ||
                  section.id === "active-stablishment"
                    ? activeEstablishmentTable
                    : inactiveEstablishmentTable
                  ).map((row, idx) => (
                    <tr key={idx}>
                      <td className={styles.caseNumber}>{row.gstin}</td>
                      <td>{row.state}</td>
                      <td>{row.lastFiling}</td>
                      <td>{row.dueDate}</td>
                      <td>{row.delay}</td>
                      <td>
                        <span
                          className={`${styles.statusPill} ${
                            row.status === "Active"
                              ? styles.statusActive
                              : styles.statusInactive
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Footer */}
            <div className={styles.tableFooter}>
              <span className={styles.entriesInfo}>Showing 1–10 of 20</span>

              <div className={styles.pagination}>
                <div className={styles.rowsPerpage}>
                  <span>Rows per page</span>

                  <RowsPerPage
                    forceUp={index === complianceTableSections3.length - 1}
                    value={rowsPerPage}
                    onChange={setRowsPerPage}
                  />
                </div>
                <div className={styles.controls}>
                  <span className={styles.pageInfo}>Page 1 of 10</span>

                  <div className={styles.pageControls}>
                    <button disabled>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.33333 11.3346L4 8.0013L7.33333 4.66797M12 11.3346L8.66667 8.0013L12 4.66797"
                          stroke="#041E42"
                          strokeLinecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                    <button>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 12L6 8L10 4"
                          stroke="#041E42"
                          strokeLinecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                    <button>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 12L10 8L6 4"
                          stroke="#041E42"
                          strokeLinecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                    <button>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 11.3346L7.33333 8.0013L4 4.66797M8.66667 11.3346L12 8.0013L8.66667 4.66797"
                          stroke="#041E42"
                          strokeLinecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* CSR Details */}

        <div id="csr" className={styles.epfoGrapgAndTitleContainer}>
          <h6 className={styles.tableTitle}>{`CSR Details`}</h6>

          <div className={styles.csrChartsGrid}>
            <CSRYearlyBarChart
              data={defaultYearWiseData}
              styles={styles}
              title="CSR amounts spent by organization for specific financial years."
            />

            <CSRSectorDonutChart
              data={defaultSectorWiseData}
              styles={styles}
              title="CSR amounts spent by organization for specific sectors."
            />
          </div>
        </div>

        {/* Financial year 2021-22 table */}
        <div className={styles.tableSection}>
          <h6 className={styles.tableTitle}>{`Financial year 2021-22`}</h6>

          <div className={styles.tableContainer}>
            <table className={styles.litigationTable}>
              <thead>
                <tr>
                  <th>State</th>
                  <th>Sector</th>
                  <th>CSR Project</th>
                  <th>Amount Spent</th>
                  <th>Qutlay</th>
                </tr>
              </thead>

              <tbody>
                {csrDetails2021_22.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.state}</td>
                    <td className={styles.ellipsis}>{row.sector}</td>
                    <td className={styles.ellipsis}>{row.project}</td>
                    <td>{row.amountSpent}</td>
                    <td>{row.outlay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Credit Rating section */}
        <div className={styles.tableSection}>
          {/* Header */}
          <div className={styles.creditHeader}>
            <h6 className={styles.tableTitle}>Credit Rating</h6>

            {/* Toggle tabs */}
            <div className={styles.togglletabs}>
              <button
                className={`${styles.toggleTab} ${
                  agency === "CRISIL" ? styles.activeTab : ""
                }`}
                onClick={() => setAgency("CRISIL")}
              >
                CRISIL
              </button>
              <button
                className={`${styles.toggleTab} ${
                  agency === "ICRA" ? styles.activeTab : ""
                }`}
                onClick={() => setAgency("ICRA")}
              >
                ICRA
              </button>
            </div>
          </div>

          {/* Date tabs */}
          <div className={styles.dateTabs}>
            {creditRatingDates.map((date) => (
              <button
                key={date}
                className={`${styles.dateTab} ${
                  selectedDate === date ? styles.activeDateTab : ""
                }`}
                onClick={() => setSelectedDate(date)}
              >
                {date}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className={styles.tableContainer}>
            <table className={styles.litigationTable}>
              <thead>
                <tr>
                  <th>Category/ Sub-Category/ Tenor</th>
                  <th>Amount (Rs.crore)</th>
                  <th>Rating (Outlook)</th>
                  <th>Rating Action</th>
                </tr>
              </thead>

              <tbody>
                {creditRatings?.[agency]?.[selectedDate]?.map((row, idx) => (
                  <tr key={idx}>
                    <td className={styles.ellipsis}>{row.category}</td>
                    <td>{row.amount}</td>
                    <td>{row.rating}</td>
                    <td>{row.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceDetails;
