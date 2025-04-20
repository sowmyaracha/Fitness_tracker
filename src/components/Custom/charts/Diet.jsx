// import React from "react";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// // Adjusted data according to your input for the weekly progress (carbs, protein, fats)
// const data = [
//   {
//     name: "Sunday",
//     carbs: 0.0,
//     fats: 0.0,
//     protein: 0.0,
//   },
//   {
//     name: "Monday",
//     carbs: 0.0,
//     fats: 0.0,
//     protein: 0.0,
//   },
//   {
//     name: "Tuesday",
//     carbs: 500.0,
//     fats: 45.0,
//     protein: 250.0,
//   },
//   {
//     name: "Wednesday",
//     carbs: 0.0,
//     fats: 0.0,
//     protein: 0.0,
//   },
//   {
//     name: "Thursday",
//     carbs: 0.0,
//     fats: 0.0,
//     protein: 0.0,
//   },
//   {
//     name: "Friday",
//     carbs: 0.0,
//     fats: 0.0,
//     protein: 0.0,
//   },
//   {
//     name: "Saturday",
//     carbs: 0.0,
//     fats: 0.0,
//     protein: 0.0,
//   },
// ];

// const Diet = () => (
//   <ResponsiveContainer width="100%" height={265}>
//     <AreaChart
//       data={data}
//       margin={{
//         top: 10,
//         right: 30,
//         left: 0,
//         bottom: 0,
//       }}
//     >
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis dataKey="name" />
//       <YAxis />
//       <Tooltip />
//       <Area
//         type="monotone"
//         dataKey="carbs"
//         stackId="1"
//         stroke="#8884d8"
//         fill="#8884d8"
//         name="Carbs"
//       />
//       <Area
//         type="monotone"
//         dataKey="fats"
//         stackId="1"
//         stroke="#82ca9d"
//         fill="#82ca9d"
//         name="Fats"
//       />
//       <Area
//         type="monotone"
//         dataKey="protein"
//         stackId="1"
//         stroke="#ffc658"
//         fill="#ffc658"
//         name="Protein"
//       />
//     </AreaChart>
//   </ResponsiveContainer>
// );

// export default Diet;
import React, { useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useDietStats from "../../../hooks/dieplan/useDietStats";
// Adjust the import path based on where your hook is located

const Diet = () => {
  const { dietStats, loading, error, fetchDietStats } = useDietStats();

  useEffect(() => {
    fetchDietStats(); // This will now be called every time the component gets a new key
  }, []); // Keep the empty dependency array

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
    carbs: parseFloat(dayStat.carbs),
    fats: parseFloat(dayStat.fats),
    protein: parseFloat(dayStat.protein),
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
          dataKey="carbs"
          stackId="1"
          stroke="#8884d8"
          fill="#8884d8"
          name="Carbs"
        />
        <Area
          type="monotone"
          dataKey="fats"
          stackId="1"
          stroke="#82ca9d"
          fill="#82ca9d"
          name="Fats"
        />
        <Area
          type="monotone"
          dataKey="protein"
          stackId="1"
          stroke="#ffc658"
          fill="#ffc658"
          name="Protein"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Diet;
