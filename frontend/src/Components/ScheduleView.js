import React, { useState } from 'react';
import '../Styles/Filter.css'  
import search from '../images/search.jpeg'
import DataHandler from '../Utility/DataHandler';
import ScheduleTable from './ScheduleTable';


const ScheduleView = ( props) => {

  let onClose = props.onClose;
  

    const clone = (data)=>{
        return JSON.parse(JSON.stringify(data));
    }
    
    let outList = []
    props.data.schedule.forEach(element => {
        if(props.data.filter.training.filter(ele=>ele.id==element.name_id) && props.fromDate<=element.from_date && props.toDate>=element.to_date){
            let outD = clone(element);
            outD.training = props.dataHandler.getTrainingById(props.data,element.name_id).name;
            let trainer = props.dataHandler.getTrainerById(props.data,element.trainer_id)
            outD.trainer = trainer.name;
            outD.trainerType = trainer.category;
            outList.push(outD);
        }
    });
    console.log(outList)

  return (
    <div className="popup">
      <div className="popup-content">
        <div className='main-2'>
          <div className='content-2' style={{width:"90%"}}>
            <div style={{width:"100%"}}>
                <button  className='close-btn' onClick={onClose}>&#10006;</button>
                <ScheduleTable data={outList}></ScheduleTable>
            </div>
                   
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleView;


