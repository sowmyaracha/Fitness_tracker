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

const CycleChart = () => {
  const data = [
    { month: "Jan", Cycling: 50 },
    { month: "Feb", Cycling: 100 },
    { month: "Mar", Cycling: 35 },
    { month: "Apr", Cycling: 35 },
    { month: "May", Cycling: 0 },
    { month: "Jun", Cycling: 0 },
    { month: "Jul", Cycling: 80 },
    { month: "Aug", Cycling: 20 },
    { month: "Sep", Cycling: 40 },
    { month: "Oct", Cycling: 40 },
    { month: "Nov", Cycling: 40 },
    { month: "Dec", Cycling: 40 },
  ];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Cycling"
          stroke="#1EA7C5"
          strokeWidth={3}
          activeDot={{ r: 8 }}
          dot={{ fill: "#1EA7C5", strokeWidth: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CycleChart;
