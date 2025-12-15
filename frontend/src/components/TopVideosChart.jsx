import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TopVideosChart = ({ data }) => {
  // Sort by views descending, take top 5
  const top5 = [...data]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={top5} layout="vertical">
        <XAxis type="number" />
        <YAxis type="category" dataKey="video_id" />
        <Tooltip />
        <Bar dataKey="views" fill="#ff7300" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TopVideosChart;
