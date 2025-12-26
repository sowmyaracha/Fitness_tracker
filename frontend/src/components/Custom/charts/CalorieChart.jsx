import React, { useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useDietStats from "../../../hooks/dieplan/useDietStats";

const CalorieChart = () => {
  // Data for the chart
  const { dietStats, loading, error, fetchDietStats } = useDietStats();

  useEffect(() => {
    fetchDietStats();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!dietStats || dietStats.length === 0) {
    return <div>No data available</div>;
  }

  // Map dietStats to the structure the chart requires
  const data = dietStats.map((stat) => ({
    day: stat.day, // The day of the week
    Intake: parseFloat(stat.caloriesIntake), // Calories intake as float
    Burned: parseFloat(stat.caloriesBurned), // Calories burned as float
  }));

  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" /> {/* Use the day of the week */}
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="Intake"
            stroke="#6EC51E"
            fill="#6EC51E"
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="Burned"
            stroke="#FF285C"
            fill="#FF285C"
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CalorieChart;
