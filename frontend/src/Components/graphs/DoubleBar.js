import React from "react";
import '../../Styles/Main.css'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label
} from "recharts";

export default function DoubleBar(props) {
  let data = [];
  props.data.map((dat) => {
    let k = JSON.parse(JSON.stringify(dat));
    k.nominated = k.nominated - k.attended;
    data.push(k);
  });
  const CustomTooltip = ({ active, payload, label }) => {
    let k = data.filter((ele) => ele.name == label)[0];
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p
            className="label"
            style={{ color: "black", padding: "10px" }}
          >{`${label} : ${k.nominated + k.attended + " / " + k.attended}`}</p>
        </div>
      );
    }
    return null;
  };



  return (
    <BarChart width={props.width} height={props.height} data={data}>
      <CartesianGrid />
      <XAxis dataKey="name" tick={false}>
        <Label value="Trainings" position="bottom" />
      </XAxis>

      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Legend />

      <Bar  dataKey="nominated" stackId="a" fill="#82ca9d" />
      <Bar dataKey="attended" stackId="a" fill="#8884d8" />
    </BarChart>
  );
}
