const DeptBox = (props) => {
  const items = [
    "#2C3E50", // Dark Blue-Gray
    "#2980B9", // Bright Blue
    "#8E44AD", // Purple
    "#16A085", // Teal
    "#27AE60", // Green
    "#F39C12", // Orange
    "#D35400", // Dark Orange
    "#C0392B", // Red
    "#7F8C8D", // Gray
    "#34495E", // Dark Gray-Blue
    "#1F3A93", // Midnight Blue
    "#22313F", // Steel Blue
    "#96281B", // Dark Red
    "#1C2833", // Charcoal
    "#6C3483"  // Dark Purple
  ];
  
  let count = 0;
  return (
    <ul className="deptna">
      {props.disdata.map((dept) => {
        let deptData = props.data.department.filter(
          (dt) => dt.id == dept.dpt
        )[0];
        let empcount;
        let empTrained = 0;
        if (props.data.employeebyDept[dept.dpt] != null) {
          empcount = props.data.employeebyDept[dept.dpt].length;
          for (const x of props.data.employeebyDept[dept.dpt]) {
            if (x.training.length != 0) empTrained += 1;
          }
        }
        else {
          empcount = 0;
        }
        count+=1;
        const i = dept.emp;
        let click = () => {
          props.showDepartment(i);
          props.setDeptPop(true);
        };


        return (
          <li className="deptli" onClick={click} style={{ backgroundColor: items[count%items.length] }}>
            <div className="line">
              <h6> {deptData.name}</h6>
            </div>
            <hr style={{ border: "1px solid white", borderRadius: "0.5rem", width: "85%" }}></hr>
            <div>
              <p className="sizereduce">Number of Employees: {empcount}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );

  //   return (
  //     <Box
  //       sx={{
  //         width: "100%",
  //         maxWidth: 500,
  //         display: "grid",
  //         gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
  //         gap: 2,
  //       }}
  //     >
  //       {props.disdata.map((dept) => {
  //         let deptData = props.data.department.filter(
  //           (dt) => dt.id == dept.dpt
  //         )[0];

  //         const i = dept.emp;
  //         let click = () => {
  //           setShowDepartment(i);
  //           setDeptPop(true);
  //         };

  //         return (
  //           <DetailCard
  //             deptname={deptData.name}
  //             deptdesc={"hello"}
  //             onClick={click}
  //           ></DetailCard>
  //         );
  //       })}
  //     </Box>
  //   );
};

export default DeptBox;
