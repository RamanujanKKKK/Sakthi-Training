import React from "react";
import { useState } from "react";
import "../Styles/Addon.css";
import "../Styles/table.css";
import FilterPop from "../Components/FilterPop";
import Add_Filter from "../Components/Add_Filter";
import PopForAddon from "../Components/PopForAddon";
import DeptPop from "../Components/DeptPop";
import * as XLSX from "xlsx";
import DeptBox from "../Components/Panel/DeptBox";


import styled from 'styled-components';
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';


const CustomDropdownMenu = styled(MDBDropdownMenu)`
  width: 300px !important;
`;

const Additional_Filter = (props) => {


  const items = [
    "#2C3E50", // Dark Blue-Gray
    "#2980B9", // Bright Blue
    "#8E44AD", // Purple
    "#16A085", // Teal
    "#27AE60", // Green
    "#F39C12", // Orange
    "#D35400", // Dark Orange
    "#C0392B", // Red
    "#7F8C8D", // Gray
    "#34495E", // Dark Gray-Blue
    "#1F3A93", // Midnight Blue
    "#22313F", // Steel Blue
    "#96281B", // Dark Red
    "#1C2833", // Charcoal
    "#6C3483"  // Dark Purple
  ];
  let colorcount = 0;

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [deptPop, setDeptPop] = useState(false);
  const [showSchedule, setShowSchedule] = useState(null);
  const [showDepartment, setShowDepartment] = useState(null);
  const [currentTraining, setCurrentTraining] = useState(null);
  const [currentDept, setCurrentDept] = useState(null);
  const [currentEmp, setCurrentEmp] = useState(null);

  const [show, setShow] = useState(false);
  const [nullattend, setNullattend] = useState(false);

  const [isAttendenceOpen, setIsAttendenceOpen] = useState(false);
  const [currentTable, setCurrentTable] = useState([]);
  const [columnHeaders, setColumnHeaders] = useState([]);
  const [emplFil, setEmplFil] = useState([]);

  const openPopup = () => {
    setIsPopupOpen(true);
  };
  const closePopup = () => {
    setIsPopupOpen(false);
  };
  if (!props.data) return <></>;

  let clone = (data) => {
    return JSON.parse(JSON.stringify(data));
  };

  const openTraining = (training_id) => {
    setCurrentDept(null);
    setCurrentEmp(null);
    setCurrentTraining(training_id);
    setCurrentTable(props.data.trainingBySchedules[training_id]);
    if (props.data.trainingBySchedules[training_id].length == 0) {
      setColumnHeaders(["No Data Available"]);
    } else
      setColumnHeaders(
        Object.keys(props.data.trainingBySchedules[training_id][0])
      );
  };
  const openDepartment = (dept_id) => {
    let data;
    setCurrentTraining(null);
    setCurrentEmp(null);
    setCurrentDept(dept_id);
    if (props.data.employeebyDept[dept_id] == null) data = [];
    else data = props.data.employeebyDept[dept_id];
    setCurrentTable(data);

    if (data.length == 0) {
      setColumnHeaders(["No Data Available"]);
    } else setColumnHeaders(Object.keys(data[0]));
  };

  const openEmployee = (employee_id) => {
    setCurrentDept(null);
    setCurrentEmp(1);
    setCurrentTraining(null);
  };

  let trainData = [];
  props.data.training.map((element) => {
    let cl = clone(element);
    delete cl["created_at"];
    delete cl["updated_at"];
    // delete cl['trainer_id']

    trainData.push(cl);
  });

  let empData = [];
  props.data.employees.map((element) => {
    let cl = clone(element);
    delete cl["created_at"];
    delete cl["updated_at"];
    // delete cl['trainer_id']

    empData.push(cl);
  });

  let jsonDataForDownload = (data, name) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, name + ".xlsx");
  };

  let dataNormal = () => {
    let out = [];

    props.data.deptSpecificAttendence[currentEmp].map((empl) => {
      if (empl.emp_id.toLowerCase().includes(emplFil) || emplFil == "") {
        let dt = {};
        dt["emp_name"] = empl.emp_name;
        dt["emp_id"] = empl.emp_id;
        let s = "";
        empl.attendence_details.map((atde) => {
          s +=
            props.dataHandler.getDataById(props.data.training, atde.training)
              .name +
            ":" +
            atde.attended_days +
            ";";
        });
        dt["attendence"] = s;
        out.push(dt);
      }
    });
    jsonDataForDownload(out, "employee");
  };

  let dataNoAttend = () => {
    let out = [];

    props.data.deptSpecificAttendence[currentEmp].map((empl) => {
      let hasNull = false;
      empl.attendence_details.map((atde) => {
        if (atde.attended_days == 0) hasNull = true;
      });
      if (!hasNull) return;
      let dt = {};
      dt["emp_name"] = empl.emp_name;
      dt["emp_id"] = empl.emp_id;
      let s = "";
      empl.attendence_details.map((atde) => {
        s +=
          props.dataHandler.getDataById(props.data.training, atde.training)
            .name + ";";
      });
      dt["attendence"] = s;
      out.push(dt);
    });
    jsonDataForDownload(out, "ZeroAttendence");
  };

  const customStyles = { width: '300px' };

  return (
    <>

      <div className="maincont">
        <div className="leftcont">
          <ul className="ul" style={{ padding: "0.5rem" }}>
            <li className="li" style={{ width: "100%" }} id="li1">
              <MDBDropdown dropright group bsStyle="default" style={{ width: "100%" }}>
                <MDBDropdownToggle bsStyle="default" style={{ backgroundColor: currentTraining == null ? '#223343' : '#1560BD', width: "100%" }}>Training</MDBDropdownToggle>
                <MDBDropdownMenu bsStyle="default" style={{ width: "100%", color: "white" }}>
                  <FilterPop
                    selected={openTraining}
                    heading={"Training"}
                    data={props.data.training}></FilterPop>
                </MDBDropdownMenu>
              </MDBDropdown>
            </li>

            {console.log(currentEmp)}

            <li className="li" >
              <MDBDropdown dropright group bsStyle="default" style={{ width: "100%" }}>
                <MDBDropdownToggle bsStyle="default" style={{ backgroundColor: currentDept == null ? '#223343' : '#1560BD', width: "100%" }}  >Departments</MDBDropdownToggle>
                <MDBDropdownMenu bsStyle="default" style={{ width: "100%", color: "white" }}>
                  <FilterPop
                    selected={openDepartment}
                    heading={"Department"}
                    data={props.data.department}
                  ></FilterPop>
                </MDBDropdownMenu>
              </MDBDropdown>
            </li>

            <li className="li" onClick={openEmployee}>
              <MDBDropdown dropright group bsStyle="default" style={{ width: "100%" }}>
                <MDBDropdownToggle bsStyle="default" style={{ backgroundColor: currentEmp == null ? '#223343' : '#1560BD', width: "100%" }}>Employee</MDBDropdownToggle>
                <MDBDropdownMenu bsStyle="default" style={{ width: "100%", color: "white" }}>
                  <FilterPop
                    selected={openEmployee}
                    nosubHeader={true}
                    heading={"Employees"}
                  ></FilterPop>
                </MDBDropdownMenu>
              </MDBDropdown>
            </li>
          </ul>
        </div>
        <div className="rightcont">
          <div className="needbot">
            {!currentEmp && (
              <div style={{ paddingLeft: "0.75rem", paddingTop: "0.75rem" }}>

                <table className="tabl" id="wfull">
                  <thead>
                    <tr>
                      {columnHeaders.map((header) => (
                        <th key={header}>{header.toUpperCase()}</th>
                      ))}
                      {currentTraining && <th>Click</th>}
                    </tr>
                  </thead>
                  <tbody style={{ backgroundColor: "white" }}>
                    {currentTable.map((element) => {
                      let trainingData = element;
                      return (
                        <tr>
                          {columnHeaders.map((header) => (
                            <>
                              <td>
                                {header === "document" ? (
                                  <a href={"http://" + window.location.hostname + ":8000/media/" + trainingData[header]}>Click here</a>
                                ) : header == "training" ? (
                                  <>
                                    {trainingData[header].map((train, index) => (
                                      <div>
                                        {index +
                                          1 +
                                          ") " +
                                          props.dataHandler.getDataById(
                                            props.data.training,
                                            train
                                          ).name}
                                      </div>
                                    ))}
                                  </>
                                ) : (
                                  trainingData[header]
                                )}
                              </td>
                            </>
                          ))}
                          {currentTraining && (
                            <td>
                              <a
                                onClick={() => {
                                  setShowSchedule(element.id);
                                  console.log(element);
                                  openPopup();
                                }}
                              >
                                &rarr;
                              </a>
                            </td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}



            <br></br>
            <br></br>
            {currentTraining && (
              <div>
                <h2 style={{ paddingLeft: "1rem" }}>&nbsp;Departments :</h2>
                <ul style={{ paddingLeft: 0 }}>
                  {props.data.trainingDeptAttendence[currentTraining] ==
                    null ? (
                    <><div style={{ paddingLeft: "1.75rem" }}>No Departments trained</div></>
                  ) : (
                    <div className="boxnew">
                      <DeptBox
                        disdata={
                          props.data.trainingDeptAttendence[currentTraining]
                        }
                        showDepartment={setShowDepartment}
                        setDeptPop={setDeptPop}
                        data={props.data}
                      />
                    </div>
                  )}
                </ul>
              </div>
            )}
            {currentDept && (
              <div>
                <h2 style={{ paddingLeft: "1rem" }}>&nbsp;Trainings :</h2>
                <ul className="deptna">
                  {props.data.revlinks[currentDept] == null ? (
                    <>No Trainings done</>
                  ) : (
                    props.data.revlinks[currentDept].map((dept) => {
                      let ct = 0;
                      if (props.data.employeebyTraining[dept] != null)
                        ct = props.data.employeebyTraining[dept].length
                      colorcount += 1;
                      return (


                        <li className="deptli" style={{ backgroundColor: items[colorcount % items.length] }}>
                          <div className="line">
                            <h6>   {
                              props.data.training.filter((dt) => dt.id == dept)[0]
                                .name
                            }</h6>
                          </div>
                          <hr style={{ border: "1px solid white", borderRadius: "0.5rem", width: "85%" }}></hr>
                          <div>
                            <p className="sizereduce">Number of Employees Trained: {ct}</p>
                          </div>
                        </li>

                      );
                    })
                  )}
                </ul>
              </div>
            )}
            {currentEmp && (
              <div style={{ paddingLeft: "2rem" }}>
                <h2>&nbsp;Employee Filter :</h2>
                <br></br>
                <label style={{ color: "black" }} for="dept">
                  &nbsp;&nbsp;Department :&nbsp;&nbsp;
                </label>
                <select
                  id="dept"
                  onChange={(e) => {
                    setCurrentEmp(e.target.value);
                  }}
                >
                  {props.data.department.map((dept) => {
                    return <option value={dept.id}>{dept.name}</option>;
                  })}
                </select>
                <br></br>
                <br></br>
                <label style={{ color: "black" }}>
                  &nbsp;&nbsp;Employee :&nbsp;&nbsp;
                </label>
                <input
                  type="text"
                  placeholder="EMPLOYEE ID"
                  onChange={(e) => setEmplFil(e.target.value)}
                ></input>
                <br></br>
                <br></br>
                <div>
                  <table id="ta">
                    <thead>
                      <tr id="thh">
                        <th style={{ padding: "8px", width: "150px" }}>EMP ID</th>
                        <th style={{ padding: "8px", width: "150px" }}>
                          EMP NAME
                        </th>
                        <th style={{ padding: "8px", width: "350px" }}>
                          Attendence Details
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {props.data.deptSpecificAttendence[currentEmp].map(
                        (empl) => {
                          return empl.emp_id.toLowerCase().includes(emplFil) ||
                            emplFil == "" ? (
                            <tr>
                              <td id="bc" style={{ color: "black" }}>
                                {empl.emp_id}
                              </td>
                              <td id="bcc" style={{ color: "black" }}>
                                {empl.emp_name}
                              </td>
                              <td id="bccc" style={{ color: "black" }}>
                                {empl.attendence_details.map((atde) => {
                                  return (
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                      <div>
                                        {
                                          props.dataHandler.getDataById(
                                            props.data.training,
                                            atde.training
                                          ).name
                                        }
                                      </div>

                                      <div>

                                        {
                                          atde.attended_days
                                        }
                                      </div>
                                    </div>
                                  );
                                })}
                              </td>
                            </tr>
                          ) : (
                            <></>
                          );
                        }
                      )}
                    </tbody>
                    <br></br>
                    <br></br>
                    <div style={{ display: "flex" }}>
                      <button
                        className="expand-btn"
                        style={{
                          padding: "0.5rem",
                          width: "200px",
                          marginRight: "3rem",
                        }}
                        onClick={dataNormal}
                      >
                        Download
                      </button>

                      <button
                        className="expand-btn"
                        style={{
                          padding: "0.5rem",
                          width: "200px",
                        }}
                        onClick={() => {
                          setNullattend(true);
                        }}
                      >
                        Show Not Attended
                      </button>
                    </div>
                  </table>

                  {nullattend && (
                    <div className="finalpop">
                      <button
                        id="close"
                        onClick={() => {
                          setNullattend(false);
                        }}
                        style={{
                          color: "white",
                          position: "absolute",
                          right: "5%",
                        }}
                      >
                        Close
                      </button>

                      <div className="finaldiv">
                        <div
                          id="wrapper"
                          style={{
                            padding: "2rem",
                            backgroundColor: "#222e3c",
                            borderRadius: "10px",
                          }}
                        >
                          <table id="ta" style={{}}>
                            <tr id="thh">
                              <th style={{ padding: "8px" }}>EMP ID</th>
                              <th style={{ padding: "8px", width: "150px" }}>EMP NAME</th>
                              <th style={{ padding: "8px", width: "250px" }}>
                                Attendence Details
                              </th>
                            </tr>
                            {props.data.deptSpecificAttendence[currentEmp].map(
                              (empl) => {
                                let hasNull = false;
                                empl.attendence_details.map((atde) => {
                                  if (atde.attended_days == 0) hasNull = true;
                                });
                                if (hasNull)
                                  return (
                                    <tr>
                                      <td id="bc" style={{ color: "black" }}>
                                        {empl.emp_id}
                                      </td>
                                      <td id="bcc" style={{ color: "black" }}>
                                        {empl.emp_name}
                                      </td>
                                      <td id="bccc" style={{ color: "black" }}>
                                        {empl.attendence_details.map((atde) => {
                                          if (atde.attended_days == 0)
                                            return (
                                              <div>
                                                {
                                                  props.dataHandler.getDataById(
                                                    props.data.training,
                                                    atde.training
                                                  ).name
                                                }
                                              </div>
                                            );
                                        })}
                                      </td>
                                    </tr>
                                  );
                                else return <></>;
                              }
                            )}
                            <br></br>

                            <button
                              className="expand-btn"
                              style={{ width: "100%", padding: "0.5rem" }}
                              onClick={dataNoAttend}
                            >
                              Download
                            </button>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {
        isPopupOpen && (
          <PopForAddon data={props.data} scheduleID={showSchedule}></PopForAddon>
        )
      }
      {
        isPopupOpen && (
          <button
            className="close-btn"
            style={{ position: "absolute", top: "50px", right: "50px" }}
            onClick={() => setIsPopupOpen(false)}
          >
            &#10006;
          </button>
        )
      }

      {deptPop && <DeptPop data={props.data} emp={showDepartment}></DeptPop>}
      {
        deptPop && (
          <button
            className="close-btn"
            style={{ position: "absolute", top: "50px", right: "50px" }}
            onClick={() => setDeptPop(false)}
          >
            &#10006;
          </button>
        )
      }

      {isAttendenceOpen && <PopForAddon></PopForAddon>}
      {
        isAttendenceOpen && (
          <button
            className="close-btn"
            style={{ position: "absolute", top: "50px", right: "50px" }}
            onClick={() => setIsAttendenceOpen(false)}
          >
            &#10006;
          </button>
        )
      }
    </>
  );
};

export default Additional_Filter;
