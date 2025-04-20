import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useDietStats from "../../../hooks/dieplan/useDietStats";

const DashboardAdminCharts = () => {
  const { WorkoutStats, loading, error, fetchWorkoutStats } = useDietStats();
  const [data, setData] = useState([]);

  // Mapping days of the week for the x-axis
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Fetch workout stats only on mount
  useEffect(() => {
    fetchWorkoutStats();
  }, []); // The empty dependency array ensures this runs only once when the component mounts

  // Formatting data for the chart
  useEffect(() => {
    if (WorkoutStats && WorkoutStats.length > 0) {
      // Get the unique activity names from WorkoutStats
      const activities = WorkoutStats.map((data) => Object.keys(data)[0]);

      // Format WorkoutStats into data suitable for recharts
      const formattedData = weekdays.map((day, index) => {
        const dayData = { day };
        WorkoutStats.forEach((activityData) => {
          const activityName = Object.keys(activityData)[0];
          dayData[activityName] = activityData[activityName][index] || 0;
        });
        return dayData;
      });

      setData(formattedData); // Update the state with the formatted data
    }
  }, [WorkoutStats]); // This effect runs only when WorkoutStats changes

  // Loading or error state
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading workout stats.</div>;
  }

  // Check if WorkoutStats is available before rendering
  if (!WorkoutStats || WorkoutStats.length === 0) {
    return <div>No workout data available.</div>;
  }

  // Get the unique activity names from WorkoutStats
  const activities = WorkoutStats.map((data) => Object.keys(data)[0]);

  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          {activities.map((activity, idx) => (
            <Line
              key={activity}
              type="monotone"
              dataKey={activity}
              stroke={getColorForActivity(activity)}
              strokeWidth={4}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// Helper function to get colors based on the activity
const getColorForActivity = (activity) => {
  switch (activity) {
    case "Running":
      return "#FF9432";
    case "Cycling":
      return "#1EA7C5";
    case "Weightlifting":
      return "#C046D3";
    default:
      return "#FF9432"; // Default to Running color
  }
};

export default DashboardAdminCharts;
