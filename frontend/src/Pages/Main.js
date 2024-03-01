import { useState, useEffect } from "react";
import "../Styles/Main.css";
import { GraphContainer } from "../Components/GraphContainer";
import { InfoContainer } from "../Components/InfoContainer";
import axios from "axios";
import Filter from "../Components/Filter";
import search from "../images/search.png";
import "../Styles/Filter.css";
import DataHandler from "../Utility/DataHandler";
import ScheduleView from "../Components/ScheduleView";
import calender from "../images/calender.png";
import Navbar from "../Components/Navbar";
import Additional_Filter from "./Additional_Filter";
import DoubleBar from "../Components/DoubleBar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export const Main = () => {
  let [data, dataH] = useState();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isPopupOpen2, setPopupOpen2] = useState(false);
  const [isPopupOpen3, setPopupOpen3] = useState(false);

  const [isExpanded, setExpanded] = useState(false);
  const [isSchedule, setSchedule] = useState(false);

  let [dataHandler, dhh] = useState(null);

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };
  const handleOpenSchedule = () => {
    setSchedule(true);
  };

  const handleCloseSchedule = () => {
    setSchedule(false);
  };

  useEffect(() => {
    axios.get("http://"+window.location.hostname+":801/").then((response) => {
      dataH(response.data);
    });
    dhh(new DataHandler(dataH));
  }, []);

  const [fromDate, setFromDate] = useState("0001-01-01T18:30:00.000Z");
  const [toDate, setToDate] = useState(new Date().toISOString());

  const [isPopupVisible, setPopupVisibility] = useState(false);
  const handleMouseEnter = () => {
    setPopupVisibility(true);
  };
  const handleMouseLeave = () => {
    setPopupVisibility(false);
  };

  return (
    <>
      <Router>
        <>
          {!isExpanded && !isSchedule && <Navbar></Navbar>}
          <Switch>
            <Route exact path="/">
              <>
                <div className="main" style={{ position: "relative" }}>
                  {!isExpanded && !isSchedule ? (
                    <>
                      <button className="popupmodal" onClick={handleOpenPopup}>
                        Filter &nbsp;<img className="filter" src={search}></img>
                      </button>
                      <div
                        className="schedulemodal"
                        onClick={handleOpenSchedule}
                      >
                        <img className="caln" src={calender}></img>
                      </div>
                      <GraphContainer
                        className="graph-container"
                        data={data}
                        dataHandler={dataHandler}
                      ></GraphContainer>
                    </>
                  ) : null}
                  <InfoContainer
                    className="info-container"
                    isVisible={isPopupVisible}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    data={data}
                    dataHandler={dataHandler}
                    expand={[isExpanded, setExpanded]}
                  ></InfoContainer>
                </div>

                {isPopupOpen && (
                  <Filter
                    fromDate={fromDate}
                    toDate={toDate}
                    setFromDate={setFromDate}
                    setToDate={setToDate}
                    onClose={handleClosePopup}
                    data={data}
                    dataHandler={dataHandler}
                  />
                )}
                {isSchedule && (
                  <ScheduleView
                    fromDate={fromDate}
                    toDate={toDate}
                    onClose={handleCloseSchedule}
                    data={data}
                    dataHandler={dataHandler}
                  />
                )}
              </>
            </Route>
            <Route exact path="/filter">
              <Additional_Filter
                data={data}
                dataHandler={dataHandler}
              ></Additional_Filter>
            </Route>
          </Switch>
        </>
      </Router>
    </>
  );
};
