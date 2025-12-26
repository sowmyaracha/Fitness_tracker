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

const DynamicChart = ({ data, workoutType, color }) => {
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
          dataKey={workoutType}
          stroke={color}
          strokeWidth={3}
          activeDot={{ r: 8 }}
          dot={{ fill: color, strokeWidth: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DynamicChart;
