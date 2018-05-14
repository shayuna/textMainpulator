import React,{Component} from "react";
import { connect } from 'react-redux';
import { setSelectedNode } from './items';

class Node extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:props.id,
        }
    }
    componentDidMount(){
        
    }
    render(){
        console.log (this.state.id+" *** " + this.props.NodesManager);
        let oNodesManager=null;
        if (this.props.NodesManager){
            oNodesManager=this.props.NodesManager;
        }
        else{
            oNodesManager=this.props.legacyNodesManager;
        }
        return (
            <article style={styles.node}>
                <article onClick={()=>this.props.setSelectedNode(this.props.id)}>{this.props.name}</article>
                {
                    oNodesManager.getNodeByID(this.state.id) && oNodesManager.getNodeByID(this.state.id).children.map((elm)=>(
                        <Node key={elm.id} id={elm.id} name={elm.name} legacyNodesManager={oNodesManager}/>
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

export default connect(mapStateToProps,mapDispatchToProps)(Node);

