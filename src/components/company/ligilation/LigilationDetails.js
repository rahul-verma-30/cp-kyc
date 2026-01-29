"use client";

import React, { useState } from "react";

import styles from "./LigilationDetails.module.css";
import { useCompanySection } from "@/components/company/context/CompanySectionContext";
import { litigationKpis, pendingCasesTable } from "./dummyData";
import { ChevronsDownUp } from "lucide-react";

function RowsPerPage({ value, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.rowsWrapper}>
      <div
        className={styles.pageSizeControl}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
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

      {open && (
        <div className={styles.rowsDropdown}>
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
        </div>
      )}
    </div>
  );
}

const LigilationDetails = () => {
  const { setActiveSection } = useCompanySection();
  const [rowsOpen, setRowsOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const litigationSections = [
    {
      id: "pending-against",
      label: "Pending Cases Filed against Company",
    },
    {
      id: "pending-by",
      label: "Pending Cases Led by Company",
    },
    {
      id: "disposed-against",
      label: "Disposed Cases Led Against Company",
    },
    {
      id: "disposed-by",
      label: "Disposed Cases Led by Company",
    },
  ];
  const sectionRefs = React.useRef({});

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Litigation</h2>
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

        {/* KPI SECTION */}
        <div className={styles.kpiSection}>
          {litigationKpis.map((kpi, idx) => (
            <div
              key={idx}
              className={`${styles.kpiCard} ${styles[kpi.variant]}`}
            >
              <span className={styles.kpiLabel}>{kpi.label}</span>
              <span className={styles.kpiValue}>{kpi.value}</span>
            </div>
          ))}
        </div>

        {litigationSections.map((section) => (
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
                    <th>Case Number</th>
                    <th>Petitioner Name</th>
                    <th>Respondent Name</th>
                    <th>Year</th>
                    <th>Court</th>
                  </tr>
                </thead>

                <tbody>
                  {pendingCasesTable.map((row, idx) => (
                    <tr key={idx}>
                      <td className={styles.caseNumber}>{row.caseNumber}</td>
                      <td className={styles.ellipsis}>{row.petitioner}</td>
                      <td className={styles.ellipsis}>{row.respondent}</td>
                      <td className={styles.yearCell}>{row.year}</td>
                      <td className={styles.courtCell}>{row.court}</td>
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

                  <RowsPerPage value={rowsPerPage} onChange={setRowsPerPage} />
                </div>
                <div className={styles.controls}>
                  <span className={styles.pageInfo}>Page 1 of 10</span>

                  <div className={styles.pageControls}>
                    <button>
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

export default LigilationDetails;
