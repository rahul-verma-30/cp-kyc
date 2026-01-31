import React from 'react';
import styles from './DirectorsSection.module.css';
import DirectorProfile from './DirectorProfile';

const DirectorsSection = () => {
  const stats = [
    { label: 'Current Directors', value: '12', colorClass: styles.blueStat },
    { label: 'Past Directors', value: '30', colorClass: styles.redStat },
    { label: 'KMP Proles', value: '3', colorClass: styles.purpleStat },
    { label: 'Directors Proles', value: '42', colorClass: styles.greenStat },
  ];

  const directors = [
    { name: 'Amit Burman', role: 'Owner', image: '/images/owner.svg' },
    { name: 'Pradip Burman', role: 'Chairman', image: '/images/chairman.svg' },
    { name: 'Mohit Malhotra', role: 'CEO', image: '/images/ceo.svg' },
    { name: 'Kapil Ohri', role: 'Head of Digital Marketing', image: '/images/head.svg' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Directors & KMP Details</h1>
        <div className={styles.headerInfo}>
          <span className={styles.infoGroup}>
            <span className={styles.infoLabel}>Source:</span>
            <span className={styles.infoValue}>MCA</span>
          </span>
          <span className={styles.infoDivider}></span>
          <span className={styles.infoGroup}>
            <span className={styles.infoLabel}>Last Updated:</span>
            <span className={styles.infoValue}>30-Dec-2024, 11:45 AM IST</span>
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
      <DirectorProfile />
    </div>
  );
};

export default DirectorsSection;