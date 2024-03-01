import React from 'react'
import { useState } from 'react'
import '../Styles/Legend.css'

const FilterPop = (props) => {

    const [isOpen, setOpen] = useState(false);
    const [isOpen2, setOpen2] = useState(false);

    const openLegend = () => {
        setOpen(true);
    }
    const leaveLegend = () => {
        // setTimeout(() => {
        setOpen(false);
        // }, 200)
    }

    const openLegend2 = () => {
        setOpen2(true);
    }
    const leaveLegend2 = () => {
        setOpen2(false);
    }
    const provideOnclick = () => {
        if (props.nosubHeader) {
            props.selected(null);
        }
        setOpen2(false);
    }

    return (
        <div className='side-bar-button' style={{ width: "100%", height: "3rem", display: "flex", alignItems: "center", paddingLeft: "4%", fontSize: "larger" }}>
            <div className="side-container">
                <div className="side-button" onClick={provideOnclick} onMouseEnter={openLegend} onMouseLeave={leaveLegend}>{props.heading}</div>
                {((isOpen || isOpen2) && !props.nosubHeader) ? <div className="side-popup" onMouseEnter={openLegend2} onMouseLeave={leaveLegend2}>
                    {props.data.map((element) => {
                        if (element.value != 0)
                            return <div onClick={(() => { props.selected(element.id);setOpen2(false) ;console.log(100)  })} className="side-dropdown-item">
                                <div className="legend-item-text">{element.name}</div>
                            </div>
                    })}
                </div> : null}
            </div>
        </div>
    )
}

export default FilterPop