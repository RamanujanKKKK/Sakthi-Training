import { useState, useEffect } from "react";
import '../Styles/Legend.css'

const Legends = (props)=>{
    const [isOpen,setOpen] = useState(false);
    const [isOpen2,setOpen2] = useState(false);

    const openLegend = ()=>{
        setOpen(true);
    }
    const leaveLegend = ()=>{
        setTimeout(()=>{
            setOpen(false);
        },500)
    }

    const openLegend2 = ()=>{ 
        setOpen2(true);
    }
    const leaveLegend2 = ()=>{
            setOpen2(false);
    }

    console.log(props.data);
    return <div style={{top:props.position.y,left:props.position.x,position:"relative"}}>
    <div className="legend-container">
        <div className="legend-button" onMouseEnter={openLegend} onMouseLeave={leaveLegend}>L</div>
        { (isOpen||isOpen2)?<div className="legend-dropdown" onMouseEnter={openLegend2} onMouseLeave={leaveLegend2}>
            {props.data.map((element)=>{
                if(element.value!=0)
                return <div className="legend-dropdown-item">
                    <div className="legend-item-color" style={{backgroundColor:element.fill}}></div>
                    <div className="legend-item-text">{element.name+" "+element.value}</div>
                </div>
            })}
        </div>:null}
    </div>
    </div>
}
export default Legends;