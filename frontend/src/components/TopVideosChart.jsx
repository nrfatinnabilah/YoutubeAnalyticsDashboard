import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TopVideosChart = ({ data = [] }) => {
  // 1️⃣ Group by video_id and sum views
  const grouped = data.reduce((acc, curr) => {
    const video = acc.find(item => item.video_id === curr.video_id);
    const views = Number(curr.views || 0);
    if (video) {
      video.views += views;
    } else {
      acc.push({ video_id: curr.video_id, views });
    }
    return acc;
  }, []);

  // 2️⃣ Sort descending by total views and take top 5
  const top5 = grouped.sort((a, b) => b.views - a.views).slice(0, 5);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={top5}
        margin={{ top: 20, right: 20, bottom: 80, left: 20 }}
      >
        <XAxis
          type="category"
          dataKey="video_id"
          angle={-45}      // rotate labels
          textAnchor="end" // align rotated labels
          interval={0}     // show all labels
        />
        <YAxis type="number" />
        <Tooltip />
        <Bar dataKey="views" fill="#ff7300" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TopVideosChart;
