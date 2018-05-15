import React from "react";

const Btn = (props) => (
    <button style={styles.btn} onClick={props.onclick} disabled={props.disabled}>{props.caption}</button>
);

const styles = {
    btn:{
        margin:"0.3em",
    }
}

export default Btn;

