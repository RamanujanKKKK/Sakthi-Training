import React, { useState } from 'react';
import '../Styles/Filter.css'  
import search from '../images/search.jpeg'
import DataHandler from '../Utility/DataHandler';


const Filter = ( props) => {

  let onClose = props.onClose;
  const handleChange = (event) => {
    if (event.target.value !== "test") {
      setList2([...list2,  ...props.data.department.filter(name=>name.name==event.target.value) ]);
      const updatedList1 = list1.filter(name => name.name !== event.target.value);
      setList1(updatedList1);
      console.log(props.dataHandler.addDepartment);
      props.dataHandler.addDepartment(props.data,props.data.department.filter(name=>name.name==event.target.value)[0])

    }
  };
  const handleChangeTraining = (event) => {
    if (event.target.value !== "test") {

      setTraining2([...training2,  ...props.data.training.filter(name=>name.name==event.target.value) ]);
      const updatedList1 = training1.filter(name => name.name !== event.target.value);
      setTraining1(updatedList1);
      props.dataHandler.addTraining(props.data,...props.data.training.filter(name=>name.name==event.target.value))

    }
  };
  const [list1, setList1] = useState(
    props.data.department.filter(x => !props.data.filter.department.includes(x))
  );
  const [list2, setList2] = useState(props.data.filter.department);

  const [training1, setTraining1] = useState(
    props.data.training.filter(x => !props.data.filter.training.includes(x))
  );
  console.log()
  const [training2, setTraining2] = useState(props.data.filter.training);


  const onRemove = (nameToRemove) => {
    const updatedList2 = list2.filter(employee => employee.name !== nameToRemove.name);
    setList2(updatedList2);
    let l2 = [...list1, nameToRemove].sort((a,b)=>a.name-b.name);
    setList1(l2);
    console.log(props.dataHandler.removeDepartment);
    props.dataHandler.removeDepartment(props.data,nameToRemove);

  };
  const onRemoveTraining = (nameToRemove) => {

    const updatedList2 = training2.filter(employee => employee.name !== nameToRemove.name);
    setTraining2(updatedList2);
    let l2 = [...training1, nameToRemove].sort((a,b)=>a.name-b.name);
    setTraining1(l2);
    props.dataHandler.removeTraining(props.data,nameToRemove);

  };

  
  const onFromDateChange = (e)=>{
    props.setFromDate(e.target.value);
  }
  const onToDateChange = (e)=>{
    props.setToDate(e.target.value);
  }

  return (
    <div className="popup">
      <div className="popup-content">
        <div className='main-2'>
          <div className='content'>
            <div className='text'>
              <div>
            <button  id="close" onClick={onClose} style={{color:"white"}}>Close</button>
                <div className='fc'>
                  <div className='left'>
                    <h3>From : </h3><input value={props.fromDate} onChange={onFromDateChange} type='date'></input> &nbsp;&nbsp;&nbsp;
                  </div>
                  <div>
                    <h3>To : </h3><input value={props.toDate} onChange={onToDateChange} type='date'></input><br></br><br></br>
                  </div>
                </div>
                <div>
                  <h3 htmlFor="mySelect">Department :</h3>
                  <select id="mySelect" onChange={handleChange}>
                    <option value="test">Choose your dept</option>
                    {list1.map((data, index) => (
                      <option value={data.name}>{data.name}</option>
                    ))}
                  </select>
                </div>
                <div className='text'>
                  {list2.map((data, index) => (
                    <div key={index} className='fc optval'>
                      <span className='valuelist'>{data.name}</span>
                      <div className='button'>
                        <button className='itemclose' onClick={() => onRemove(data)}>&#10006;</button>
                      </div>
                    </div>
                  ))}
                  <div>
                  </div>
                </div>
                <br></br>
                <div>
                  <h3 htmlFor="mySelect">Training :</h3>
                  <select id="mySelect" onChange={handleChangeTraining}>
                    <option value="test">Select your training</option>
                    {training1.map((data, index) => (
                      <option value={data.name}>{data.name}</option>
                      ))}
                  </select>
                </div>
                      
                <div className='text'>
                  {training2.map((data, index) => (
                    <div key={index} className='fc optval'>
                      <span className='valuelist'>{data.name}</span>
                      <div className='button'>
                        <button className='itemclose' onClick={() => onRemoveTraining(data)}>&#10006;</button>
                      </div>
                    </div>
                  ))}
                  <div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;


