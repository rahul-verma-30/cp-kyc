"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
function getNiceTicks(values, tickCount = 11) {
  const min = Math.min(...values);
  const max = Math.max(...values);

  // Raw step
  const rawStep = (max - min) / (tickCount - 1);

  // Round step to nearest 5 / 10
  const step = Math.ceil(rawStep / 5) * 5;

  // Align min & max to step
  const niceMin = Math.floor(min / step) * step;
  const niceMax = Math.ceil(max / step) * step;

  const ticks = [];
  for (let v = niceMin; v <= niceMax; v += step) {
    ticks.push(v);
  }

  return { ticks, domain: [niceMin, niceMax] };
}

export default function EpfoSummaryChart({ epfoSummaryData }) {
  const START = 1500;
  const STEP = 500;
  const TICK_COUNT = 10;
  const amountValues = epfoSummaryData.map((d) => d.amount);
  const { ticks: amountTicks, domain: amountDomain } = getNiceTicks(
    amountValues,
    11,
  );

  // find max employees from data
  const maxEmployees = Math.max(...epfoSummaryData.map((d) => d.employees));

  // ensure enough height for 10 ticks
  const requiredMax = START + STEP * (TICK_COUNT - 1);

  // final max = max of data OR required ticks range
  const yMax = Math.max(Math.ceil(maxEmployees / STEP) * STEP, requiredMax);

  // generate ticks
  const employeeTicks = Array.from(
    { length: TICK_COUNT },
    (_, i) => START + i * STEP,
  );

  return (
    <div style={{ width: "100%", height: 380 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={epfoSummaryData}>
          {/* Gradient */}
          <defs>
            <linearGradient id="employeesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Grid */}
          <CartesianGrid
            stroke="#E5E7EB"
            strokeDasharray="4 4"
            vertical={false}
            horizontal={true}
          />

          {/* X Axis */}
          <XAxis
            dataKey="period"
            // tick={{ fill: "#6B7280", fontSize: 12 }}
            // axisLine={false}
            tickLine={false}
            axisLine={{ stroke: "#E5E7EB", strokeWidth: 1 }}
            tick={{ fill: "#71717A", fontSize: 14, fontWeight: 500 }}
          />

          {/* Left Y Axis – Employees */}
          <YAxis
            yAxisId="left"
            domain={[START, yMax]}
            ticks={employeeTicks}
            axisLine={{ stroke: "#E5E7EB", strokeWidth: 1 }}
            width={90}
            tick={{ fill: "#374151", fontSize: 14, fontWeight: 500 }}
            // axisLine={false}
            tickLine={false}
            tickMargin={24}
            label={{
              value: "Employees",
              angle: -90,
              position: "insideLeft",
              fill: "#374151",
              fontSize: 14,
              fontWeight: 500,
            }}
          />

          {/* Right Y Axis – Amount */}
          <YAxis
            yAxisId="right"
            orientation="right"
            width={129}
            tickMargin={24}
            domain={amountDomain}
            ticks={amountTicks}
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#374151",
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: "-0.04em",
              textAnchor: "start", // right axis alignment
            }}
            tickFormatter={(v) => `${v.toFixed(2)} Lakh`}
            label={{
              value: "Amount",
              angle: 90,
              position: "insideRight",
              fill: "#374151",
              fontSize: 14,
              fontWeight: 500,
            }}
          />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: "1px solid #E5E7EB",
              fontSize: 12,
            }}
          />

          {/* Legend */}
          <Legend
            verticalAlign="top"
            align="center"
            iconType="circle"
            iconSize={10}
          />
          {/* Employees Area */}
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="employees"
            stroke="#3B82F6"
            strokeWidth={2}
            fill="url(#employeesGradient)"
            dot={{ r: 4, fill: "#3B82F6" }}
            activeDot={{ r: 5, fill: "#3B82F6" }}
            name="Employees"
          />

          {/* Amount Line */}
          <Area
            yAxisId="right"
            type="monotone"
            dataKey="amount"
            stroke="#0EA5E9"
            strokeWidth={2}
            fill="transparent"
            dot={{ r: 4, fill: "#0EA5E9" }}
            activeDot={{ r: 5, fill: "#0EA5E9" }}
            name="Amount"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
