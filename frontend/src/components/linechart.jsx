import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const linechart = ({ data }) => (
    <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
            <XAxis dataKey={"day"} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="views" stroke="#8884d8" />
        </LineChart>
    </ResponsiveContainer>
);

export default LineChart;