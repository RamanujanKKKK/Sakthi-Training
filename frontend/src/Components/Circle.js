import { useState, useEffect } from "react";    

export const Circle = (props) => {
    return <div className="circle" style={{width:props.radius}}></div>
};