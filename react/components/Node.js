import React,{Component} from "react";
import { connect } from 'react-redux';

class Node extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:props.id,
        }
    }
    render(){
        return (
            <article>
                <article style={styles.node}>{this.props.name}</article>
                {
                    this.props.NodesManager && this.props.NodesManager.getNodeByID(this.state.id).children.map((elm)=>(
                        <Node key={elm.id} id={elm.id} name={elm.name}/>
                    ))
                }
            </article>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        NodesManager: state.items,
    };
};

const styles = {
    node:{
        color:"red",
        marginLeft:"20px",
    }
}

export default connect(mapStateToProps)(Node);

