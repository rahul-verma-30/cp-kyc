import React from 'react';
import styles from './CompanyDetails.module.css';

const CompanyDetails = () => {
  const data = [
    { label: 'CIN/LLPIN', value: 'L24230DL1975PLC007908' },
    { label: 'PAN', value: 'AAACD0474C' },
    { label: 'LEI Number', value: '335800MJPUA2E1FSFL38' },
    { label: 'Company Legal Name', value: 'Dabur India Limited' },
    { label: 'ROC Code', value: 'Roc Delhi' },
    { label: 'Company No', value: '007908' },
    { label: 'Company Classication', value: 'Public Limited Indian Non-Government Company' },
    { label: 'Authorised Capital', value: '20,700.00 lakh' },
    { label: 'Active Compliance', value: 'Active Compliant' },
    { label: 'Paid up Capital', value: '17,736.90 lakh' },
    { label: 'Incorporation Date', value: '16 Sep 1975' },
    { label: 'Date of AGM', value: '07 Aug 2025' },
    { label: 'Date of Balance Sheet', value: '31 Mar 2025' },
    { label: 'Listing Status', value: 'Listed' },
    { label: 'Stock Symbol', value: 'BSE : 500096 NSE : DABUR' },
    { label: 'Industry', value: 'FMCG' },
    { label: 'Segment', value: 'Home Care & Cleaning Products Personal Care & Skincare Products', fullWidth: true },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Company Information</h2>
      <div className={styles.card}>
        <div className={styles.grid}>
          {data.map((item, index) => (
            <div 
              key={index} 
              className={`${styles.infoBox} ${item.fullWidth ? styles.fullWidth : ''}`}
            >
              <div className={styles.label}>{item.label}</div>
              <div className={styles.value}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;