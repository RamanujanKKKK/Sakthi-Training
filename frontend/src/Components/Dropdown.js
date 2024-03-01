import React, { useState } from 'react';
import '../Styles/dropdown.css'

const Dropdown = (props) => {
    const options = props.data;

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isToggled, setIsToggled] = useState(false);
    const [isToggled2, setIsToggled2] = useState(false);


    const open = () => {
        setIsToggled(true);
    }
    const close = () => {
        setTimeout(() => {
            setIsToggled(false)
        }, 300);
    }
    const open2 = () => {
        setIsToggled2(true);
    }
    const close2 = () => {
        setIsToggled2(false)
    }

    const value = (option) => {
        if (selectedOptions.includes(option.name)) {
            props.removeData(option.id);
            setSelectedOptions(selectedOptions.filter((item) => item !== option.name));
        } else {
            props.addData(option.id)
            setSelectedOptions([...selectedOptions, option.name]);
        }
    };

    const DropdownOption = ({ option }) => (
        <div className='drop'>
            <input className='ckinput'
                type="checkbox"
                value={option.name}
                checked={selectedOptions.includes(option.name)}
                onChange={() => value(option)}
            />
            <div>
                {option.name}
            </div>
        </div>
    );

    return (
        <div className='outer-drop'>
            <button className='dropbtn' onMouseEnter={open} onMouseLeave={close}>{props.name}   </button>
            {(isToggled || isToggled2) ? <div className='dropvalue' onMouseEnter={open2} onMouseLeave={close2}>
                {options.map((option) => (
                    <DropdownOption key={option.id} option={option} />
                ))}
            </div> : <div></div>}

        </div>

    );
};

export default Dropdown;
