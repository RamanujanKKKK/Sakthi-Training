import React, { useState } from 'react';
import Add_Filter from './Add_Filter';
const DeptPop = (props) => {

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(10000);


    return (
        <div className='lastfilter'>
            <div className='con'>
                <center><h1>Attendence Details:</h1></center>
                <br></br>
                <div>
                    <table className='attend'>
                        <tr>
                            <th>Emp ID</th>
                            <th>Employee Name</th>
                            <th>Has Attended</th>

                        </tr>
                        {props.emp.map((e) => {
                            console.log(min,max,e.attendedDays);
                            if ((id == '' || e.id.includes(id)) && (name == '' || e.name.includes(name)) && min<=e.attendedDays && max>=e.attendedDays) {
                                let emp = props.data.employees.filter((ele) => ele.id == e.id)[0];
                                return (<tr>
                                    <td>{emp.id}</td>
                                    <td>{emp.name}</td>
                                    <td>{e.attendedDays}</td>
                                </tr>)
                            }
                        })}
                        {/* else {
                                    if (emp.id.contains(id) && emp.name.contains(name) && e.attendedDays > min) {
                                props.emp.map((e) => {
                                    let emp = props.data.employees.filter((ele) => ele.id == e.id)[0];
                                    return (<tr>
                                        <td>{emp.id}</td>
                                        <td>{emp.name}</td>
                                        <td>{e.attendedDays}</td>
                                    </tr>)

                                })}
                                } */}

                    </table>
                </div>
                <br></br>
                <Add_Filter id={id} setId={setId} name={name} setName={setName} min={min} setMin={setMin} max={max} setMax={setMax}></Add_Filter>
            </div>

        </div>
    )
}

export default DeptPop