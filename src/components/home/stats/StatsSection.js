import styles from './StatsSection.module.css';

export default function StatsSection() {
  const stats = [
    { value: '20,011,525', label: 'New Predictions' },
    { value: '45,098', label: 'New Insights' },
    { value: '3,567', label: 'New Funding Rounds' }
  ];

  return (
    <section className={styles.statsWrapper}>
      <div className={styles.badge}>
        This month on Corporate Professionals
      </div>
      
      <div className={styles.statsContainer}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statBox}>
            <h2 className={styles.number}>{stat.value}</h2>
            <p className={styles.label}>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}