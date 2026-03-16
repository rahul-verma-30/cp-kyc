import styles from "./DirectorProfile.module.css";
import { useState } from "react";

export default function DirectorProfile({ directors = [], hideSidebar = false }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const [activeTab, setActiveTab] = useState("current");
  const [directorTab, setDirectorTab] = useState("current");




  // Filter directors based on tab (current/past) and search
  const filteredDirectors = directors.filter((director) => {
    // Based on your API data, all directors have "Inactive" status
    // So we'll show all directors in both tabs for now
    const matchesTab = true; // Show all directors regardless of tab

    const matchesSearch = searchTerm === "" ||
      director.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      director.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      director.din_pan.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = activeFilter === "All" ||
      director.designation.toLowerCase().includes(activeFilter.toLowerCase());

    return matchesTab && matchesSearch && matchesFilter;
  });

  const sidebarItems = filteredDirectors.map((director) => ({
    name: director.name,
    role: director.designation,
    din: director.din_pan,
    image: director.details.profile_image,
    status: director.status,
    category: director.category,
    appointment_date: director.appointment_date,
    cessation_date: director.cessation_date,
    is_kmp: director.is_kmp,
    details: director.details
  }));

  // Get current selected director
  const selectedDirector = sidebarItems[activeIndex] || sidebarItems[0] || {};

  // Helper to detect and style status/pills
  const renderCellContent = (value) => {
    if (typeof value !== "string") return value;

    const lowerVal = value.toLowerCase();

    if (lowerVal === "high") {
      return (
        <span className={`${styles.pill} ${styles.highSeverity}`}>
          <span className={styles.dotRed} /> High
        </span>
      );
    }
    if (
      ["resolved", "clear", "not a pep", "not a wilful defaulter"].includes(
        lowerVal,
      )
    ) {
      return (
        <span className={`${styles.pill} ${styles.greenPill}`}>{value}</span>
      );
    }
    if (lowerVal === "low") {
      return (
        <span className={`${styles.pill} ${styles.lowRiskPill}`}>
          <span className={styles.dotAmber} /> Low
        </span>
      );
    }

    return value;
  };

  // Example Dynamic Data Array
  const regulatoryData = [
    {
      tableKey: "negativeMedia",
      title: "Negative / Adverse Media",
      headers: ["Source", "Description", "Severity", "Date"],
      rows: [
        {
          source: "Economic Times",
          desc: "Named in regulatory inquiry regarding related party transactions",
          sev: "High",
          date: "15 Mar 2024",
        },
      ],
    },
    {
      tableKey: "bankingDefault",
      title: "Banking / Default Declaration",
      headers: ["Default Type", "Declaration Status", "Remarks"],
      rows: [
        {
          type: "Wilful Defaulter",
          status: "Not a Wilful Defaulter",
          remarks: "15 Mar 2024",
        },
      ],
    },
    {
      tableKey: "regulatoryHistory",
      title: "Regulatory / Compliance History",
      headers: ["Regulator", "Nature of Action", "Period", "Status"],
      rows: [
        {
          reg: "SEBI",
          nature: "Show-cause notice",
          period: "Q2 2023",
          status: "Resolved",
        },
      ],
    },
    {
      tableKey: "pepSanctions",
      title: "PEP & Sanctions Check",
      headers: ["Check Type", "Status", "Remarks"],
      rows: [
        {
          type: "PEP Check",
          status: "Not a PEP",
          remarks: "Verified against government databases",
        },
        {
          type: "Sanctions Check",
          status: "Clear",
          remarks: "No matches in OFAC, UN, EU sanctions lists",
        },
      ],
    },
    {
      tableKey: "riskEDD",
      title: "Risk & EDD (Individual)",
      headers: [
        "Risk Category",
        "EDD Required",
        "Key Risk Drivers",
        "Last Reviewed",
      ],
      rows: [
        {
          cat: "Low",
          edd: "No",
          drivers: "Clean regulatory record, no adverse findings",
          date: "05 Jan 2026",
        },
      ],
    },
  ];

  const filters = [
    "All",
    "Director",
    "Whole-time director",
    "CFO",
    "CEO",
    "Company Secretary",
    "Managing Director"
  ];

  return (
    <div className={styles.container}>
      {!hideSidebar && (
        <div className={styles.containerHeader}>
          <div className={styles.sidebarTabs}>
            <div
              className={`${styles.sidebarTab} ${directorTab === "current" ? styles.sidebarTabActive : ""
                }`}
              onClick={() => setDirectorTab("current")}
            >
              Current Directors & KMP
            </div>

            <div
              className={`${styles.sidebarTab} ${directorTab === "past" ? styles.sidebarTabActive : ""
                }`}
              onClick={() => setDirectorTab("past")}
            >
              Past Directors & KMP
            </div>
          </div>
        </div>
      )}

      <div className={styles.mainContainer}>
        {!hideSidebar && (
          <aside className={styles.sidebar}>
            <div className={styles.searchWrapper}>
              <img
                src="/icons/search.svg"
                alt="thumb"
                className={styles.searchImg}
              />
              <input
                type="text"
                placeholder="Search by name, role, or DIN"
                className={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Tags */}
            <div className={styles.filterContainer}>
              {filters.map((filter) => (
                <div
                  key={filter}
                  className={`${styles.filterTag} ${activeFilter === filter ? styles.activeFilter : ""
                    }`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </div>
              ))}
            </div>

            <div className={styles.sidebarList}>
              {sidebarItems.map((item, idx) => (
                <div
                  key={idx}
                  className={`${styles.sidebarItem} ${activeIndex === idx ? styles.active : ""
                    }`}
                  onClick={() => setActiveIndex(idx)}
                >

                  {/* IMAGES FOR THE SIDEBAR */}
                  <img
                    src={(item.image && item.image !== "N/A") ? item.image : "/icons/profile-icon.svg"}
                    alt="profile"
                    className={styles.sidebarImg}
                  />

                  <div className={styles.sidebarInfo}>
                    <span className={styles.sidebarName}>{item.name}</span>
                    <span className={styles.sidebarRole}>{item.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        )}

        {/* MAIN CONTENT */}
        <main className={`${styles.main} ${hideSidebar ? styles.fullWidth : ""}`}>
          {/* PROFILE HEADER */}
          <section className={styles.headerCard}>
            <div className={styles.headerLeft}>

              <img
                src={
                  selectedDirector.details?.profile_image &&
                    selectedDirector.details.profile_image !== "N/A"
                    ? selectedDirector.details.profile_image
                    : "/icons/profile-icon.svg"
                }
                alt="profile"
                className={styles.profilePic}
              />
              <div className={styles.profileTitle}>
                <div className={styles.profileTitleWrapper}>
                  <h1>{selectedDirector.name || 'Select a Director'}</h1>
                  <img src="/images/linkedln.svg" alt="linkedln" />

                  {/* PROFILE IMAGE FOR MAIN SECTIION
                  {selectedDirector.details?.profile_image && (
                    <img src={selectedDirector.details?.profile_image || "/icons/dabur-logo.svg"} alt="profile" />
                  )} */}
                </div>
                <div className={styles.profileSubtitle}>
                  <span>DIN: {selectedDirector.din || '-'}</span>
                  <span className={styles.grayDot}></span>
                  <span>{selectedDirector.role || '-'}</span>
                </div>
              </div>
            </div>
            <div className={styles.dinStatus}>
              DIN Status : <span className={`${styles.statusTag} ${selectedDirector.details?.din_status === "Active" ? styles.activeTag : styles.inactiveTag}`}>
                {selectedDirector.details?.din_status || '-'}
              </span>
            </div>
          </section>

          {/* PERSONAL INFO GRID */}
          <div className={styles.detailsGrid}>
            <InfoBlock label="DIN" value={selectedDirector.din || '-'} />
            <InfoBlock label="PAN" value={selectedDirector?.details?.pan || '-'} />
            <InfoBlock label="Nationality" value={selectedDirector.details?.nationality || '-'} />
            <InfoBlock label="Date of Birth" value={selectedDirector.details?.dob || '-'} />
            <InfoBlock label="Gender" value={selectedDirector.details?.gender || '-'} />
            <InfoBlock label="Residential Status" value={selectedDirector.details?.residential_status || '-'} />
            <InfoBlock label="Email ID" value={selectedDirector.details?.email || '-'} />
            <InfoBlock label="Mobile Number" value={selectedDirector.details?.mobile || '-'} />
            <InfoBlock label="Type" value={selectedDirector?.category || '-'} />

          </div>

          <div className={styles.addressGrid}>
            <InfoBlock
              label="Current Residential Address"
              value={selectedDirector.details?.current_residential_address || '-'}
            />
            <InfoBlock
              label="Permanent Address"
              value={selectedDirector.details?.permanent_address || '-'}
            />
          </div>

          {/* ROLE & APPOINTMENT */}
          {/* <section className={styles.section}>
            <h2 className={styles.sectionHeading}>
              Role & Appointment Details
            </h2>
            <div className={styles.tableContainer}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>Company/LLP name</th>
                    <th>Designation</th>
                    <th>Appointment Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className={styles.companyRow}>
                        <div className={styles.companyIconWrapper}>
                          <img
                            src="/icons/dabur-logo.svg"
                            className={styles.companyIcon}
                            alt=""
                          />
                        </div>
                        Dabur India Limited
                      </div>
                    </td>
                    <td>Managing Director</td>
                    <td>01-Apr-2015</td>
                    <td>
                      <span className={styles.activeTag}>Active</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section> */}

          {/* OTHER ASSOCIATIONS */}
          <section className={styles.section}>
            <div className={styles.headerArea}>
              <h2 className={styles.sectionHeading}>Other Associations</h2>
              <div className={styles.subTabs}>
                <div
                  className={`${styles.subTab} ${activeTab === "current" ? styles.subTabActive : ""
                    }`}
                  onClick={() => setActiveTab("current")}
                >
                  Current Companies
                </div>

                <div
                  className={`${styles.subTab} ${activeTab === "previous" ? styles.subTabActive : ""
                    }`}
                  onClick={() => setActiveTab("previous")}
                >
                  Previous Companies
                </div>

                <div
                  className={`${styles.subTab} ${activeTab === "shareholding" ? styles.subTabActive : ""
                    }`}
                  onClick={() => setActiveTab("shareholding")}
                >
                  Shareholding
                </div>
              </div>
            </div>

            {activeTab === "current" && (
              <div className={styles.tableContainer}>
                <table className={styles.dataTable}>
                  <thead>
                    <tr>
                      <th>Company/LLP name</th>
                      <th>Designation</th>
                      <th>Type</th>
                      <th>Period</th>
                      <th>Appointment Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedDirector.details?.current_positions?.map((position, idx) => (
                      <AssociationRow
                        key={idx}
                        image={position.company_log}
                        name={position.company_name || "-"}
                        role={position.designation || "-"}
                        type={position.category || "-"}
                        period={position.tenure_years || "-"}
                        date={position.appointment_date || "-"}
                      />
                    ))}
                    {(!selectedDirector.details?.current_positions || selectedDirector.details.current_positions.length === 0) && (
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                          No current positions found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
            {activeTab === "previous" && (
              <div className={styles.tableContainer}>
                <table className={styles.dataTable}>
                  <thead>
                    <tr>
                      <th>Company/LLP name</th>
                      <th>Designation</th>
                      <th>Tenure</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedDirector.details?.past_positions?.map((position, idx) => (
                      <AssociationRow
                        key={idx}
                        image={position.company_log}
                        name={position.company_name || "-"}
                        role={position.designation}
                        date={position?.tenure_years||"-"}
                      />
                    ))}
                    {(!selectedDirector.details?.past_positions || selectedDirector.details.past_positions.length === 0) && (
                      <tr>
                        <td colSpan="3" style={{ textAlign: 'center', padding: '20px' }}>
                          No past positions found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
            {activeTab === "shareholding" && (
              <div className={styles.tableContainer}>
                <table className={styles.dataTable}>
                  <thead>
                    <tr>
                      <th>Company/LLP name</th>
                      <th>Shareholding %</th>
                      <th>Nature</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className={styles.companyRow}>
                          <div className={styles.companyIconWrapper}>
                            <img
                              src="/icons/company-icon.svg"
                              className={styles.companyIcon}
                              alt=""
                            />
                          </div>
                          {/* Dabur India Limited */}
                          -
                        </div>
                      </td>
                      <td>-</td>
                      <td>
                        <span className={styles.promoterTag}>
                          {/* Promoter */}
                          -
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <div className={styles.companyRow}>
                          <div className={styles.companyIconWrapper}>
                            <img
                              src="/icons/company-icon.svg"
                              className={styles.companyIcon}
                              alt=""
                            />
                          </div>
                          {/* Dabur Nepal Pvt. Ltd. */}
                         -
                        </div>
                      </td>
                      <td>-</td>
                      <td>
                        <span className={styles.nonPromoterTag}>
                          {/* Non-Promoter */}
                          -
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* KMP SECTION */}
          {/* <section className={styles.section2}>
            <h2 className={styles.sectionHeading}>KMP-Specific Details</h2>
            <div className={styles.kmpContainer}>
              <div className={styles.kmpItem}>
                <label>KMP Category</label>
                <p>Managing Director</p>
              </div>
              <div className={styles.kmpItem}>
                <label>Present Occupation</label>
                <p>Managing Director</p>
              </div>
              <div className={styles.kmpItem}>
                <label>Role in Organization</label>
                <p>Strategic leadership and overall management</p>
              </div>
              <div className={styles.kmpItem}>
                <label>Reporting To</label>
                <p>Board of Directors</p>
              </div>
              <div className={`${styles.kmpItem} ${styles.kmpFull}`}>
                <label>Key Responsibility</label>
                <p>
                  Overall strategic direction, business expansion, and
                  stakeholder management
                </p>
              </div>
            </div>
          </section> */}

          {/* REGULATORY GROUP HEADER */}
          <div className={styles.regulatoryHeader}>
            Regulatory, Banking & Reputation Check — Individual
          </div>

          {/* DYNAMIC SECTIONS */}
          {regulatoryData.map((section, index) => (
            <section key={index} className={styles.checkContainer}>
              <div className={styles.checkTitle}>{section.title}</div>
              <div className={styles.cardFrame}>
                <table
                  className={`${styles.dataTable} ${styles[section.tableKey] || ""
                    }`}
                >
                  <thead>
                    <tr>
                      {section.headers.map((header) => (
                        <th key={header}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.rows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {Object.values(row).map((cell, cellIndex) => (
                          <td key={cellIndex}>{renderCellContent(cell)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}

          {/* CAREER TIMELINE */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>Career Timeline</h2>
            <div className={styles.timeline}>
              <TimelineItem
                date="2015 - Present"
                name="Dabur India Limited"
                role="Managing Director • 9 years"
                active
              />
              <TimelineItem
                date="2018 - Present"
                name="Aviva Life Insurance Company India Ltd."
                role="Independent Director • 6 years"
                active
              />
              <TimelineItem
                date="2018 - Present"
                name="Dabur Nepal Pvt. Ltd."
                role="Director • 6 years"
                active
              />
              <TimelineItem
                date="2012 - 2019"
                name="Fresenius Kabi Oncology Limited"
                role="Independent Director • 7 years"
              />
              <TimelineItem
                date="2010 - 2015"
                name="H&R Johnson (India) Ltd."
                role="Non-Executive Director • 5 years"
              />
            </div>
          </section>

          {/* QUALIFICATIONS SECTION */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>Qualifications</h2>
            <div className={styles.qualList}>
              <QualificationItem
                icon="/images/placeholder.svg"
                title="Chartered Financial Analyst (CFA)"
                inst="CFA Institute, USA"
                year="1995"
              />
              <QualificationItem
                icon="/images/placeholder.svg"
                title="Master of Business Administration (MBA)"
                inst="Indian Institute of Management, Ahmedabad"
                spec="Finance"
                year="1990 - 1992"
              />
              <QualificationItem
                icon="/images/placeholder.svg"
                title="Bachelor of Commerce (B.Com)"
                inst="Shri Ram College of Commerce, Delhi University"
                spec="Commerce & Accountancy"
                year="1987 - 1990"
              />
              <QualificationItem
                icon="/images/placeholder.svg"
                title="Higher Secondary Certificate (Class XII)"
                inst="Delhi Public School, R.K. Puram, New Delhi"
                spec="Science Stream (PCM)"
                year="1985"
              />
              <QualificationItem
                icon="/images/placeholder.svg"
                title="Secondary School Certificate (Class X)"
                inst="Delhi Public School, R.K. Puram, New Delhi"
                spec="CBSE Board"
                year="1983"
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

/* Helper Components to keep JSX clean */
function QualificationItem({ icon, title, inst, spec, year }) {
  return (
    <div className={styles.qualItem}>
      <div className={styles.qualIconWrapper}>
        <img src={icon} alt="" />
      </div>
      <div className={styles.qualContent}>
        <h3 className={styles.qualTitle}>{title}</h3>
        <p className={styles.qualInst}>{inst}</p>
        {(spec || year) && (
          <div className={styles.qualMeta}>
            {spec && (
              <>
                <span className={styles.qualSpecLabel}>Specialization:</span>
                <span className={styles.specTag}>{spec}</span>
              </>
            )}

          </div>
        )}
        {year && <span className={styles.qualYear}>{year}</span>}
      </div>
    </div>
  );
}

function InfoBlock({ label, value }) {
  return (
    <div className={styles.infoBlock}>
      <label>{label}</label>
      <p>{value}</p>
    </div>
  );
}

function AssociationRow({ name, role, type, period, date,image }) {
  return (
    <tr>
      <td>
        <div className={styles.companyRow}>
          <div className={styles.companyIconWrapper}>
            <img
              src={image || "/icons/company-icon.svg"}
              className={styles.companyIcon}
              alt=""
            />
          </div>

          {name}
        </div>
      </td>
      <td>{role}</td>
      {type && (
        <td>
          <span className={styles.typeTag}>{type}</span>
        </td>
      )}
      {period && <td>{period}</td>}
      <td>{date}</td>
    </tr>
  );
}

function TimelineItem({ date, name, role, active }) {
  return (
    <div className={styles.timelineItem}>
      <div className={styles.timelineDate}>{date}</div>
      <div className={styles.timelineMarker}>
        <div className={styles.timelineDotWrapper}>
          <div
            className={active ? styles.timelineDot : styles.timelineDotInactive}
          ></div>
        </div>

        <div className={styles.timelineLine}></div>
      </div>
      <div className={styles.timelineContent}>
        <div className={styles.timelineName}>{name}</div>
        <div className={styles.timelineRole}>
          <span>{role.split("•")[0].trim()}</span>
          <span className={styles.roleDot}></span>
          <span>{role.split("•")[1]?.trim()}</span>
        </div>
      </div>
      {active && (
        <div className={`${styles.activeTag} ${styles.statusBadge}`}>
          Active
        </div>

      )}

    </div>
  );
}
