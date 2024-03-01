import React from 'react';
import '../Styles/table.css'
const ScheduleTable = (props) => {

  let clone = (data) => {
    return JSON.parse(JSON.stringify(data));
  }

  let data = [];
  props.data.map((element) => {
    let cl = clone(element);
    delete cl.created_at;
    cl.from_date = cl.from_date.slice(0, 10);
    cl.to_date = cl.to_date.slice(0, 10);
    delete cl.id;
    delete cl.name_id;
    delete cl.trainer_id;
    delete cl.updated_at;
    delete data.push(cl);
  })





  const columnHeaders = Object.keys(data[0]);

  return (
    <div className='needbot'>
      <table className='tabl' id='wfull'>
        <thead>
          <tr>
            {columnHeaders.map((header) => (
              <th key={header}>{header.toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody style={{ backgroundColor: "white" }}>
          {
            data.map(element => {
              let trainingData = element;
              return <tr>
                {columnHeaders.map((header) => (
                  <>
                    <td>{header === 'document' ? <a href={trainingData[header]}>Click here</a> : trainingData[header]}</td>
                  </>
                ))}
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;