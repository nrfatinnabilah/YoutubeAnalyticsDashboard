import React, { useEffect, useState } from 'react';
import './App.css';
import LineChart from './components/linechart';
import BarChart from './components/barchart';
import TopVideosChart from './components/TopVideosChart';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from FastAPI backend
    axios
      .get("http://127.0.0.1:8000/api/analytics")
      .then((response) => {
        // Process data: convert numeric fields from strings to numbers
        const processedData = response.data.map((d) => ({
          ...d,
          views: Number(d.views),
          likes: Number(d.likes),
          comments: Number(d.comments),
          day: new Date(d.day) // convert to Date object
        }));

        // Optional: limit rows to 5000 for performance
        setData(processedData.slice(0, 5000));
        setLoading(false);
        console.log("Processed analytics data:", processedData.slice(0, 5));
      })
      .catch((error) => {
        console.error("Error fetching analytics:", error);
        setLoading(false);
      });
  }, []);

  // Filter data based on selected filter
  const filteredData = data.filter((d) => {
    const today = new Date();
    const day = new Date(d.day);
    if (filter === "today") {
      return (
        day.getFullYear() === today.getFullYear() &&
        day.getMonth() === today.getMonth() &&
        day.getDate() === today.getDate()
      );
    } else if (filter === "month") {
      return day.getFullYear() === today.getFullYear() && day.getMonth() === today.getMonth();
    } else if (filter === "year") {
      return day.getFullYear() === today.getFullYear();
    }
    return true;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1>YouTube Analytics Dashboard</h1>

      <div style={{ marginBottom: "20px" }}>
        <label>Filter: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="today">Today</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {loading ? (
        <p>Loading data...</p>
      ) : filteredData.length === 0 ? (
        <p>No data available for selected filter.</p>
      ) : (
        <>
          <h2>Views Over Time</h2>
          <LineChart data={filteredData} />

          <h2>Likes vs Comments</h2>
          <BarChart data={filteredData} />

          <h2>Top 5 Videos by Views</h2>
          <TopVideosChart data={filteredData} />
        </>
      )}
    </div>
  );
}

export default App;