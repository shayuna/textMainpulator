import React,{Component} from "react";
import { connect } from 'react-redux';
import { setSelectedNode } from './items';
import Node from "./Node";

class NodeAlterEgo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id:props.id,
        }
    }
    render(){
//        console.log (this.state.id+" *** " + this.props.NodesManager);
        return (
            <article style={styles.node}>
                <article onClick={()=>this.props.setSelectedNode(this.props.id)}>{this.props.name}</article>
                {
                    this.props.NodesManager.getNodeByID(this.state.id).children.map((elm)=>(
                        <Node key={elm.id} id={elm.id} name={elm.name} rnd={Math.random()}/>
                    ))
                }
            </article>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        NodesManager: state.items
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedNode:(id)=>dispatch(setSelectedNode(id))
    };
};


const styles = {
    node:{
        fontSize:"1.5rem",
        marginLeft:"20px",
        cursor:"pointer",
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NodeAlterEgo);

