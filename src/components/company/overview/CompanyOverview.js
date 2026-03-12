import React from 'react';
import styles from './CompanyOverview.module.css';


const CompanyOverview = ({companyData,loading,error}) => {
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

  if (!companyData) {
    return (
      <div className={styles.container}>
        <p>Loading company details...</p>
      </div>
    );
  }


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Company Details</h1>
        <div className={styles.metaInfo}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Source:</span>
            <span className={styles.metaValue}>{companyData?.header?.source || "-"}</span>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Last Updated:</span>
            <span className={styles.metaValueText}>{companyData?.header?.last_updated || "-"}</span>
          </div>
        </div>
      </div>

<div className={styles.aboutSection}>
  <div className={styles.sectionTitle}>About</div>

  <div className={styles.contentBox}>
    <p className={styles.description}>
      {companyData?.about?.description || "-"}
      {/* Dabur India Limited is a FMCG company that is known for its wide range of personal-care,
      healthcare, and food products. According to its credit rating report, the company is
      involved in the manufacturing of these products. With over 18 brands under its name,
      Dabur India Limited has established itself as a prominent player in the market. In 2005,
      the company made a strategic move by acquiring three companies from the Balsara group,
      which included popular brands such as Promise, Babool, Meswak, Odomos, Odonil, and
      Odopic. This acquisition further strengthened the company's position in the market. In
      2009, Dabur India Limited expanded its portfolio by acquiring Fem Care Pharma Ltd (FCPL).
      The company also made two overseas acquisitions in 2010 and 2011. Hobi, a leading
      manufacturer and marketer of hair-care and skin-care products in Turkey, was acquired in
      October 2010. In January 2011, Dabur India Limited acquired Namaste Labs, a company that
      specializes in hair-care products and has a strong presence in the US, Africa, the Middle
      East, Europe, and the Caribbean region. */}
    </p>
  </div>
</div>

    </div>
  );
};

export default CompanyOverview;