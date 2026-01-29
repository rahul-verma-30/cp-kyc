import styles from "./DirectorProfile.module.css";
import { useState } from "react";

export default function DirectorProfile() {
  const sidebarItems = Array(9).fill({
    name: "Saket Burman",
    role: "Director",
  });

  const [activeTab, setActiveTab] = useState("current");
  const [directorTab, setDirectorTab] = useState("current");


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
      title: "Negative / Adverse Media",
      headers: ["Source", "Description", "Severity", "Date"],
      rows: [
        {
          source: "Economic Times",
          desc: "Named in regulatory inquiry...",
          sev: "High",
          date: "15 Mar 2024",
        },
      ],
    },
    {
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
          drivers: "Clean regulatory record...",
          date: "05 Jan 2026",
        },
      ],
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.containerHeader}>
        <div className={styles.sidebarTabs}>
          <div
            className={`${styles.sidebarTab} ${
              directorTab === "current" ? styles.sidebarTabActive : ""
            }`}
            onClick={() => setDirectorTab("current")}
          >
            Current Directors & KMP
          </div>

          <div
            className={`${styles.sidebarTab} ${
              directorTab === "past" ? styles.sidebarTabActive : ""
            }`}
            onClick={() => setDirectorTab("past")}
          >
            Past Directors & KMP
          </div>
        </div>
      </div>

      <div className={styles.mainContainer}>
        {/* LEFT SIDEBAR */}
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
            />
          </div>
          <div className={styles.sidebarList}>
            {sidebarItems.map((item, idx) => (
              <div key={idx} className={styles.sidebarItem}>
                <img
                  src="/images/owner.svg"
                  alt="thumb"
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

        {/* MAIN CONTENT */}
        <main className={styles.main}>
          {/* PROFILE HEADER */}
          <section className={styles.headerCard}>
            <div className={styles.headerLeft}>
              <img
                src="/images/owner.svg"
                alt="Saket Burman"
                className={styles.profilePic}
              />
              <div className={styles.profileTitle}>
                <h1>Saket Burman</h1>
                <div className={styles.profileSubtitle}>
                  <span>DIN: 05208674</span>
                  <span className={styles.grayDot}></span>
                  <span>Managing Director</span>
                </div>
              </div>
            </div>
            <div className={styles.dinStatus}>
              DIN Status : <span className={styles.activeTag}>Active</span>
            </div>
          </section>

          {/* PERSONAL INFO GRID */}
          <div className={styles.detailsGrid}>
            <InfoBlock label="DIN" value="05208674" />
            <InfoBlock label="PAN" value="AABPB1234F" />
            <InfoBlock label="NATIONALITY" value="British" />
            <InfoBlock label="DATE OF BIRTH" value="15-Jun-1967 (58 years)" />
            <InfoBlock label="GENDER" value="Male" />
            <InfoBlock label="RESIDENTIAL STATUS" value="Resident" />
            <InfoBlock label="EMAIL ID" value="mohit.burman@dabur.com" />
            <InfoBlock label="MOBILE NUMBER" value="+91-11-23456789" />
          </div>

          <div className={styles.addressGrid}>
            <InfoBlock
              label="CURRENT RESIDENTIAL ADDRESS"
              value="8/3, Asaf Ali Road, New Delhi - 110002, India"
            />
            <InfoBlock
              label="PERMANENT ADDRESS"
              value="8/3, Asaf Ali Road, New Delhi - 110002, India"
            />
          </div>

          {/* ROLE & APPOINTMENT */}
          <section className={styles.section}>
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
          </section>

          {/* OTHER ASSOCIATIONS */}
          <section className={styles.section}>
            <div className={styles.headerArea}>
              <h2 className={styles.sectionHeading}>Other Associations</h2>
              <div className={styles.subTabs}>
                <div
                  className={`${styles.subTab} ${
                    activeTab === "current" ? styles.subTabActive : ""
                  }`}
                  onClick={() => setActiveTab("current")}
                >
                  Current Companies
                </div>

                <div
                  className={`${styles.subTab} ${
                    activeTab === "previous" ? styles.subTabActive : ""
                  }`}
                  onClick={() => setActiveTab("previous")}
                >
                  Previous Companies
                </div>

                <div
                  className={`${styles.subTab} ${
                    activeTab === "shareholding" ? styles.subTabActive : ""
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
                      <th>Appointment Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AssociationRow
                      name="Dabur India Limited"
                      role="Managing Director"
                      date="01-Apr-2015"
                    />
                    <AssociationRow
                      name="Dabur Nepal Pvt. Ltd."
                      role="Director"
                      date="15-Jun-2018"
                    />
                    <AssociationRow
                      name="Aviva Life Insurance Company India Ltd."
                      role="Independent Director"
                      date="15-Jun-2018"
                    />
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
                    <AssociationRow
                      name="H&R Johnson (India) Ltd."
                      role="Non-Executive Director"
                      date="2010 - 2015"
                    />
                    <AssociationRow
                      name="Fresenius Kabi Oncology Limited"
                      role="Independent Director"
                      date="2012 - 2019"
                    />
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
                              src="/icons/dabur-logo.svg"
                              className={styles.companyIcon}
                              alt=""
                            />
                          </div>
                          Dabur India Limited
                        </div>
                      </td>
                      <td>2.34%</td>
                      <td>
                        <span className={styles.promoterTag}>Promoter</span>
                      </td>
                    </tr>

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
                          Dabur Nepal Pvt. Ltd.
                        </div>
                      </td>
                      <td>0.85%</td>
                      <td>
                        <span className={styles.nonPromoterTag}>
                          Non-Promoter
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* KMP SECTION */}
          <section className={styles.section2}>
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
          </section>

          {/* REGULATORY GROUP HEADER */}
          <div className={styles.regulatoryHeader}>
            Regulatory, Banking & Reputation Check — Individual
          </div>

          {/* DYNAMIC SECTIONS */}
          {regulatoryData.map((section, index) => (
            <section key={index} className={styles.checkContainer}>
              <div className={styles.checkTitle}>{section.title}</div>
              <div className={styles.cardFrame}>
                <table className={styles.dataTable}>
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
        </main>
      </div>
    </div>
  );
}

/* Helper Components to keep JSX clean */
function InfoBlock({ label, value }) {
  return (
    <div className={styles.infoBlock}>
      <label>{label}</label>
      <p>{value}</p>
    </div>
  );
}

function AssociationRow({ name, role, date }) {
  return (
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

          {name}
        </div>
      </td>
      <td>{role}</td>
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
      {active && <div className={styles.activeTag}>Active</div>}
    </div>
  );
}