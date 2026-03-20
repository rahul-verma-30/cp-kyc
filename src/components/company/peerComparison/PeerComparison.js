import styles from "./PeerComparison.module.css";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import CompanyCharts from "../charts/CompanyCharts";

// Custom component to handle the multi-line centered text for the X-Axis
const CustomXAxisTick = ({ x, y, payload }) => {
  const words = payload.value.split(" ");
  return (
    <g transform={`translate(${x},${y})`}>
      {words.map((word, index) => (
        <text
          key={index}
          x={0}
          y={15 + index * 14}
          textAnchor="middle"
          fill="#6B7280"
          fontSize={11}
        >
          {word}
        </text>
      ))}
    </g>
  );
};

export default function PeerComparison() {
  const barData = [
    // { name: "Omniactive Health Technologies Limited", value: 15 },
    // { name: "Viswaat Chemicals Limited", value: 20 },
    // { name: "Calibre Chemicals Private Limited", value: 20 },
    // { name: "Apitoria Pharma Private Limited", value: 75 },
    // { name: "Nirma Limited", value: 80 },
    // { name: "Dabur India Limited", value: 95 },
    // { name: "Mankind Pharma Limited", value: 95 },
    // { name: "Srf Limited", value: 122 },
    // { name: "Pidilite Industries Limited", value: 125 },
  ];

  const peerData = barData.map((item) => ({
    // name: item.name,
    // cin: "U24230MH2003PLC141898",
    // date: "27 Aug 2003",
    // capital: "₹ 1,005.47 L",
    // turnover: "₹ 83,187.47 L",
    // netWorth: "₹ 83,037.37 L",
  }));

  // Formatter to match the image's "0.1 T" vs "80 B" style
  const formatYAxis = (value) => {
    if (value === 0) return "0";
    if (value >= 100) return `${value / 1000} T`;
    return `${value} B`;
  };

  return (
    <main className={styles.mainContainer}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Peer Comparison</h1>
        <div className={styles.headerInfo}>
          <span className={styles.infoGroup}>
            <span className={styles.infoLabel}>Source:</span>
            <span className={styles.infoValue}>-</span>
          </span>
          <span className={styles.infoDivider}></span>
          <span className={styles.infoGroup}>
            <span className={styles.infoLabel}>Last Updated:</span>
            <span className={styles.infoValue}>-</span>
          </span>
        </div>
      </div>

      <CompanyCharts />

      <section className={styles.sectionCard}>
        <div className={styles.barChartContainer}>
          <ResponsiveContainer width="100%" height={450}>
            <BarChart
              data={barData}
              margin={{ top: 20, right: 10, left: 10, bottom: 50 }}
            >
              <CartesianGrid
                strokeDasharray="4 4"
                vertical={false}
                stroke="#E5E7EB"
              />
              <XAxis
                dataKey="name"
                interval={0}
                axisLine={{ stroke: "#E5E7EB" }}
                tickLine={false}
                tick={<CustomXAxisTick />}
                tickMargin={0} 
              />
              <YAxis
                axisLine={{ stroke: "#E5E7EB" }}
                tickLine={false}
                tick={{ fontSize: 12, fill: "rgba(55, 65, 81, 1)" }}
                ticks={[0, 20, 40, 60, 80, 100, 120, 140]}
                tickFormatter={formatYAxis}
                width={60}
              />
              <Bar
                dataKey="value"
                fill="rgba(59, 130, 246, 1)"
                radius={[15, 15, 0, 0]}
                barSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className={styles.tableContainer}>
        <table className={styles.fullTable}>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>CIN</th>
              <th>Incorporation Date</th>
              <th>Paid Up Capital</th>
              <th>Authorised Capital</th>
              <th>Sum of Charges</th>
              <th>Turnover</th>
              <th>Net Worth</th>
            </tr>
          </thead>
          <tbody>
            {peerData.map((row, i) => (
              <tr key={i}>
                <td className={styles.companyCell}>
                  <img
                    src="/icons/Image.svg"
                    alt=""
                    className={styles.companyIcon}
                  />
                  <span className={styles.companyName}>{row.name}</span>
                </td>

                <td>{row.cin}</td>
                <td>{row.date}</td>
                <td>{row.capital}</td>
                <td>{row.capital}</td>
                <td>{row.capital}</td>
                <td>{row.turnover}</td>
                <td>{row.netWorth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
