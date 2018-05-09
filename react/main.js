import React,{Component} from "react";
import ReactDOM from "react-dom";

class MyApp extends Component {
    render(){
        return (
            <div>this is also here</div>
        )
    }
}

ReactDOM.render(<MyApp/>,document.querySelector("#eRoot"));