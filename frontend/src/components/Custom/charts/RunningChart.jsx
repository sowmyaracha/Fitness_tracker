import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const RunningChart = () => {
  // Running data for each day of the week
  const data = [
    { day: "Mon", Running: 0 },
    { day: "Tue", Running: 340 },
    { day: "Wed", Running: 0 },
    { day: "Thu", Running: 0 },
    { day: "Fri", Running: 0 },
    { day: "Sat", Running: 0 },
    { day: "Sun", Running: 0 },
  ];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Running"
          stroke="#FF7300"
          strokeWidth={3}
          activeDot={{ r: 8 }}
          dot={{ fill: "#FF7300", strokeWidth: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RunningChart;
