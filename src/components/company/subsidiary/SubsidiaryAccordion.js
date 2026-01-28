'use client';

import { useState } from 'react';
import styles from './SubsidiaryAccordion.module.css';

const subsidiaries = [
  { id: 1, name: "Dabur International Ltd", location: "UAE", ownership: "100%" },
  { id: 2, name: "Dabur Egypt Ltd", location: "UAE", ownership: "100%" },
  { id: 3, name: "Dabur Nepal Pvt Ltd", location: "Nepal", ownership: "95.04%" },
  { id: 4, name: "Asian Consumer Care Pvt Ltd", location: "India", ownership: "100%" },
  { id: 5, name: "H&B Stores Ltd", location: "India", ownership: "100%" },
  { id: 6, name: "Dabur Consumer Care Pvt Ltd", location: "India", ownership: "100%" },
  { id: 7, name: "Dabur Ayurvet Ltd", location: "India", ownership: "62.77%" },
  { id: 8, name: "Namaste Laboratories LLC", location: "USA", ownership: "100%" },
  { id: 9, name: "Dermoviva Skin Essentials Inc", location: "USA", ownership: "100%" },
  { id: 10, name: "Dabur Lanka Pvt Ltd", location: "Sri Lanka", ownership: "100%" }
];

export default function SubsidiaryAccordion() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.container}>
      <div className={styles.accordionWrapper}>
        {/* Parent Header */}
        <div className={styles.parentHeader} onClick={toggleAccordion}>
          <div className={styles.parentInfo}>
            <div className={styles.parentLogo}>
            <img 
              src="/icons/dabur-logo.svg" 
              alt="Dabur Logo" 
              className={styles.parentLogoImg} 
            />
            </div>
            <div className={styles.parentText}>
              <h2 className={styles.parentTitle}>Dabur India Limited</h2>
              <span className={styles.parentSubtitle}>Parent Company</span>
            </div>
          </div>
          <div className={styles.parentControls}>
            <span className={styles.subsidiaryCount}>10 Subsidiaries</span>
            <img 
              src="/icons/chevron-down-dark.svg" 
              alt="Toggle" 
              className={`${styles.chevron} ${isExpanded ? styles.chevronExpanded : ''}`} 
            />
          </div>
        </div>

        {/* Expandable Content */}
        <div className={`${styles.contentWrapper} ${isExpanded ? styles.contentWrapperExpanded : ''}`}>
          <div className={styles.subsidiaryList}>
            {subsidiaries.map((item) => (
              <div key={item.id} className={styles.subsidiaryItem}>
                <div className={styles.itemLeft}>
                  <div className={styles.itemIcon}>
                    <img src="/icons/building-icon.svg" alt="Building" className={styles.iconImg} />
                  </div>
                  <div className={styles.itemDetails}>
                    <p className={styles.itemName}>{item.name}</p>
                    <p className={styles.itemLocation}>{item.location}</p>
                  </div>
                </div>
                <div className={styles.itemRight}>
                  <div className={styles.ownershipInfo}>
                    <span className={styles.ownershipValue}>{item.ownership}</span>
                    <span className={styles.ownershipLabel}>Ownership</span>
                  </div>
                  <div className={styles.statusBadge}>Active</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}