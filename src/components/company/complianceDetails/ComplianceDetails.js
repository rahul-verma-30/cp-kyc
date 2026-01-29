"use client";

import styles from "./ComplianceDetails.module.css";
import React, { useRef, useEffect, useState } from "react";

import { useCompanySection } from "@/components/company/context/CompanySectionContext";
import { complianceKpis, pendingCasesTable } from "./dummyData";
import { ChevronsDownUp } from "lucide-react";

import { createPortal } from "react-dom";
import { auditorsRemarksStandalone } from "./dummyData";
import { inactiveGstTable } from "./dummyData";
import { activeGstTable } from "./dummyData";
import { inactiveEstablishmentTable } from "./dummyData";
import { activeEstablishmentTable } from "./dummyData";

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

// export default RowsPerPage;

const ComplianceDetails = () => {
  const { setActiveSection } = useCompanySection();
  const [rowsOpen, setRowsOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const complianceTableSections = [
    {
      id: "active-gst",
      label: "Active Gst",
    },
    {
      id: "inactive-gst",
      label: "Inactive Gst",
    },
   
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
    {
      id: null,
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
              30-Dec-2024, 11:45 AM IST
            </span>
          </div>
        </div>
        {/* Auditors' Remarks Standalone table */}
        <div className={styles.tableSection}>
          {" "}
          <h6
            className={styles.tableTitle}
          >{`Auditors' Remarks Standalone`}</h6>
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

        {/* Auditors' Remarks Consolidated table */}
        <div className={styles.tableSection}>
          {" "}
          <h6
            className={styles.tableTitle}
          >{`Auditors' Remarks Consolidated`}</h6>
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

        {/* CARO Standalone table*/}
        <div className={styles.tableSection}>
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
        <div className={styles.kpiSectionContainer}>
          <h6 className={styles.tableTitle}>{`Gstin Details`}</h6>
          <div className={styles.kpiSection}>
            {complianceKpis.map((kpi, idx) => (
              <div
                key={idx}
                className={`${styles.kpiCard} ${styles[kpi.variant]}`}
              >
                <span className={styles.kpiLabel}>{kpi.label}</span>
                <span className={styles.kpiValue}>{kpi.value}</span>
              </div>
            ))}
          </div>
        </div>

        {complianceTableSections.map((section, index) => (
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
                    <th>GSTIN</th>
                    <th>State</th>
                    <th>Last Filing</th>
                    <th>Due Date</th>
                    <th>Delay in 12 Months</th>
                    <th className={styles.statusCol}>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {(section.id === "active-gst"
                    ? activeGstTable
                    : inactiveGstTable
                  ).map((row, idx) => (
                    <tr key={idx}>
                      <td className={styles.caseNumber}>{row.gstin}</td>
                      <td>{row.state}</td>
                      <td>{row.lastFiling}</td>
                      <td>{row.dueDate}</td>
                      <td>{row.delay}</td>
                      <td className={styles.statusCol}>
                        <span
                          className={`${styles.statusPill} ${
                            row.status === "Active"
                              ? styles.statusActive
                              : styles.inactiveNormalText
                          }`}
                        >
                         <span className={styles.statusText}>{row.status}</span>
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
                    forceUp={index === complianceTableSections.length - 1}
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

        {/* EPFO graph */}

        <div className={styles.epfoGrapgAndTitleContainer}>
           <h6
            className={styles.tableTitle}
          >{`EPFO Summary`}</h6>
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
                    forceUp={index === complianceTableSections.length - 1}
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
      </div>
    </div>
  );
};

export default ComplianceDetails;
