"use client";

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import styles from './CompanyCharts.module.css';

const CompanyCharts = () => {
  // Data for Business Activity Pie Chart
  const pieData = [
    { name: 'Manufacturing', value: 81.33, color: 'rgba(216, 180, 254, 1)' },
    { name: 'Food & Beverages', value: 18.67, color: 'rgba(187, 247, 208, 1)' }
  ];

  // Data for Business Activity Table
  const activityTable = [
    {
      activity: "Chemical and chemical products, pharmaceuticals, medicinal chemical and botanical products",
      percentage: "81.33",
      turnover: "₹ 774,477.12"
    },
    {
      activity: "Food, beverages and tobacco products",
      percentage: "18.67",
      turnover: "₹ 177,787.88"
    }
  ];

  // Data for Shareholding Progress Bar
  const shareholding = {
    promoter: 66.2,
    nonPromoter: 33.8,
    promoterValue: "1174000355.00",
    nonPromoterValue: "598038807.00"
  };

  return (
    <div className={styles.mainWrapper}>
      {/* BUSINESS ACTIVITY SECTION */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Business Activity</h2>
        <div className={styles.card}>
          <div className={styles.pieChartContainer}>
            <div className={styles.pieWrapper}>
              <ResponsiveContainer width={242} height={242}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius={121}
                    paddingAngle={0}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className={styles.pieLabelPrimary}>Manufacturing: 81.33%</div>
              <div className={styles.pieLabelSecondary}>Food & Beverages: 18.67%</div>
            </div>

            <div className={styles.pieLegend}>
              <div className={styles.legendRow}>
                <div className={styles.legendIndicator}>
                  <div className={styles.dot} style={{ backgroundColor: 'rgba(59, 130, 246, 1)' }}></div>
                  <span className={styles.legendText}>Manufacturing</span>
                </div>
                <span className={styles.legendValue}>81.33</span>
              </div>
              <div className={styles.legendDivider}></div>
              <div className={styles.legendRow}>
                <div className={styles.legendIndicator}>
                  <div className={styles.dot} style={{ backgroundColor: 'rgba(59, 130, 246, 1)' }}></div>
                  <span className={styles.legendText}>Food & Beverages</span>
                </div>
                <span className={styles.legendValue}>18.67</span>
              </div>
            </div>
          </div>


        </div>
                  <div className={styles.tableWrapper}>
            <div className={styles.tableHeader}>
              <div className={styles.headerLeft}>Financial Year: 2025</div>
              <div className={styles.headerRight}>
                Turnover: <span className={styles.greenText}>952,265.00</span>
              </div>
            </div>
            <table className={styles.activityTable}>
              <thead>
                <tr>
                  <th>Business Activity</th>
                  <th className={styles.textCenter}>Turnover %</th>
                  <th className={styles.textRight}>Turnover</th>
                </tr>
              </thead>
              <tbody>
                {activityTable.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.activity}</td>
                    <td className={styles.textCenter}>{row.percentage}</td>
                    <td className={styles.textRight}>{row.turnover}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </section>
    </div>
  );
};

export default CompanyCharts;