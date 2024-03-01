    import { useState, useEffect } from "react";    
import logo from '../images/logo.jpeg' 


export const Node = (props) => {

    

    let value = props.value;
    let x,y,x2,y2;
    let angle = props.angle;
    if(props.angle!=NaN){
        if((props.angle>90 && props.angle<270)){
            angle += 180;
            angle %= 360;
        }
        x = Math.cos(props.angle * Math.PI / 180) * props.positionRadius;
        y = Math.sin(props.angle * Math.PI / 180) * props.positionRadius;
        
        x2 = Math.cos(props.angle * Math.PI / 180) * (props.positionRadius+props.radius+10);
        y2 = Math.sin(props.angle * Math.PI / 180) * (props.positionRadius+props.radius+10);
        

    }
    else{
        x = 0;
        y = 0;
    }
    const click = (e)=>{
        props.clickOpr(props.value);
    }
    const setActiveLink = ()=>{
        console.log(100);
        props.handleLink[0](props.value.id)
    }
    return <>
        {(props.angle!=NaN && (props.angle>90 && props.angle<270))?<div className="node-text" style={{top:y2,left:x2,width:props.radius,color:(props.active?'#222e3c':null),transform:(`translate(-150%,-100%) rotate(${angle}deg) `+((props.angle>90 && props.angle<270)?`scale(1,1)`:``))}}>{value.name}</div>:null}

    <div className="node" onMouseEnter={setActiveLink} onMouseLeave={props.handleLink[1]} onClick={click} style={{top:y,left:x,width:props.radius,backgroundColor:props.renderImg?"white":((props.active?'#222e3c':null)),border:(props.linkActive?"5px solid #AAFF00":null)}}>
        {props.renderImg && <img src={logo} style={{height:"100%"}}></img>}
    </div>
        {(props.angle!=NaN && !(props.angle>90 && props.angle<270))?<div className="node-text" style={{top:y2,left:x2,width:props.radius,color:(props.active?'#222e3c':null),transform:(`translate(-50%,-50%) rotate(${angle}deg) `+((props.angle>90 && props.angle<270)?`scale(1,1)`:``))}}>{value.name}</div>:null}
        </>
};