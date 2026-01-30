"use client";

import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";



export default function CSRSectorDonutChart({
  data = [],
  title,
  styles,
}) {
  return (
    <div className={styles.csrChartCard}>
      <h6 className={`${styles.csrChartTitle} ${styles.csrChartTitleDonut}`}>{title}</h6>

      <div className={`${styles.csrChartBody} ${styles.csrChartBodyDonut}`}>
        <div className={styles.csrDonutWrap}>
          <ResponsiveContainer width={200} height={200}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className={styles.csrLegend}>
            {data.map((item) => (
              <div key={item.name} className={styles.csrLegendRow}>
                <span
                  className={styles.csrLegendDot}
                  style={{ backgroundColor: item.color }}
                />
                <span className={styles.csrLegendLabel}>{item.name}:</span>
                <span className={styles.csrLegendValue}>
                  {item.value.toFixed(2)} M
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
