import React from "react";

export const LocationOnDiskInput = (props) => (
    <div>
        <input type="text" placeholder={props.placeholder} onChange={(e)=>props.oninputchange(e.target.value)}/>
    </div>
)

export const TextBox = (props) => (
    <div>
        <label style={inputStyles.TextBoxLabel}>{props.label}</label>
        <textarea rows="15" cols="100" style={inputStyles.TextBox} placeholer={props.placeholder} readOnly={props.readonly} onChange={(e)=>props.oninputchange(e.target.value)} value={props.content}></textarea>
    </div>
)

const inputStyles = {
    TextBox:{
/*
        width:"1000px",
        height:"1000px",
*/
    },
    TextBoxLabel:{
        width:"100px",
        verticalAlign:"top",
        display:"inline-block",
    }

}