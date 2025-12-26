import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useDietStats from "../../../hooks/dieplan/useDietStats"; // Adjust the import path based on where your hook is located

const Workout = () => {
  const { dietStats, loading, error } = useDietStats(); // Use the hook to fetch diet stats

  // If loading, display a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there's an error, display the error message
  if (error) {
    return <div>Error: {error}</div>;
  }

  // If no data, return a message
  if (!dietStats || dietStats.length === 0) {
    return <div>No data available</div>;
  }

  // Prepare the data to match the format expected by the AreaChart
  const data = dietStats.map((dayStat) => ({
    name: dayStat.day,
    caloriesBurned: parseFloat(dayStat.caloriesBurned), // Ensure caloriesBurned is a valid number
  }));

  return (
    <ResponsiveContainer width="100%" height={265}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="caloriesBurned"
          stackId="1"
          stroke="#ffc658"
          fill="#ffc658"
          name="Calories Burned"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Workout;
