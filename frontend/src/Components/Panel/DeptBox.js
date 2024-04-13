const DeptBox = (props) => {
  return (
    <ul className="deptna">
      {props.disdata.map((dept) => {
        let deptData = props.data.department.filter(
          (dt) => dt.id == dept.dpt
        )[0];

        const i = dept.emp;
        let click = () => {
          props.showDepartment(i);
          props.setDeptPop(true);
        };

        return (
          <li className="deptli" onClick={click}>
            {deptData.name}
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
