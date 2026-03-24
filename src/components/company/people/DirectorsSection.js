import React from 'react';
import styles from './DirectorsSection.module.css';
import DirectorProfile from './DirectorProfile';

const DirectorsSection = ({ directorsData, directorsLoading, directorsError }) => {
 if (directorsLoading) {
    return <div className={styles.container}>Loading highlights...</div>;
  }

  if (directorsError) {
    return (
      <div className={styles.container}>
        <div style={{ color: "red", fontWeight: 500 }}>
          {directorsError}
        </div>
      </div>
    );
  }

  if (!directorsData) {
    return (
      <div className={styles.container}>
        <p>Loading related corporates...</p>
      </div>
    );
  }
  const stats = directorsData?.summary
  ? [
      {
        label: "Current Directors",
        value: directorsData?.summary.current_directors ||  "-",
        colorClass: styles.blueStat,
      },
      {
        label: "Past Directors",
        value: directorsData?.summary.past_directors || "-",
        colorClass: styles.redStat,
      },
      {
        label: "Current KMP(s)",
        value: directorsData?.summary.current_kmp || "-",
        colorClass: styles.purpleStat,
      },
      {
        label: "Past KMP(s)",
        value: directorsData?.summary.past_kmp || "-",
        colorClass: styles.greenStat,
      },
    ]
  : [
    {
        label: "Current Directors",
        value: "-",
        colorClass: styles.blueStat,
      },
      {
        label: "Past Directors",
        value: "-",
        colorClass: styles.redStat,
      },
      {
        label: "Current KMP(s)",
        value: "-",
        colorClass: styles.purpleStat,
      },
      {
        label: "Past KMP(s)",
        value: "-",
        colorClass: styles.greenStat,
      },
  ];

  // const directors = [
  //   { name: 'Amit Burman', role: 'Owner', image: '/icons/profile-icon.svg' },
  //   { name: 'Pradip Burman', role: 'Chairman', image: '/images/chairman.svg' },
  //   { name: 'Mohit Malhotra', role: 'CEO', image: '/images/ceo.svg' },
  //   { name: 'Kapil Ohri', role: 'Head of Digital Marketing', image: '/images/head.svg' },
  // ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Directors & KMP Details</h1>
        <div className={styles.headerInfo}>
          <span className={styles.infoGroup}>
            <span className={styles.infoLabel}>Source:</span>
            <span className={styles.infoValue}>{directorsData?.source || "-"}</span>
          </span>
          <span className={styles.infoDivider}></span>
          <span className={styles.infoGroup}>
            <span className={styles.infoLabel}>Last Updated:</span>
            <span className={styles.infoValue}>{directorsData?.summary?.last_updated || "-"}</span>
          </span>
        </div>
      </div>

      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} className={`${styles.statCard} ${stat.colorClass}`}>
            <p className={styles.statLabel}>{stat.label}</p>
            <p className={styles.statValue}>{stat.value}</p>
          </div>
        ))}
      </div>
      <DirectorProfile directors={directorsData?.directors} />
    </div>
  );
};

export default DirectorsSection;