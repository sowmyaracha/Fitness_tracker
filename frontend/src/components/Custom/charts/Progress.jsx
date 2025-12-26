import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const workoutData = [
  {
    activity: "Running",
    duration: 90, // Example: 90 minutes of running
    caloriesBurned: 300, // Example: 300 kcal burned
    fullMark: 150,
  },
  {
    activity: "Cycling",
    duration: 60, // Example: 60 minutes of cycling
    caloriesBurned: 250, // Example: 250 kcal burned
    fullMark: 150,
  },
  {
    activity: "Swimming",
    duration: 45, // Example: 45 minutes of swimming
    caloriesBurned: 350, // Example: 350 kcal burned
    fullMark: 150,
  },
  {
    activity: "Yoga",
    duration: 75, // Example: 75 minutes of yoga
    caloriesBurned: 200, // Example: 200 kcal burned
    fullMark: 150,
  },
  {
    activity: "Strength Training",
    duration: 60, // Example: 60 minutes of strength training
    caloriesBurned: 400, // Example: 400 kcal burned
    fullMark: 150,
  },
  {
    activity: "Walking",
    duration: 120, // Example: 120 minutes of walking
    caloriesBurned: 150, // Example: 150 kcal burned
    fullMark: 150,
  },
];

const Progress = () => (
  <ResponsiveContainer width="70%" height={300}>
    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={workoutData}>
      <PolarGrid />
      <PolarAngleAxis dataKey="activity" />
      <PolarRadiusAxis />
      <Radar
        name="Duration (min)"
        dataKey="duration"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.6}
      />
      <Radar
        name="Calories Burned (kcal)"
        dataKey="caloriesBurned"
        stroke="#82ca9d"
        fill="#82ca9d"
        fillOpacity={0.6}
      />
    </RadarChart>
  </ResponsiveContainer>
);

export default Progress;
