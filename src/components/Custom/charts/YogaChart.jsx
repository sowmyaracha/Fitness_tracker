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

const YogaChart = () => {
  const data = [
    { month: "Jan", Yoga: 65 },
    { month: "Feb", Yoga: 65 },
    { month: "Mar", Yoga: 65 },
    { month: "Apr", Yoga: 120 },
    { month: "May", Yoga: 120 },
    { month: "Jun", Yoga: 80 },
    { month: "Jul", Yoga: 120 },
    { month: "Aug", Yoga: 100 },
    { month: "Sep", Yoga: 100 },
    { month: "Oct", Yoga: 120 },
    { month: "Nov", Yoga: 120 },
    { month: "Dec", Yoga: 120 },
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
          dataKey="Yoga"
          stroke="#C046D3"
          strokeWidth={3}
          activeDot={{ r: 8 }}
          dot={{ fill: "#C046D3", strokeWidth: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default YogaChart;
