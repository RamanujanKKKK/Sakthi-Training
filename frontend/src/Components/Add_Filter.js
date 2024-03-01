import React, { useState } from 'react';
import '../Styles/Addon.css'
const Add_Filter = ({ setIsAttendenceOpen, name, setName, id, setId, min, setMin, max, setMax }) => {

    const [isSearchVisible, setSearchVisible] = useState(false);



    const toggleSearch = () => {
        setSearchVisible(!isSearchVisible);
    };

    return (
        <div style={{ display: 'flex' }}>
            <button
                className='filterbutton' onClick={toggleSearch}>More Filters</button>
            {isSearchVisible && (
                <div className='filterpo' >
                    <div style={{ display: 'flex' }}>
                        <div>
                            <label className='label'>Employee Id : </label>
                            <input onChange={(e)=>(setId(e.target.value))} value={id} type="text" placeholder="Enter Employee id" />
                        </div>
                        
                        &nbsp;
                        <div>
                            <label className='label'>Employee Name : </label>
                            <input  onChange={(e)=>(setName(e.target.value))} value={name} type="text" placeholder="Enter employee name" />
                        </div>
                        <div>
                            <label className='label'>Min attendence : </label>
                            <input  onChange={(e)=>(e.target.value==""?setMin(0):setMin(e.target.value))}  type="number" placeholder="Enter minimum attendence " />
                        </div>
                        <div>
                            <label className='label'>Max attendence  : </label>
                            <input  onChange={(e)=>(e.target.value==""?setMax(10000):setMax(parseInt(e.target.value)))}  type="number" placeholder="Enter maximum attendence" />
                        </div>
                    </div>
                    <button className='sub' onClick={() => setIsAttendenceOpen(true)}>Apply</button>
                </div>
            )}
        </div>
    );
};

export default Add_Filter;
