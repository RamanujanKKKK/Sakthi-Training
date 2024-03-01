import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";


export default function DoubleBar(props) {
  let data = props.data;
  const CustomTooltip = ({ active, payload, label }) => {
    let k = data.filter((ele) => ele.name == label)[0];
    console.log(k);
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p
            className="label"
            style={{ color: "black", padding: "10px" }}
          >{`${label} : ${k.nominated + " " + k.attended}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <BarChart
      width={350}
      height={200}
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 40,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <Bar dataKey="nominated" fill="#82ca9d" />
      <Bar dataKey="attended" fill="#8884d8" />
    </BarChart>
  );
}
