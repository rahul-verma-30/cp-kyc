import React from 'react';
import styles from './CompanyDetails.module.css';

const CompanyDetails = ({ companyData, loading, error }) => {

  if (loading) {
    return <div className={styles.container}>Loading highlights...</div>;
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div style={{ color: "red", fontWeight: 500 }}>
          {error}
        </div>
      </div>
    );
  }

  if (!companyData || !companyData.company_information) {
    return (
      <div className={styles.container}>
        <p>Loading company details...</p>
      </div>
    );
  }
  const info = companyData.company_information;


  const data = [
    { label: 'CIN/LLPIN', value: info.cin || 'N/A' },
    { label: 'PAN', value: info.pan || 'N/A' },
    { label: 'LEI Number', value: info.lei_number || 'N/A' },
    { label: 'Company Legal Name', value: info.company_legal_name || 'N/A' },
    { label: 'ROC Code', value: info.roc_code || 'N/A' },
    { label: 'Company No', value: info.company_no || 'N/A' },
    { label: 'Company Classication', value: info.company_classification || 'N/A' },
    { label: 'Authorised Capital', value: info.authorised_capital || 'N/A' },
    { label: 'Active Compliance', value: info.active_compliance || 'N/A' },
    { label: 'Paid up Capital', value: info.paid_up_capital || 'N/A' },
    { label: 'Incorporation Date', value: info.incorporation_date || 'N/A' },
    { label: 'Date of AGM', value: info.date_of_agm || 'N/A' },
    { label: 'Date of Balance Sheet', value: info.date_of_balance_sheet || 'N/A' },
    { label: 'Listing Status', value: info.listing_status || 'N/A' },
    { label: 'Stock Symbol', value: info.stock_symbol || 'N/A' },
    { label: 'Industry', value: info.industry || 'N/A' },
    { label: 'Segment', value: info.segment || 'N/A', fullWidth: true },
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