import { useState, useEffect } from "react";
import "../Styles/GraphContainer.css";
import { Node } from "./Node";
import { Circle } from "./Circle";

export const GraphContainer = (props) => {
  const [linkState, setLinkState] = useState([]);
  const [revlinkState, setRevLinkState] = useState([]);

  const [buttonName, setButtonName] = useState(false);
  if (!props.data) return <></>;

  const changeName = () => {
    if (buttonName) props.dataHandler.fillFilter(props.data);
    else props.dataHandler.emptyFilter(props.data);

    setButtonName(!buttonName);
  };

  let inner = props.data.department;
  let outer = props.data.training;
  let perAngleInner = 360 / inner.length;
  let perAngleOuter = 360 / outer.length;

  let outerRadius = window.innerWidth * 0.6 * 0.5 * 0.45;
  let innerRadius = window.innerWidth * 0.6 * 0.5 * 0.2;

  let highLightDept = [];
  let highLightTraining = [];

  props.data.filter.training.forEach((element) => {
    highLightTraining.push(element.id);
  });
  props.data.filter.department.forEach((element) => {
    highLightDept.push(element.id);
  });

  const trainingClick = (ele) => {
    if (highLightTraining.includes(ele.id)) {
      props.dataHandler.removeTraining(props.data, ele);
    } else props.dataHandler.addTraining(props.data, ele);
  };
  const deptClick = (ele) => {
    if (highLightDept.includes(ele.id))
      props.dataHandler.removeDepartment(props.data, ele);
    else props.dataHandler.addDepartment(props.data, ele);
  };
  const inverseFilter = (ele) => {
    props.dataHandler.inverseFilter(props.data);
  };

  const addLinkState = (training_id) => {
    let k = props.data.links[training_id];
    if (k == null) {
      k = [];
    }
    setLinkState(k);
  };
  const removeLinkState = () => {
    setLinkState([]);
  };
  const addRevlinkState = (department_id) => {
    let k = props.data.revlinks[department_id];
    console.log(k);
    if (k == null) {
      k = [];
    }
    setRevLinkState(k);
  };
  const removeRevlinkState = () => {
    setRevLinkState([]);
  };

  return (
    <div className="graph-container">
      <div className="inner-graph">
        <div className="centroid">
          <Circle radius={outerRadius * 2}></Circle>
          <Circle radius={innerRadius * 2}></Circle>
          {outer.map((value, index) => {
            let angle = index * perAngleOuter;
            return (
              <Node
                clickOpr={trainingClick}
                handleLink={[addLinkState, removeLinkState]}
                linkActive={revlinkState.includes(value.id)}
                active={highLightTraining.includes(value.id)}
                value={value}
                radius={30}
                positionRadius={outerRadius}
                angle={angle}
              ></Node>
            );
          })}
          {inner.map((value, index) => {
            let angle = index * perAngleInner;

            return (
              <Node
                clickOpr={deptClick}
                handleLink={[addRevlinkState, removeRevlinkState]}
                linkActive={linkState.includes(value.id)}
                active={highLightDept.includes(value.id)}
                value={value}
                radius={30}
                positionRadius={innerRadius}
                angle={angle}
              ></Node>
            );
          })}
          <Node
            clickOpr={inverseFilter}
            renderImg={true}
            value={"center"}
            handleLink={[() => {}, () => {}]}
            radius={innerRadius * 2 - 50}
            positionRadius={0}
          ></Node>
        </div>
      </div>
      <button className="togglebtn" onClick={changeName}>
        {buttonName ? "Select ALL" : "Deselect ALL"}
      </button>
    </div>
  );
};
