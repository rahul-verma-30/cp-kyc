import styles from "./CompanyLayout.module.css";
import CompanySidebar from "../sidebar/CompanySidebar";
import CompanyHeader from "../header/CompanyHeader";
import CompanyOverview from "../overview/CompanyOverview";
import CompanyDetails from "../details/CompanyDetails";
import NameHistory from "../history/NameHistory";
import ContactAddressSection from "../contact/ContactAddressSection";
import CompanyHighlights from "../highlights/CompanyHighlights";
import FinancialHighlights from "../financials/FinancialHighlights";

export default function CompanyLayout() {
  return (
    <div className={styles.container}>
      {/* Full Width Header */}
      <div className={styles.headerWrapper}>
        <CompanyHeader />
      </div>

      {/* Content Row */}
      <div className={styles.contentRow}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <CompanySidebar />
        </aside>

        {/* Main Content */}
        <main className={styles.main}>
          <CompanyOverview />
          <CompanyDetails />
          <NameHistory />
          <ContactAddressSection />
          <CompanyHighlights />
          <FinancialHighlights />
        </main>
      </div>
    </div>
  );
}
