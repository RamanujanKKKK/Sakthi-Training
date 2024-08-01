import '../../Styles/Main.css'

import React from "react";
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

export default function Bargf(props) {
  let data = props.data;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p
            className="label"
            style={{ color: "black", padding: "10px" }}
          >{`${label} : ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <BarChart
      width={props.width}
      height={props.height}
      data={data}
      barSize={20}
    >
      <XAxis dataKey="name" tick={false}>
        <Label value="Departments" position="bottom" />
      </XAxis>
      <Legend
        payload={
    ['Trainings'].map(
      (item, index) => ({
        id: item.name,
        type: "square",
        value: `${item.name} (${item.value}%)`,
        color:"#EBF3F4"
      })
    )
  }

      />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <CartesianGrid strokeDasharray="3 3" />
      <Bar
        dataKey="value"
        fill="#223343"
        background={{ fill: "#eee" }}
        onClick={(e) => {
          props.tablefunc(e.id);
        }}
      />
    </BarChart>
  );
}
