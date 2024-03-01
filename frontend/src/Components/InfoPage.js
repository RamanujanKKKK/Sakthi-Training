import {useState,useEffect} from 'react'
import Dropdown from './Dropdown';
import '../Styles/table.css'
import * as XLSX from 'xlsx';

const InfoPage = (props) =>{


    const [filterDept,setFilterDept] = useState([]);
    const addDept = (id) => {
        setFilterDept([...filterDept,id])
    };
    const removeDept = (id) =>{
        setFilterDept(filterDept.filter((ele)=>ele!=id));
    }
    const [filterTraining,setFilterTraining] = useState([]);
    const addTraining = (id) => {
        setFilterTraining([...filterTraining,id])
    };
    const removeTraining = (id) =>{
        setFilterTraining(filterTraining.filter((ele)=>ele!=id));
    }
    let iterList = []
    Object.keys(props.data.employeebyDept).map((dept_id)=>{
        if(filterDept.includes(dept_id) || filterDept.length==0){
            let dept = props.dataHandler.getDeptById(props.data,dept_id);
            
        props.data.employeebyDept[dept_id].forEach(emp => {
            let empToOut = {emp_id:emp.id,name:emp.name,dept:dept.name,trainings:[]};
            emp.training.forEach((training_id)=>{
                let training = props.dataHandler.getTrainingById(props.data,training_id);
                if(filterTraining.length==0 || filterTraining.includes(training_id)){
                    empToOut.trainings.push(training.name)

                }
            })
            if(!(empToOut.trainings.length==0 && filterTraining.length!=0))
            iterList.push(empToOut);
        });
        }
    })

    console.log(filterDept)
    let clone = (data)=>{
        return JSON.parse(JSON.stringify(data));
    }
    let jsonDataForDownload = (data)=>{
        let d2 = [];
        data.map(element=>{
            let k = clone(element);
            k.trainings = k.trainings.join(",")
            d2.push(k);
        })
        const worksheet = XLSX.utils.json_to_sheet(d2);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "DataSheet.xlsx");
    }

    if(props.reqDown[0]){
        jsonDataForDownload(iterList);
        props.reqDown[1](false);
    }

    return <div style={{padding:"10px"}}>
        <div>
            <div className='heading-infopage'>
              Employee Filter
            </div>
            <div className='filter-info'>
              <Dropdown name={"Trainings"} data={props.data.training} addData={addTraining} removeData={removeTraining}/>
              <Dropdown name={"Departments"} data={props.data.department} addData={addDept} removeData={removeDept}/>
            </div>
            <div className='table'>
                <table className='tabl'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Training</th>
                    </tr>
                </thead>
                <tbody>
                    {iterList.map((ele) => (
                        <tr>
                            <td>{ele.name}</td>
                            <td>{ele.dept}</td>
                            <td>{ele.trainings.join(",")}</td>
                        </tr>
                    ))}

                </tbody>

            </table>
            </div>
        </div>
    </div>;
}
export default InfoPage;