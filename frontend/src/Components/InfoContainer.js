import { useState, useEffect } from "react";
import "../Styles/InfoContainer.css";
import Graph from "./PieChart";
import BarGraph from "./BarGraph";
import Legends from "./Legends";
import InfoPage from "./InfoPage";
import Bargf from "./Bargf";
import "../Styles/Popup.css";
import ScheduleTable from "./ScheduleTable";
import Table from "./Table";
import DoubleBar from "../Components/DoubleBar";

export const InfoContainer = (props) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isPopupOpen2, setPopupOpen2] = useState(false);
  const [isPopupOpen3, setPopupOpen3] = useState(false);
  const [barperscent, setbarpersent] = useState(80);
  const handleOpenPopup = () => {
    setPopupOpen(true);
    setPopupOpen2(false);
    setPopupOpen3(false);
  };
  const handleOpenPopup2 = () => {
    setPopupOpen(false);
    setPopupOpen2(true);
    setPopupOpen3(false);
  };
  const handleOpenPopup3 = () => {
    setPopupOpen(false);
    setPopupOpen2(false);
    setPopupOpen3(true);
  };
  const handleClosePopup = () => {
    setPopupOpen(false);
    setPopupOpen2(false);
    setPopupOpen3(false);
  };

  const [reqDownload, setReqDownload] = useState(false);
  if (!props.data) return <></>;

  let isExpanded = props.expand[0];
  let setExpanded = props.expand[1];

  console.log(isExpanded);
  const swapExpand = () => {
    setExpanded(!isExpanded);
  };

  const getMyColor = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return "#" + n.slice(0, 6);
  };

  let dataG1 = new Array();

  props.data.filter.training.forEach((element) => {
    let value;
    if (props.data.links[element.id])
      value = props.data.links[element.id].length;
    else value = 0;
    dataG1.push({ name: element.name, value: value });
  });

  let dataG2 = new Array();

  props.data.filter.department.forEach((element) => {
    let value;
    if (props.data.revlinks[element.id])
      value = props.data.revlinks[element.id].length;
    else value = 0;
    dataG2.push({ name: element.name, value: value });
  });

  let dataG3 = new Array();

  props.data.filter.training.forEach((element) => {
    let value;
    if (props.data.trainingCount[element.id])
      value = props.data.trainingCount[element.id];
    else value = 0;
    dataG3.push({ name: element.name, value: value });
  });

  let dataG4 = new Array();
  props.data.filter.department.forEach((element) => {
    let value;
    if (props.data.departmentCount[element.id])
      value = props.data.departmentCount[element.id];
    else value = 0;
    dataG4.push({ name: element.name, value: value });
  });

  dataG1.map((element) => {
    element.fill = getMyColor();
  });
  dataG2.map((element) => {
    element.fill = getMyColor();
  });
  dataG3.map((element) => {
    element.fill = getMyColor();
  });
  dataG4.map((element) => {
    element.fill = getMyColor();
  });

  let dataG5 = new Array();
  let thresholdPercent = barperscent / 100;
  Object.keys(props.data.DbarGF).forEach((elemen, index) => {
    let element = props.data.DbarGF[elemen];
    let su = 0;
    element.emp.forEach((emp) => {
      if (emp / element.total >= thresholdPercent) {
        su += 1;
      }
    });
    dataG5.push({
      name: element.value,
    nominated: element.emp.length,
      attended: su,
      index: index,
    });
  });

  const percentChange = (e) => {
    console.log(barperscent);
    setbarpersent(e.target.value);
  };

  return (
    <div
      className="info-container"
      style={{
        width: isExpanded ? "100%" : null,
        height: isExpanded ? "90%" : null,
        marginTop: isExpanded ? "2%" : "-3%",
      }}
    >
      <div className="visualize-data">
        {isExpanded ? "Filtered Visuals" : "Training Distribution"}
      </div>

      <div className="content-container">
        {!isExpanded ? (
          <div className="graph1" style={{ position: "relative" }}>
            <Graph data={dataG1}></Graph>
            <div style={{ position: "absolute", top: "38%", left: "25%" }}>
              <Legends position={{ x: "0%", y: "0%" }} data={dataG1}></Legends>
            </div>
            <div
              className="basic-info"
              style={{ position: "absolute", top: "48%", left: "0%" }}
            >
              <div className="gen-detail">General-Details</div>
              <div className="detail popup-container">
                Training Topics :{" "}
                <span onClick={handleOpenPopup} className="aslink">
                  {props.data.training.length}
                </span>
              </div>
              <div className="detail popup-container">
                Departments :{" "}
                <span className="aslink" onClick={handleOpenPopup2}>
                  {props.data.department.length}
                </span>
              </div>
              <div className="detail popup-container">
                Employees Trained :{" "}
                <span onClick={handleOpenPopup3}>
                  {props.data.empunderTrain}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="expand-screen">
            <div className="info-left">
              <div
                className="chart-container"
                style={{ backgroundColor: "white" }}
              >
                <div
                  style={{
                    color: "black",
                    fontSize: "larger",
                    marginLeft: "2%",
                  }}
                >
                  Training Distribution
                </div>
                <Graph data={dataG1}></Graph>
                <Legends
                  position={{ x: "90%", y: "-80%" }}
                  data={dataG1}
                ></Legends>
              </div>
              <div
                className="chart-container"
                style={{ backgroundColor: "#ebf3f4" }}
              >
                <div
                  style={{
                    color: "black",
                    fontSize: "large",
                    marginLeft: "2%",
                  }}
                >
                  Barchart on employee trained
                </div>

                <div style={{ transform: "translate(-40px,+30px)" }}>
                  <Bargf data={dataG3}></Bargf>
                </div>
                <Legends
                  position={{ x: "90%", y: "-70%" }}
                  data={dataG3}
                ></Legends>
              </div>
              <div
                className="chart-container"
                style={{ backgroundColor: "#ebf3f4" }}
              >
                <div
                  style={{ color: "black", fontSize: "17px", marginLeft: "2%" }}
                >
                  Barchart on employee trained
                </div>

                <div style={{ transform: "translate(-40px,+30px)" }}>
                  <DoubleBar data={dataG5}></DoubleBar>
                </div>
                <Legends
                  position={{ x: "90%", y: "-70%" }}
                  data={dataG4}
                ></Legends>
                <input
                  type="number"
                  placeholder="%"
                  value={barperscent}
                  onChange={percentChange}
                  style={{
                    width: "50px",
                    position: "relative",
                    borderRadius: "5px",
                  }}
                ></input>
              </div>
              <div
                className="chart-container"
                style={{ backgroundColor: "white" }}
              >
                <div
                  style={{
                    color: "black",
                    fontSize: "larger",
                    marginLeft: "2%",
                  }}
                >
                  Department Distribution
                </div>

                <Graph data={dataG2}></Graph>
                <Legends
                  position={{ x: "90%", y: "-80%" }}
                  data={dataG2}
                ></Legends>
              </div>
            </div>
            <div className="info-right">
              <InfoPage
                data={props.data}
                reqDown={[reqDownload, setReqDownload]}
                dataHandler={props.dataHandler}
              ></InfoPage>
            </div>
          </div>
        )}
      </div>
      <div className="func-buttons">
        {isExpanded && (
          <button
            className="xsl-download expand-btn"
            style={{ width: "10%", marginRight: "16%" }}
            onClick={() => setReqDownload(true)}
          >
            Download
          </button>
        )}
        <button
          className="expand-btn"
          style={{ width: isExpanded ? "10%" : null }}
          onClick={swapExpand}
        >
          {isExpanded ? "Less" : "More"}
        </button>
      </div>
      {isPopupOpen && (
        <div className="popu">
          <Table data={props.data.training}></Table>
          <div style={{ height: "30px", width: "15px" }}></div>
          <button className="close-btn" onClick={handleClosePopup}>
            &#10006;
          </button>
        </div>
      )}
      {isPopupOpen2 && (
        <div className="popu">
          <Table data={props.data.department}></Table>
          <div style={{ height: "30px", width: "15px" }}></div>
          <button className="close-btn" onClick={handleClosePopup}>
            &#10006;
          </button>
        </div>
      )}
    </div>
  );
};
