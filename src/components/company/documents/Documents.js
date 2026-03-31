import { Check, ChevronRight, FileText, Paperclip, X, AlertCircle } from "lucide-react";
import styles from "./Documents.module.css";
import { useState, useEffect } from "react";
import { formatDateToIST } from "@/utils/dateFormatter";
import Image from "next/image";

const dummyDocs = [
  // {
  //   id: 1,
  //   title: "Annual Return",
  //   formType: "Form MGT-7",
  //   date: "30 Sep 2024",
  //   files: [
  //     "MGT-7_Annual_Return_FY2023-24.pdf",
  //     "MGT-7_Annual_Return_FY2022-23.pdf",
  //     "MGT-7_Annual_Return_FY2021-22.pdf",
  //   ],
  // },
  // {
  //   id: 2,
  //   title: "Financial Statement",
  //   formType: "Form AOC-4 (XBRL)",
  //   date: "30 Sep 2024",
  //   files: [
  //     "MGT-7_Annual_Return_FY2023-24.pdf",
  //     "MGT-7_Annual_Return_FY2022-23.pdf",
  //     "MGT-7_Annual_Return_FY2021-22.pdf",
  //   ],
  // },
  // {
  //   id: 3,
  //   title: "CSR Report",
  //   formType: "Form CSR-2",
  //   date: "30 Sep 2024",
  //   files: [],
  // },
  // {
  //   id: 4,
  //   title: "Director Appointment - Rajesh Kumar",
  //   formType: "Form DIR-12",
  //   date: "30 Sep 2024",
  //   files: [],
  // },
  // {
  //   id: 5,
  //   title: "Charge Modification",
  //   formType: "Form CHG-4",
  //   date: "30 Sep 2024",
  //   files: [
  //     "MGT-7_Annual_Return_FY2023-24.pdf",
  //     "MGT-7_Annual_Return_FY2022-23.pdf",
  //     "MGT-7_Annual_Return_FY2021-22.pdf",
  //   ],
  // },
  // {
  //   id: 6,
  //   title: "Annual Return",
  //   formType: "Form MTG-7",
  //   date: "30 Sep 2024",
  //   files: [
  //     "MGT-7_Annual_Return_FY2023-24.pdf",
  //     "MGT-7_Annual_Return_FY2022-23.pdf",
  //     "MGT-7_Annual_Return_FY2021-22.pdf",
  //   ],
  // },
  // {
  //   id: 6,
  //   title: "Financial Statement",
  //   formType: "Form AOC-4 (XBRL)",
  //   date: "30 Sep 2024",
  //   files: [],
  // },
  // {
  //   id: 7,
  //   title: "Certificate of Incorporation",
  //   formType: "Incorporation Certificate",
  //   date: "30 Sep 2024",
  //   files: [],
  // },
  // {
  //   id: 8,
  //   title: "Memorandum of Association",
  //   formType: "Incorporation Certificate",
  //   date: "30 Sep 2024",
  //   files: [],
  // },
  // {
  //   id: 9,
  //   title: "Director Appointment - Rajesh Kumar",
  //   formType: "Form DIR-12",
  //   date: "30 Sep 2024",
  //   files: [],
  // },
  // {
  //   id: 10,
  //   title: "Director Appointment - Rajesh Kumar",
  //   formType: "Form DIR-12",
  //   date: "30 Sep 2024",
  //   files: [],
  // },
  // {
  //   id: 11,
  //   title: "Director Appointment - Rajesh Kumar",
  //   formType: "Form DIR-12",
  //   date: "30 Sep 2024",
  //   files: [],
  // },
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [timeLeft, setTimeLeft] = useState(900);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    let timer;
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      setTimeLeft(900); // Reset to 15 mins
      timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else {
      document.body.style.overflow = "unset";
      clearInterval(timer);
    }
    return () => {
      document.body.style.overflow = "unset";
      clearInterval(timer);
    };
  }, [isModalOpen]);

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
      setModalStep(1);
    }, 300);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (modalStep === 2) {
      // Temporary logic: transition to Step 3 after 10 seconds
      // This will be removed when actual API polling is added
      const transitionTimer = setTimeout(() => {
        setModalStep(3);
        setIsUnlocked(true);
      }, 10000);
      return () => clearTimeout(transitionTimer);
    }
  }, [modalStep]);

  const categories = [
    "MCA Documents",
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
            <span className={styles.sourceValue}>-</span>
            <span className={styles.divider}></span>
            <span className={styles.updatedText}>
              <span> Last Updated:</span>
              {formatDateToIST("-")}
            </span>
          </div>
        </div>
 
        <div className={styles.premiumBanner}>
          <div className={styles.premiumLeft}>
            <div className={styles.premiumIcon}>
              <Image src="/icons/docLock.svg" alt="Lock" width={24} height={24} />
            </div>
            <div className={styles.premiumInfo}>
              <div className={styles.premiumTitleWrapper}>
                <h3 className={styles.premiumTitle}>MCA Premium Documents</h3>
                <span className={styles.premiumTag}>Premium</span>
              </div>
              <p className={styles.premiumDesc}>
                Access exclusive documents directly from the Ministry of Corporate Affairs including detailed financial statements, complete board minutes, auditor reports with annexures, and more.
              </p>
              <div className={styles.premiumStats}>
                <div className={styles.statItem}>
                  <Image src="/icons/docTick.svg" alt="Tick" width={16} height={16} />
                  <span>24 Premium Documents</span>
                </div>
                <div className={styles.statItem}>
                  <Image src="/icons/docTick.svg" alt="Tick" width={16} height={16} />
                  <span>1 Year Access</span>
                </div>
                <div className={styles.statItem}>
                  <Image src="/icons/docTick.svg" alt="Tick" width={16} height={16} />
                  <span>Verified MCA Source</span>
                </div>
              </div>
            </div>
          </div>
          <button className={styles.unlockBtn} onClick={() => setIsModalOpen(true)}>
            <Image src="/icons/lock.svg" alt="Unlock" width={16} height={16} />
            Unlock Documents
          </button>
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

                      <div className={styles.labelWrapper}>
                        <span className={styles.checkboxLabel}>{item}</span>
                        {item === "MCA Documents" && !isUnlocked && (
                          <Image 
                            src="/icons/goldenlock.svg" 
                            alt="Lock" 
                            width={20} 
                            height={20} 
                            className={styles.categoryLock} 
                          />
                        )}
                      </div>
                      <span className={styles.countBadge}>
                        {item === "MCA Documents" ? "24" : "-"}
                      </span>
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

      {isModalOpen && (
        <div 
          className={`${styles.modalOverlay} ${isClosing ? styles.closing : ""}`} 
          onClick={handleCloseModal}
        >
          <div 
            className={`${styles.modalContainer} ${isClosing ? styles.closing : ""}`} 
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <div className={styles.modalIcon}>
                <Image src="/icons/lockAccess.svg" alt="Access" width={24} height={24} />
              </div>
              <div className={styles.modalTitleArea}>
                <h2 className={styles.modalTitle}>MCA Document Access</h2>
                <p className={styles.modalSubTitle}>Complete payment to view documents</p>
              </div>
              <button className={styles.closeBtn} onClick={handleCloseModal}>
                <X size={20} />
              </button>
            </div>

            <div className={styles.modalBody}>
              {modalStep === 1 ? (
                <>
                  <div className={styles.timerSection}>
                    <div className={styles.timerLeft}>
                      <Image src="/icons/orangeClock.svg" alt="Clock" width={24} height={24} />
                      <div className={styles.timerLabel}>
                        <span>Complete payment within</span>
                        <span>Session will expire after this time</span>
                      </div>
                    </div>
                    <div className={styles.timerValue}>
                      <span>{formatTime(timeLeft)}</span>
                      <span>minutes</span>
                    </div>
                  </div>

                  <div className={styles.detailsGrid}>
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Document Category</span>
                      <span className={styles.detailValue}>MCA Official Documents</span>
                    </div>
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Total Documents</span>
                      <span className={styles.detailValue}>24 Documents</span>
                    </div>
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Access Period</span>
                      <span className={styles.detailValue}>1 Year</span>
                    </div>
                  </div>

                  <div className={styles.instructionsBox}>
                    <div className={styles.instructionIcon}>
                      <Image src="/icons/bluealert.svg" alt="Info" width={20} height={20} />
                    </div>
                    <div className={styles.instructionContent}>
                      <h4 className={styles.instructionTitle}>Payment Instructions</h4>
                      <ul className={styles.instructionList}>
                        <li>You will be redirected to the MCA official payment portal</li>
                        <li>Complete the payment using your preferred payment method</li>
                        <li>Return to this page after successful payment</li>
                        <li>Your documents will be unlocked automatically</li>
                      </ul>
                    </div>
                  </div>
                </>
              ) : modalStep === 2 ? (
                <div className={styles.processingView}>
                  <div className={styles.processingIcon}>
                    <Image src="/icons/blueClock.svg" alt="Processing" width={40} height={40} />
                  </div>
                  <h3 className={styles.processingTitle}>Processing Payment...</h3>
                  <p className={styles.processingSubtitle}>
                    Please complete your payment on the MCA Portal and return to this page
                  </p>
                  <div className={styles.loadingDots}>
                    <span className={styles.dot}></span>
                    <span className={styles.dot}></span>
                    <span className={styles.dot}></span>
                  </div>
                </div>
              ) : (
                <div className={styles.successView}>
                  <div className={styles.successIcon}>
                    <Image src="/icons/greenTick.svg" alt="Success" width={32} height={32} />
                  </div>
                  <h3 className={styles.successTitle}>Payment Successful!</h3>
                  <p className={styles.successSubtitle}>
                    Your MCA documents have been unlocked successfully
                  </p>
                  <div className={styles.accessAlert}>
                    <div className={styles.accessAlertHeader}>
                      <Image src="/icons/greenAlert.svg" alt="Alert" width={24} height={24} />
                      <h4 className={styles.accessAlertTitle}>Access Granted</h4>
                    </div>
                    <p className={styles.accessAlertDesc}>
                      You can now view and download all MCA documents
                    </p>
                  </div>
                </div>
              )}
            </div>

            {modalStep === 1 && (
              <div className={styles.modalFooter}>
                <button className={styles.cancelBtn} onClick={handleCloseModal}>
                  Cancel
                </button>
                <button 
                  className={styles.proceedBtn} 
                  onClick={() => {
                    setModalStep(2);
                    window.open("https://www.mca.gov.in/content/mca/global/en/foportal/fologin.html", "_blank");
                  }}
                >
                  Proceed to Payment
                  <Image src="/icons/paymentgo.svg" alt="Go" width={16} height={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents;
