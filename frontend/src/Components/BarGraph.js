// Filename - App.js

import React from "react";
import {
	BarChart,
	Bar,
	CartesianGrid,
	XAxis,
	YAxis,
} from "recharts";

const App = (props) => {
	// Sample data

	let data = [
		{ name: "Geeksforgeeks", students: 0 },
		{ name: "Technical scripter", students: 700 },
		{ name: "Geek-i-knack", students: 200 },
		{ name: "Geek-o-mania", students: 1000 },
	];
    data = props.data

	return (
		<BarChart width={300} height={200} data={data}>
			<Bar dataKey="students" fill="green" />
			<CartesianGrid stroke="#ccc" />
			<XAxis dataKey="name" />
			<YAxis />
		</BarChart>
	);
};

export default App;
