import React from "react";
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

function BarChart({ data }) {
  // Sum likes and comments
  const totals = data.reduce(
    (acc, d) => {
      acc.likes += d.likes;
      acc.comments += d.comments;
      return acc;
    },
    { likes: 0, comments: 0 }
  );

  const chartData = [
    { name: "Likes", value: totals.likes },
    { name: "Comments", value: totals.comments }
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ReBarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" />
      </ReBarChart>
    </ResponsiveContainer>
  );
}

export default BarChart;
