import React from "react";
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

// Universal date parser
function parseDate(d) {
  if (!d) return null;

  const str = String(d);

  // Case 1: DD/MM/YYYY
  if (str.includes("/")) {
    const parts = str.split("/").map(Number);
    if (parts.length === 3) {
      const [day, month, year] = parts;
      const dateObj = new Date(year, month - 1, day);
      return isNaN(dateObj) ? null : dateObj;
    }
  }

  // Case 2: YYYY-MM-DD or ISO format
  const dateObj = new Date(str);
  return isNaN(dateObj) ? null : dateObj;
}

function LineChart({ data }) {
  const grouped = {};

  data.forEach(d => {
    const dateObj = parseDate(d.day);

    if (!dateObj) {
      console.warn("Invalid date:", d.day);
      return; // skip invalid dates
    }

    const dayStr = dateObj.toISOString().split("T")[0];
    grouped[dayStr] = (grouped[dayStr] || 0) + d.views;
  });

  // Convert grouped object to array for Recharts
  const chartData = Object.entries(grouped)
    .map(([day, views]) => ({ day, views }))
    // Sort by date to display correctly on X-axis
    .sort((a, b) => new Date(a.day) - new Date(b.day));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ReLineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="views" stroke="#ff7300" />
      </ReLineChart>
    </ResponsiveContainer>
  );
}

export default LineChart;
