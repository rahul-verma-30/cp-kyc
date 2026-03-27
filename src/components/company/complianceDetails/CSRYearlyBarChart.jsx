"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function CSRYearlyBarChart({ data = [], title, styles }) {
  return (
    <div className={styles.csrChartCard}>
      <h6 className={styles.csrChartTitle}>{title}</h6>

      <div className={styles.csrChartBody}>
        <ResponsiveContainer width="100%" height={340}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              axisLine={{ stroke: "#E5E7EB", strokeWidth: 1 }}
              dataKey="year"
              tickLine={false}
            />
            <YAxis
              axisLine={{ stroke: "#E5E7EB", strokeWidth: 1 }}
              tickLine={false}
              tick={{
                fill: "#374151",
                fontWeight: 500,
                fontSize: 14,
                letterSpacing: "-0.04em",
                textAnchor: "end", // 👈 right aligned
              }}
              width={95}
              tickMargin={24}
              tickFormatter={(v) => `${v}.00 Cr`}
            />
            <Tooltip formatter={(v) => `${v} Cr`} />
            <Bar
              dataKey="value"
              fill="#3B82F6"
              radius={[100, 100, 0, 0]}
              barSize={36}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
