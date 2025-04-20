import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Label,
  Legend,
} from "recharts";
import useDietStats from "../../../hooks/dieplan/useDietStats";

// Radial Chart (Pie) Component
const RadialChart = () => {
  const { WorkoutStats, loading, error, fetchWorkoutStats } = useDietStats();

  useEffect(() => {
    fetchWorkoutStats();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!WorkoutStats || WorkoutStats.length === 0) {
    return <div>No data available</div>;
  }
  // Calculate total calories burned
  const totalCaloriesBurned = WorkoutStats.reduce((total, stat) => {
    const activity = Object.keys(stat)[0];
    const values = stat[activity];
    const activityTotal = values.reduce((sum, value) => sum + value, 0);
    return total + activityTotal;
  }, 0);

  // Calculate the progress data for each activity
  const progressData = WorkoutStats.map((stat) => {
    const activity = Object.keys(stat)[0];
    const values = stat[activity];
    const totalCalories = values.reduce((sum, value) => sum + value, 0);
    const percentage = (totalCalories / totalCaloriesBurned) * 100;

    return {
      name: activity, // Activity name
      value: totalCalories, // Total calories burned for this activity
      percentage: Math.min(percentage, 100).toFixed(2), // Activity's percentage of the total calories
      color: getColorForActivity(activity), // Color for the pie slice
    };
  });

  // Function to generate random colors for activities (you can improve this for specific colors)
  function getColorForActivity(activity) {
    const colors = {
      Running: "#FF9432",
      Cycling: "#1EA7C5",
      Weightlifting: "#C046D3",
    };
    return (
      colors[activity] ||
      `#${Math.floor(Math.random() * 16777215).toString(16)}`
    ); // Default random color
  }

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={progressData}
            cx="50%" // Center of the chart
            cy="50%" // Center of the chart
            innerRadius="50%" // Inner radius to create a donut chart effect
            outerRadius="80%" // Outer radius of the pie chart
            paddingAngle={5} // Space between slices
            dataKey="value" // Use the `value` key to define slice size
            startAngle={90} // Start angle for rotation (makes it look like a clock)
            endAngle={-270} // End angle (finishes the chart)
          >
            {progressData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            {/* Labels inside the chart */}
            <Label
              value={`${totalCaloriesBurned} Kcal`} // Display total calories in the center
              position="center"
              fontSize={24}
              fontWeight="bold"
              fill="#333"
            />
          </Pie>

          {/* Adding a custom legend for better context */}
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            wrapperStyle={{
              paddingTop: "10px",
              fontSize: "14px",
              fontFamily: "Poppins",
              color: "#333",
            }}
          />

          {/* Tooltip (shows on hover) */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "5px",
              border: "1px solid #ddd",
            }}
            labelStyle={{
              color: "#333",
            }}
            itemStyle={{
              color: "#333",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadialChart;
