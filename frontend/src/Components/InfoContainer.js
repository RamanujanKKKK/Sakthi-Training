import { useState, useEffect, useRef } from "react";
import "../Styles/InfoContainer.css";
import Graph from "./graphs/PieChart";
import Legends from "./graphs/Legends";
import InfoPage from "./InfoPage";
import Bargf from "./graphs/Bargf";
import "../Styles/Popup.css";
import ScheduleTable from "./ScheduleTable";
import Table from "./Table";
import DoubleBar from "./graphs/DoubleBar";
import { hover } from "@testing-library/user-event/dist/hover";

export const InfoContainer = (props) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isPopupOpen2, setPopupOpen2] = useState(false);
  const [isPopupOpen3, setPopupOpen3] = useState(false);
  const [barperscent, setbarpersent] = useState(80);
  const [expandGraph, setExpandGraph] = useState(0);
  const [showDetailsTable, setShowDetailsTable] = useState(null);
  // const [viewheight, setViewHeight] = useState(0);
  // const ref = useRef(null);

  // useEffect(() => {
  //   setViewHeight((ref.current.clientHeight * 0.8) / 4);
  // });

  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setHeight(window.innerHeight / 4);
    setWidth((window.innerWidth * 0.55) / 2);
  }, []); //empty dependency array so it only runs once at render

  let resizeHandler = () => {
    setHeight(window.innerHeight / 4);
    setWidth((window.innerWidth * 0.5) / 2);
  };

  window.addEventListener("resize", resizeHandler);

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

  const tablefunc1 = (id) => {
    let out = [];
    if (props.data.links[id])
      props.data.links[id].map((ele) => {
        let k = props.dataHandler.getDeptById(props.data, ele);
        k = props.dataHandler.clone(k);
        delete k["id"];
        out.push(k);
      });
    setShowDetailsTable(out);
  };
  props.data.filter.training.forEach((element) => {
    let value;
    if (props.data.links[element.id])
      value = props.data.links[element.id].length;
    else value = 0;
    dataG1.push({ id: element.id, name: element.name, value: value });
  });

  let dataG2 = new Array();

  const tablefunc2 = (id) => {
    let out = [];
    if (props.data.revlinks[id])
      props.data.revlinks[id].map((ele) => {
        let k = props.dataHandler.getTrainingById(props.data, ele);
        k = JSON.parse(JSON.stringify(k));
        delete k["id"];
        out.push(k);
      });
    setShowDetailsTable(out);
  };

  props.data.filter.department.forEach((element) => {
    let value;
    if (props.data.revlinks[element.id])
      value = props.data.revlinks[element.id].length;
    else value = 0;
    dataG2.push({ id: element.id, name: element.name, value: value });
  });

  let dataG3 = new Array();

  const tablefunc3 = (id) => {
    let out = [];
    if (props.data.employeebyTraining[id])
      props.data.employeebyTraining[id].map((ele) => {
        let k = JSON.parse(JSON.stringify(ele));
        delete k["department_id"];
        delete k["designation_id"];
        delete k["id"];
        out.push(k);
      });
    setShowDetailsTable(out);
  };

  props.data.filter.training.forEach((element) => {
    let value;
    if (props.data.trainingCount[element.id])
      value = props.data.trainingCount[element.id];
    else value = 0;
    dataG3.push({ id: element.id, name: element.name, value: value });
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
      id: element.id,
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

  const title_style = {
    color: "black",
    fontSize: "larger",
    marginLeft: "2%",
    cursor: "pointer",
    TextDecoration: "underline",
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
            <Graph data={dataG1} height={height * 1.6} width={width}></Graph>
            <div style={{ position: "absolute", top: "42%", left: "15%" }}>
              <Legends position={{ x: "0%", y: "s0%" }} data={dataG1}></Legends>
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
              {showDetailsTable == null ? (
                expandGraph == 0 ? (
                  <>
                    <div
                      className="chart-container"
                      style={{ backgroundColor: "white" }}
                    >
                      <div
                        style={title_style}
                        onClick={() => setExpandGraph(1)}
                      >
                        No. of Deptartment by each Training
                      </div>
                      <Graph
                        data={dataG1}
                        height={height}
                        width={width}
                        tablefunc={tablefunc1}
                      ></Graph>
                      <Legends
                        position={{ x: "90%", y: "-70%" }}
                        data={dataG1}
                      ></Legends>
                    </div>
                    <div
                      className="chart-container"
                      style={{ backgroundColor: "#ebf3f4" }}
                    >
                      <div
                        style={title_style}
                        onClick={() => setExpandGraph(2)}
                      >
                        Employees trained under each Department
                      </div>

                      <div style={{ transform: "translate(-30px,+20px)" }}>
                        <Bargf
                          data={dataG3}
                          height={height}
                          width={width}
                          tablefunc={tablefunc3}
                        ></Bargf>
                      </div>
                      <Legends
                        position={{ x: "90%", y: "-85%" }}
                        data={dataG3}
                      ></Legends>
                    </div>
                    <div
                      className="chart-container"
                      style={{ backgroundColor: "#ebf3f4" }}
                    >
                      <div
                        style={title_style}
                        onClick={() => setExpandGraph(3)}
                      >
                        Employees Nominated vs Attended
                      </div>

                      <div style={{ transform: "translate(-30px,+30px)" }}>
                        <DoubleBar
                          data={dataG5}
                          height={height}
                          width={width}
                        ></DoubleBar>
                      </div>
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
                        style={title_style}
                        onClick={() => setExpandGraph(4)}
                      >
                        No. of Training by each Depatment
                      </div>

                      <Graph
                        data={dataG2}
                        height={height}
                        width={width}
                        tablefunc={tablefunc2}
                      ></Graph>
                      <Legends
                        position={{ x: "90%", y: "-70%" }}
                        data={dataG2}
                      ></Legends>
                    </div>
                  </>
                ) : (
                  <div
                    className="chart-container"
                    style={{ width: "100%", height: "100%" }}
                  >
                    <div
                      className="close-btn"
                      onClick={() => setExpandGraph(0)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        zIndex: 121,
                      }}
                    >
                      X
                    </div>
                    {
                      {
                        1: (
                          <>
                            <div style={title_style}>
                              No. of Deptartment by each Training
                            </div>
                            <div style={{ transform: "translate(0,10% )" }}>
                              <Graph
                                data={dataG1}
                                height={height * 2}
                                width={width * 2}
                                tablefunc={tablefunc1}
                              ></Graph>
                            </div>
                            <Legends
                              position={{ x: "90%", y: "-65%" }}
                              data={dataG1}
                            ></Legends>
                          </>
                        ),
                        2: (
                          <>
                            <div style={title_style}>
                              Employees trained under each Department
                            </div>

                            <div style={{ transform: "translate(7%,29%)" }}>
                              <Bargf
                                data={dataG3}
                                height={height * 1.6}
                                width={width * 1.6}
                                tablefunc={tablefunc3}
                              ></Bargf>
                            </div>
                            <Legends
                              position={{ x: "90%", y: "-50%" }}
                              data={dataG3}
                            ></Legends>
                          </>
                        ),
                        3: (
                          <>
                            <div style={title_style}>
                              Employees Nominated vs Attended
                            </div>

                            <div style={{ transform: "translate(7%,29%)" }}>
                              <DoubleBar
                                data={dataG5}
                                height={height * 1.6}
                                width={width * 1.6}
                              ></DoubleBar>
                            </div>
                            <input
                              type="number"
                              placeholder="%"
                              value={barperscent}
                              onChange={percentChange}
                              style={{
                                width: "50px",
                                position: "relative",
                                top: "25%",
                                left: "10%",
                                borderRadius: "5px",
                              }}
                            ></input>
                          </>
                        ),
                        4: (
                          <>
                            <div style={title_style}>
                              No. of Training by each Depatment
                            </div>
                            <div style={{ transform: "translate(0,10% )" }}>
                              <Graph
                                data={dataG2}
                                height={height * 2}
                                width={width * 2}
                                tablefunc={tablefunc2}
                              ></Graph>
                            </div>
                            <Legends
                              position={{ x: "90%", y: "-60%" }}
                              data={dataG2}
                            ></Legends>
                          </>
                        ),
                      }[expandGraph]
                    }
                  </div>
                )
              ) : (
                <div
                  className="chart-container"
                  style={{ width: "100%", height: "100%", overflowY: "scroll" }}
                >
                  <div
                    className="close-btn"
                    onClick={() => setShowDetailsTable(null)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    X
                  </div>
                  <Table data={showDetailsTable}></Table>
                </div>
              )}
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
            style={{ width: "10%", marginRight: "16%", zIndex: "120" }}
            onClick={() => setReqDownload(true)}
          >
            Download
          </button>
        )}
        {!props.isPopupOpen && 
        <button
          className="expand-btn"
          style={{ width: isExpanded ? "10%" : null, zIndex: "120" }}
          onClick={swapExpand}
        >
          {isExpanded ? "Less" : "More"}
        </button>
        }
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
