const EmpTable = (props)=>{

    let columnHeaders = props.columnHeaders;
    let 



    return <table className='tabl' id='wfull'>
    <thead >
        <tr>
            {columnHeaders.map((header) => (
                <th key={header}>{header.toUpperCase()}</th>
            ))}
            <th>Click</th>
        </tr>
    </thead>
    <tbody style={{ backgroundColor: "white" }}>
        {
            currentTable.map(element => {
                let trainingData = element;
                return <tr>
                    {columnHeaders.map((header) => (
                        <>
                            <td>{
                            
                            
                            header === 'document' ? <a href={trainingData[header]}>Click here</a> :(header=='training'?<>{trainingData[header].map((train,index)=><div>{index+1+") "+props.dataHandler.getDataById(props.data.training,train).name}</div>)}</>:trainingData[header])}</td>
                        </>
                    ))}
                    <td><a onClick={() => { setShowSchedule(element.id); console.log(element); openPopup() }}>&rarr;</a></td>

                </tr>
            })

        }
    </tbody>
</table>
}