import React from 'react'

const PopForAddon = (props) => {
    return (
        <div className='lastfilter'>
            <div className='con'>
                <center><h1>Nomination Details:</h1></center>
                <br></br>
                <div>
                    <table className='attend'>
                        <tr>
                            <th>Emp ID</th>
                            <th>Employee Name</th>
                            <th>Has Attended</th>

                        </tr>
                        {props.data.trainingAttendenceEmp[props.scheduleID].map((e) => {
                            console.log(e);
                            let emp = props.data.employees.filter((ele) => ele.id == e.employee_id)[0];
                            return (<tr>
                                <td>{emp.id}</td>
                                <td>{emp.name}</td>
                                <td>{e.attended ? "true" : "false"}</td>



                            </tr>)
                        })}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default PopForAddon