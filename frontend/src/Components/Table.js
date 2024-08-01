import React from 'react';
import '../Styles/table.css'
const Table = (props) => {

  let clone = (data) => {
    return JSON.parse(JSON.stringify(data));
  }

  let data = [];
  props.data.map((element) => {
    let cl = clone(element);
    delete cl['created_at']
    delete cl['updated_at']

    data.push(cl);
  })




  if(data.length==0) data.push({"No data Available":true})
  const columnHeaders = Object.keys(data[0]);

  return (
    <div className='needbot' style={{overflowY:"scroll",height:"80%",marginTop:"5%"}}>
      <div id='heightrest'>
        <table className='tabl' style={{color:"black"}} id='wfull'>
          <thead >
            <tr>
              {columnHeaders.map((header) => (
                <th key={header}>{header.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody style={{ backgroundColor: "white",color:"black" }}>
            {
              data.map(element => {
                let trainingData = element;
                return <tr>
                  {columnHeaders.map((header) => (
                    <>
                      <td>{trainingData[header]}</td>
                    </>
                  ))}
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;