import React from 'react';
import styles from './DirectorsSection.module.css';
import Link from "next/link";


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
      <div className={styles.mainHeader}>
        <h1 className={styles.mainTitle}>Directors & KMP Details</h1>
      </div>

      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} className={`${styles.statCard} ${stat.colorClass}`}>
            <p className={styles.statLabel}>{stat.label}</p>
            <p className={styles.statValue}>{stat.value}</p>
          </div>
        ))}
      </div>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Current Directors Details</h2>
            <Link href="/company/employee" className={styles.viewAllBtn}>
                View All Employee
                <img
                    src="/icons/chevron-right.svg"
                    alt=""
                    className={styles.arrowIcon}
                />
            </Link>
        </div>
        <div className={styles.membersOuterBox}>
          <div className={styles.membersGrid}>
            {directors.map((person, index) => (
              <div key={index} className={styles.personCard}>
                <div className={styles.imageContainer}>
                  <img src={person.image} alt={person.name} className={styles.profileImg} />
                </div>
                <div className={styles.info}>
                  <p className={styles.name}>{person.name}</p>
                  <p className={styles.role}>{person.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Former Directors Details</h2>
            <Link href="/company/employee" className={styles.viewAllBtn}>
                View All Employee
                <img
                    src="/icons/chevron-right.svg"
                    alt=""
                    className={styles.arrowIcon}
                />
            </Link>
        </div>
        <div className={styles.membersOuterBox}>
          <div className={styles.membersGrid}>
            {directors.map((person, index) => (
              <div key={index} className={styles.personCard}>
                <div className={styles.imageContainer}>
                  <img src={person.image} alt={person.name} className={styles.profileImg} />
                </div>
                <div className={styles.info}>
                  <p className={styles.name}>{person.name}</p>
                  <p className={styles.role}>{person.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DirectorsSection;