import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Legend,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const PieChartComponent = (props) => {
  const clone = (data) => {
    return JSON.parse(JSON.stringify(data));
  };
  let data = clone(props.data);

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.1;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <>
        {percent != 0 ? (
          <text
            x={x}
            y={y}
            fill="grey"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
          >
            {`${(percent * 100).toFixed(0)}%`}
          </text>
        ) : (
          <></>
        )}
      </>
    );
  };
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p
            className="label"
            style={{ color: "black", padding: "10px" }}
          >{`${payload[0].name} : ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  const pieClick = (e) => {
    console.log(e);
  };
  return (
    <>
      <div style={{ width: "100%" }}>
        <div className="row d-flex justify-content-center text-center">
          <div className="col-md-8">
            <ResponsiveContainer
              width={"100%"}
              height={200}
              className="text-center"
            >
              <PieChart width={"100%"} height={300}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={"80%"}
                  fill="#8884d8"
                  dataKey="value"
                  onClick={pieClick}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={data[index].fill} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />

                {/* <Legend  layout="horizontal" className="position-legend" verticalAlign="top" align="center" /> */}
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};
export default PieChartComponent;
