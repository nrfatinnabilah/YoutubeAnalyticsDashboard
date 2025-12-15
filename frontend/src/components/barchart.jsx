import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const barchart = ({ data }) => (
    <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
            <XAxis dataKey="data" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="likes" fill="#82ca9d" />
            <Bar dataKey="comments" fill = "#8884d8"/>
        </BarChart>
    </ResponsiveContainer>
);

export default BarChart;