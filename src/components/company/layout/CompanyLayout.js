import styles from "./CompanyLayout.module.css";
import CompanySidebar from "../sidebar/CompanySidebar";
import CompanyHeader from "../header/CompanyHeader";

export default function CompanyLayout({ children }) {
  return (
    <div className={styles.container}>
      {/* Full width header */}
      <div className={styles.headerWrapper}>
        <CompanyHeader />
      </div>

      {/* Sidebar + Main */}
      <div className={styles.contentRow}>
        <aside className={styles.sidebar}>
          <CompanySidebar />
        </aside>

        <main className={styles.main}>
          {children}
        </main>
      </div>
    </div>
  );
}
