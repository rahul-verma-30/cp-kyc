import { Check, ChevronRight, FileText, Paperclip } from "lucide-react";
import styles from "./Documents.module.css";
import { useState } from "react";

const dummyDocs = [
  {
    id: 1,
    title: "Annual Return",
    formType: "Form MGT-7",
    date: "30 Sep 2024",
    files: [
      "MGT-7_Annual_Return_FY2023-24.pdf",
      "MGT-7_Annual_Return_FY2022-23.pdf",
      "MGT-7_Annual_Return_FY2021-22.pdf",
    ],
  },
  {
    id: 2,
    title: "Financial Statement",
    formType: "Form AOC-4 (XBRL)",
    date: "30 Sep 2024",
    files: [
      "MGT-7_Annual_Return_FY2023-24.pdf",
      "MGT-7_Annual_Return_FY2022-23.pdf",
      "MGT-7_Annual_Return_FY2021-22.pdf",
    ],
  },
  {
    id: 3,
    title: "CSR Report",
    formType: "Form CSR-2",
    date: "30 Sep 2024",
    files: [],
  },
  {
    id: 4,
    title: "Director Appointment - Rajesh Kumar",
    formType: "Form DIR-12",
    date: "30 Sep 2024",
    files: [],
  },
  {
    id: 5,
    title: "Charge Modification",
    formType: "Form CHG-4",
    date: "30 Sep 2024",
    files: [
      "MGT-7_Annual_Return_FY2023-24.pdf",
      "MGT-7_Annual_Return_FY2022-23.pdf",
      "MGT-7_Annual_Return_FY2021-22.pdf",
    ],
  },
  {
    id: 6,
    title: "Annual Return",
    formType: "Form MTG-7",
    date: "30 Sep 2024",
    files: [
      "MGT-7_Annual_Return_FY2023-24.pdf",
      "MGT-7_Annual_Return_FY2022-23.pdf",
      "MGT-7_Annual_Return_FY2021-22.pdf",
    ],
  },
  {
    id: 6,
    title: "Financial Statement",
    formType: "Form AOC-4 (XBRL)",
    date: "30 Sep 2024",
    files: [],
  },
  {
    id: 7,
    title: "Certificate of Incorporation",
    formType: "Incorporation Certificate",
    date: "30 Sep 2024",
    files: [],
  },
  {
    id: 8,
    title: "Memorandum of Association",
    formType: "Incorporation Certificate",
    date: "30 Sep 2024",
    files: [],
  },
  {
    id: 9,
    title: "Director Appointment - Rajesh Kumar",
    formType: "Form DIR-12",
    date: "30 Sep 2024",
    files: [],
  },
  {
    id: 10,
    title: "Director Appointment - Rajesh Kumar",
    formType: "Form DIR-12",
    date: "30 Sep 2024",
    files: [],
  },
  {
    id: 11,
    title: "Director Appointment - Rajesh Kumar",
    formType: "Form DIR-12",
    date: "30 Sep 2024",
    files: [],
  },
];
const DocumentsTable = () => {
  const [openRow, setOpenRow] = useState(null);

  return (
    <div className={styles.docsTable}>
      {/* Header */}
      <div className={styles.docsHeader}>
        <span>Document Name</span>
        <span>Form Type</span>
        <span>Filing Date</span>
      </div>

      {/* Rows */}
      {dummyDocs.map((doc) => {
        const isOpen = openRow === doc.id;

        return (
          <div key={doc.id} className={styles.docsGroup}>
            {/* Parent Row */}
            <div
              className={`${styles.docsRow} `}
              onClick={() => setOpenRow(isOpen ? null : doc.id)}
            >
              <div className={styles.docName}>
                {doc.files.length > 0 ? (
                  <ChevronRight
                    size={16}
                    className={`${styles.chevronRow} ${
                      isOpen ? styles.rotate : ""
                    }`}
                  />
                ) : (
                  <div className={styles.invisible}></div>
                )}
                <FileText size={20} color="#3B82F6" />
                <span>{doc.title}</span>
              </div>

              <span className={styles.muted}>{doc.formType}</span>
              <span className={styles.muted}>{doc.date}</span>
            </div>

            {/* Expandable Section */}
            <div
              className={`${styles.expandWrapper} ${
                isOpen ? styles.expandOpen : ""
              }`}
            >
              {doc.files.map((file, idx) => (
                <div
                  key={file}
                  className={`${styles.subRow} ${idx === 0 ? styles.subRowFirst : ""} ${idx === doc.files.length - 1 ? styles.subRowLast : ""}`}
                >
                  <Paperclip size={20} color="#2563EB" />
                  <a href="#" className={styles.fileLink}>
                    {file}
                  </a>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Documents = () => {
  const [openCategory, setOpenCategory] = useState(true);
  const [openYear, setOpenYear] = useState(true);

  const categories = [
    "Annual Returns and Balance Sheet Forms",
    "Annual Returns and Balance Sheet Forms (Attachments)",
    "Certificates",
    "Change in Directors",
    "Charge Documents",
    "Incorporation Documents",
    "Other Attachments",
    "Other eForm Documents",
  ];

  const years = [
    2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014,
  ];

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Documents</h2>
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

        <div className={styles.contentContainer}>
          {/* FILTER SIDEBAR */}
          <aside className={styles.sideBar}>
            <div className={styles.filterHeader}>
              <span className={styles.filterTitle}>Filters</span>
              <button className={styles.clearBtn}>Clear</button>
            </div>
            <div className={styles.seperator} />
            {/* CATEGORY */}

            <div className={styles.filterBlock}>
              <div
                className={styles.filterBlockHeader}
                onClick={() => setOpenCategory(!openCategory)}
              >
                <span>Category</span>
                <span
                  className={`${styles.chevron} ${openCategory ? styles.open : ""}`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 12.5L10 7.5L5 12.5"
                      stroke="#041E42"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </div>

              {openCategory && (
                <div className={styles.filterOptions}>
                  {categories.map((item) => (
                    <label key={item} className={styles.checkboxRow}>
                      <input type="checkbox" className={styles.checkboxInput} />
                      <span className={styles.customCheckbox}>
                        <Check className={styles.checkIcon} />
                      </span>

                      <span className={styles.checkboxLabel}>{item}</span>
                      <span className={styles.countBadge}>16</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            <div className={styles.seperator} />
            {/* YEAR */}
            <div className={styles.filterBlock}>
              <div
                className={styles.filterBlockHeader}
                onClick={() => setOpenYear(!openYear)}
              >
                <span>Year</span>

                <span
                  className={`${styles.chevron} ${openYear ? styles.open : ""}`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 12.5L10 7.5L5 12.5"
                      stroke="#041E42"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </div>

              {openYear && (
                <div className={styles.filterOptions}>
                  {years.map((year) => (
                    <label
                      key={year}
                      className={`${styles.checkboxRow} ${styles.checkboxRowCenter}`}
                    >
                      <input type="checkbox" className={styles.checkboxInput} />
                      <span className={styles.customCheckbox}>
                        <Check className={styles.checkIcon} />
                      </span>

                      <span className={styles.checkboxLabel}>{year}</span>
                      {/* <span className={styles.countBadge}>16</span> */}
                    </label>
                  ))}
                </div>
              )}
            </div>
            <div className={styles.seperator} />
          </aside>

          {/* DOCUMENT LIST */}
          <div className={styles.documentsSectionContainer}>
            <div className={styles.docTitle}>
              <h4>Documents</h4>
              <p>
                Given below are a list of documents related to the company
                obtained from the MCA portal.
              </p>
            </div>
            <div className={styles.searchContainer}>
              <div className={styles.searchInputWrapper}>
                <svg
                  className={styles.searchIcon}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <input
                  type="text"
                  placeholder="Search documents"
                  className={styles.searchInput}
                />
              </div>

              <button className={styles.loadMoreBtn}>
                Load More
                <ChevronRight size={15} />
              </button>
            </div>

            <div>
              <DocumentsTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
