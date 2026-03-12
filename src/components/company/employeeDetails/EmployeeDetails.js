"use client";

import React, { useState } from "react";
import styles from "./EmployeeDetails.module.css";
import Link from "next/link";

const EmployeeDetails = () => {
  const [expandedId, setExpandedId] = useState("saket-current");

  const currentDirectors = [
    {
      id: "saket-current",
      name: "Saket Burman",
      din: "05208674",
      status: "Approved",
      totalDirectorship: "2",
      nationality: "British",
      gender: "Male",
      address:
        "Villa K27 Frond K Palm JumeirahDubai Post Box117153 Dubai 117153 Ae",
      image: "/images/owner.svg",
      appointments: [
        {
          company: "Chowdry Associates",
          designation: "Director",
          date: "11 Jul 2013",
        },
        {
          company: "Dabur India Limited",
          designation: "Director",
          date: "31 Jan 2012",
        },
        {
          company: "Dabur India Limited",
          designation: "Director",
          date: "31 Jan 2012",
        },
        {
          company: "Dabur India Limited",
          designation: "Director",
          date: "31 Jan 2012",
        },
        {
          company: "Dabur India Limited",
          designation: "Director",
          date: "31 Jan 2012",
        },
        {
          company: "Dabur India Limited",
          designation: "Director",
          date: "31 Jan 2012",
        },
        {
          company: "Dabur India Limited",
          designation: "Director",
          date: "31 Jan 2012",
        },
        {
          company: "Dabur India Limited",
          designation: "Director",
          date: "31 Jan 2012",
        },
        {
          company: "Dabur India Limited",
          designation: "Director",
          date: "31 Jan 2012",
        },
        {
          company: "Dabur India Limited",
          designation: "Director",
          date: "31 Jan 2012",
        },
        {
          company: "Dabur India Limited",
          designation: "Director",
          date: "31 Jan 2012",
        },
        {
          company: "Dabur India Limited",
          designation: "Director",
          date: "31 Jan 2012",
        },
        {
          company: "Dabur India Limited",
          designation: "Director",
          date: "31 Jan 2012",
        },
        {
          company: "Dabur India Limited",
          designation: "Director",
          date: "31 Jan 2012",
        },
      ],
    },
    {
      id: "mukesh-current",
      name: "Mukesh Hari Butani",
      din: "01452839",
      image: "/images/owner.svg",
    },
    {
      id: "amit-current-1",
      name: "Amit Burman",
      din: "05208674",
      image: "/images/owner.svg",
    },
    {
      id: "amit-current-2",
      name: "Amit Burman",
      din: "05208674",
      image: "/images/owner.svg",
    },
  ];

  const formerDirectors = [
    {
      id: "sunil-former",
      name: "Sunil Duggal",
      din: "00041825",
      image: "/images/owner.svg",
    },
    {
      id: "saket-former",
      name: "Saket Burman",
      din: "05208674",
      image: "/images/owner.svg",
    },
    {
      id: "ravindra-former",
      name: "Ravindra Chandra Bhargava",
      din: "00007620",
      image: "/images/owner.svg",
    },
    {
      id: "mukesh-former",
      name: "Mukesh Hari Butani",
      din: "01452839",
      image: "/images/owner.svg",
    },
  ];

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const renderDirectorCard = (director, isExpanded) => (
    <div
      key={director.id}
      className={`${styles.card} ${
        isExpanded ? styles.expandedCard : styles.collapsedCard
      }`}
    >
      <div
        className={`${styles.cardHeader} ${
          !isExpanded ? styles.collapsedInner : ""
        }`}
        onClick={() => toggleExpand(director.id)}
      >
        <div className={styles.headerLeft}>
          <img
            src={director.image}
            alt={director.name}
            className={styles.avatar}
          />
          <div className={styles.headerText}>
            <h3 className={styles.directorName}>{director.name}</h3>
            <p className={styles.dinLabel}>DIN: {director.din}</p>
          </div>
        </div>
        <div className={styles.headerRight}>
          <img
            src={isExpanded ? "/icons/close.svg" : "/icons/plus.svg"}
            alt="toggle"
            className={styles.toggleIcon}
          />
        </div>
      </div>

      {isExpanded && (
        <div className={styles.detailsContent}>
          <div className={styles.gridInfo}>
            <div className={styles.infoBox}>
              <span className={styles.label}>DIN</span>
              <span className={styles.value}>{director.din || "-"}</span>
            </div>
            <div className={styles.infoBox}>
              <span className={styles.label}>DIN Status</span>
              <span className={`${styles.value} ${styles.statusGreen}`}>
                {director.status || "-"}
              </span>
            </div>
            <div className={styles.infoBox}>
              <span className={styles.label}>Total Directorship</span>
              <span className={styles.value}>
                {director.totalDirectorship || "-"}
              </span>
            </div>
            <div className={styles.infoBox}>
              <span className={styles.label}>Nationality</span>
              <span className={styles.value}>
                {director.nationality || "-"}
              </span>
            </div>
            <div className={styles.infoBox}>
              <span className={styles.label}>Gender</span>
              <span className={styles.value}>{director.gender || "-"}</span>
            </div>
            <div className={styles.infoBox}>
              <span className={styles.label}>Address</span>
              <span className={styles.value}>{director.address || "-"}</span>
            </div>
          </div>

          {director.appointments && (
            <div className={styles.tableWrapper}>
              <table className={styles.appointmentsTable}>
                <thead>
                  <tr>
                    <th>Company/LLP name</th>
                    <th>Designation</th>
                    <th>Date of appointment</th>
                  </tr>
                </thead>
                <tbody>
                  {director.appointments.map((apt, index) => (
                    <tr key={index}>
                      <td>{apt.company}</td>
                      <td>{apt.designation}</td>
                      <td>{apt.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb}>
        <Link href="/company" className={styles.breadcrumbLink}>
          Company Details
        </Link>
        <img
          src="/icons/arrow-right-black.svg"
          alt="arrow"
          className={styles.breadcrumbIcon}
        />
        <span className={styles.breadcrumbActive}>Employee Details</span>
      </nav>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Current Directors Details</h2>

        <div
          className={`${styles.sectionWrapper} ${
            currentDirectors.some((d) => d.id === expandedId)
              ? styles.sectionExpanded
              : ""
          }`}
        >
          <div className={styles.sectionInner}>
            <div className={styles.listContainer}>
              {currentDirectors.map((director) =>
                renderDirectorCard(director, expandedId === director.id),
              )}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Former Directors Details</h2>

        <div
          className={`${styles.sectionWrapper} ${
            formerDirectors.some((d) => d.id === expandedId)
              ? styles.sectionExpanded
              : ""
          }`}
        >
          <div className={styles.sectionInner}>
            <div className={styles.listContainer}>
              {formerDirectors.map((director) =>
                renderDirectorCard(director, expandedId === director.id),
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmployeeDetails;
