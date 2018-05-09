import React,{Component} from "react";
import ReactDOM from "react-dom";
import Header from "./textManipulatorHdr.js"
import {LocationOnDiskInput,TextBox} from "./textManipulatorInput";
import {JustDoItBtn} from "./textManipulatorBtn";
import {TextManipulator} from "./textManipulatorHelper";

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            inputTxt:"",
            outputTxt:"",
            inputToExtractFrom:"",
        }
        this.inputToWorkOnChange=this.inputToWorkOnChange.bind(this);
        this.inputToExtractFromChange=this.inputToExtractFromChange.bind(this);
        this.glueID=this.glueID.bind(this);
        this.getAttr=this.getAttr.bind(this);
    }
    render(){
        return (
            <div>
                <Header title="Text Manipulation Time Baby"/>
                <TextBox label="input to work on:" oninputchange={this.inputToWorkOnChange}/>
                <TextBox label="input to extract data from:" oninputchange={this.inputToExtractFromChange}/>
                <TextBox label="output:" readonly={true} oninputchange={this.srcOutputChange} content={this.state.outputTxt}/>
                <JustDoItBtn title="start to glueID, oh master" onclickbtn={this.glueID}/>
                <JustDoItBtn title="start to extract elements attributes and transfer them on and on and on, oh master" onclickbtn={this.getAttr}/>
            </div>
        )
    }
    inputToWorkOnChange(sTxt){
        this.setState ((prev,props)=>({
            inputTxt:sTxt,
        }))
    }
    inputToExtractFromChange(sTxt){
        this.setState ((prev,props)=>({
            inputToExtractFrom:sTxt,
        }))
    }
    glueID(){
        const sOutput=TextManipulator.glueID(this.state.inputTxt);
        this.setState((prev,props)=>({
            outputTxt:sOutput,
        }));
    }
    getAttr(){
        const sOutput=TextManipulator.updateElementsAttr(this.state.inputTxt,this.state.inputToExtractFrom);
        this.setState((prev,prop)=>({
            outputTxt:sOutput,
        }))
    }
}

ReactDOM.render (<App/>,document.querySelector("#eRoot"));