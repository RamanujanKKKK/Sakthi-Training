import React from 'react'
import { useState } from 'react'
import '../Styles/Legend.css'
import {  MDBDropdownItem } from 'mdb-react-ui-kit';


const FilterPop = (props) => {

    return (
        <>
                    {props.data?props.data.map((element) => {
                        if (element.value != 0)
                            return <MDBDropdownItem onClick={(() => { props.selected(element.id)  })}  link>{element.name}</MDBDropdownItem>

                    }):null}
        </>
    )
}

export default FilterPop