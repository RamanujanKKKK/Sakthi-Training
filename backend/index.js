const express = require("express");
const { DBActionC } = require("./db.js");

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const PORT = 801;

app.get("/", async (req, res) => {
  res.status(200);
  let DBAction = new DBActionC();
  employees = await DBAction.getTableData("training_employee");
  designation = await DBAction.getTableData("training_designation");
  department = await DBAction.getTableData("training_department");

  trainingType = await DBAction.getTableData("training_trainingtype");
  nomination = await DBAction.getTableData("training_trainingnomination");
  trainingDepartment = await DBAction.getTableData(
    "training_trainingtype_department"
  );

  trainer = await DBAction.getTableData("training_trainer");
  attendees = await DBAction.getTableData("training_trainingattendance");
  externalTraining = await DBAction.getTableData("training_externaltraining");
  externalAttendees = await DBAction.getTableData(
    "training_externaltraining_list_of_attendees"
  );

  attendence = await DBAction.getTableData("training_trainingattendance");
  schedule = await DBAction.getTableData("training_trainingschedule");

  data = {
    training: trainingType,
    department: department,
    links: {},
    revlinks: {},
    linkWemp: {},
    trainingCount: {},
    departmentCount: {},
    employeebyTraining: {},
    employeebyDept: {},
    trainer: trainer,
    schedule: schedule,
    employees: employees,
    designation: designation,
    empunderTrain: 0,
    trainingBySchedules: {},
    trainingAttendenceEmp: {},
    trainingDeptAttendence: {},
    deptSpecificAttendence: {},
    DbarGF: {},
    filter: {
      training: trainingType,
      department: department,
    },
  };
  trainingDepartment.forEach((element) => {
    if (data.links[element.trainingtype_id]) {
      data.links[element.trainingtype_id].push(element.department_id);
    } else {
      data.links[element.trainingtype_id] = [element.department_id];
    }
  });
  trainingDepartment.forEach((element) => {
    if (data.revlinks[element.department_id]) {
      data.revlinks[element.department_id].push(element.trainingtype_id);
    } else {
      data.revlinks[element.department_id] = [element.trainingtype_id];
    }
  });

  nomination.forEach((element) => {
    if (data.trainingCount[element.training_id]) {
      data.trainingCount[element.training_id] += 1;
    } else {
      data.trainingCount[element.training_id] = 1;
    }
  });
  // nomination.forEach(element => {
  // 	let dept = DBAction.getDataById(employees,element.employee_id);
  // 	if(data.departmentCount[dept.id]){
  // 		data.departmentCount[dept.id]+=1;
  // 	}
  // 	else{
  // 		data.departmentCount[dept.id]=1
  // 	}
  // });

  nomination.forEach((element) => {
    if (data.linkWemp[element.trainingtype_id]) {
      data.linkWemp[element.trainingtype_id].push(element.employee_id);
    } else {
      data.linkWemp[element.trainingtype_id] = [element.employee_id];
    }
  });

  employees.forEach((element) => {
    if (data.employeebyDept[element.department_id]) {
      let k = DBAction.clone(element);
      k.training = [];
      delete k["created_at"];
      delete k["updated_at"];
      k["department_name"] = DBAction.getDataById(
        department,
        element.department_id
      ).name;
      delete k["department_id"];
      k["designation_name"] = DBAction.getDataById(
        designation,
        k["designation_id"]
      ).name;
      delete k["designation_id"];
      data.employeebyDept[element.department_id].push(k);
    } else {
      let k = DBAction.clone(element);
      k.training = [];
      delete k["created_at"];
      delete k["updated_at"];
      k["department_name"] = DBAction.getDataById(
        department,
        element.department_id
      ).name;
      delete k["department_id"];
      k["designation_name"] = DBAction.getDataById(
        designation,
        k["designation_id"]
      ).name;
      delete k["designation_id"];
      data.employeebyDept[element.department_id] = [k];
    }
  });

  nomination.forEach((element) => {
    if (data.employeebyTraining[element.training_id] != null) {
      let k = DBAction.getDataById(employees, element.employee_id);
      data.employeebyDept[k.department_id]
        .filter((ele) => ele.id == k.id)[0]
        .training.push(element.training_id);
      data.employeebyTraining[element.training_id].push(k);
    } else {
      let k = DBAction.getDataById(employees, element.employee_id);
      data.employeebyDept[k.department_id]
        .filter((ele) => ele.id == k.id)[0]
        .training.push(element.training_id);
      data.employeebyTraining[element.training_id] = [k];
    }
  });

  Object.keys(data.employeebyDept).forEach((key) => {
    data.employeebyDept[key].forEach((ele) => {
      if (ele.training.length != 0) {
        data.empunderTrain += 1;
        if (data.departmentCount[key] != null) {
          data.departmentCount[key] += 1;
        } else {
          data.departmentCount[key] = 1;
        }
      }
    });
  });

  trainingType.forEach((element) => {
    data.trainingBySchedules[element.id] = [];
  });

  schedule.forEach((element) => {
    let ele = DBAction.clone(element);
    delete ele["name_id"];
    delete ele["created_at"];
    delete ele["updated_at"];
    delete ele["name_id"];
    ele.TrainerName = DBAction.getDataById(trainer, ele["trainer_id"]).name;
    delete ele["trainer_id"];

    data.trainingBySchedules[element.name_id].push(ele);
  });

  schedule.forEach((element) => {
    let nominated = nomination.filter((ele) => ele.training_id == element.id);
    let out = [];
    nominated.forEach((nomin) => {
      let el = DBAction.clone(nomin);
      if (
        attendees.filter(
          (ele) =>
            ele.training_id == element.id &&
            ele.employee_id == nomin.employee_id
        ).length == 0
      ) {
        el.attended = false;
      } else {
        el.attended = true;
      }
      out.push(el);
    });
    data.trainingAttendenceEmp[element.id] = out;
  });

  trainingType.forEach((training) => {
    data.DbarGF[training.id] = { value: training.name };
    let su = 0;
    schedule.forEach((sch) => {
      if (sch.name_id == training.id) {
        su += sch.duration;
      }
    });
    data.DbarGF[training.id].total = su;
    data.DbarGF[training.id].emp = [];
  });

  trainingDepartment.forEach((element) => {
    let empl = employees.filter(
      (ele) => ele.department_id == element.department_id
    );
    let out = [];
    let schedul = schedule.filter(
      (ele) => ele.name_id == element.trainingtype_id
    );
    let schedules = [];
    schedul.forEach((ele) => {
      schedules.push(ele.id);
    });
    empl.forEach((emply) => {
      let k2 = attendees.filter((ele) => schedules.includes(ele.training_id));
      let k = attendees.filter(
        (ele) =>
          schedules.includes(ele.training_id) && ele.employee_id == emply.id
      );
      let su = 0;
      k.forEach((atd) => {
        su += atd.attended_days;
      });
      k = DBAction.clone(emply);
      k.attendedDays = su;
      out.push(k);
      data.DbarGF[element.trainingtype_id].emp.push(su);
      // console.log(su);
    });
    if (data.trainingDeptAttendence[element.trainingtype_id]) {
      data.trainingDeptAttendence[element.trainingtype_id].push({
        dpt: element.department_id,
        emp: out,
      });
    } else {
      data.trainingDeptAttendence[element.trainingtype_id] = [
        { dpt: element.department_id, emp: out },
      ];
    }
  });
  department.forEach((dept) => {
    let empl = employees.filter((ele) => ele.department_id == dept.id);
    let trainings = data.revlinks[dept.id];
    let schedules = [];
    if (trainings)
      trainings.forEach((training_id) => {
        schedules.push(schedule.filter((ele) => ele.name_id == training_id));
      })

    let out = [];
    empl.forEach((emp) => {
      if (trainings) {
        let smallout = []
        schedules.forEach((schedul, index) => {
          let su = 0;
          schedul.forEach((ele) => {
            let k = attendees.filter((att) => att.training_id == ele.id && att.employee_id == emp.id);
            if (k.length > 0) su += k[0].attended_days;
          })
          smallout.push({ training: trainings[index], attended_days: su });
        })
        out.push({ emp_id: emp.emp_id, emp_name: emp.name, attendence_details: smallout });
      }
      else {
        out.push({ emp_id: emp.emp_id, emp_name: emp.name, attendence_details: "No trainings" });
      }
    })
    data.deptSpecificAttendence[dept.id] = out;

  });

  console.log(data.deptSpecificAttendence)
  res.send(data);
  DBAction = null;

  res.end();
});

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
