import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { connect } from 'react-redux';
import { itemsFetchData,addNode,updateNode,delNode } from './items';
import Node from "./Node";
import Btn from "./Btn";

class ItemList extends Component {
    constructor(props){
        super(props);
        this.state={
            showAddDialog:false,
            showUpdateDialog:false,
        }
        this.addNode=this.addNode.bind(this);
        this.updateNode=this.updateNode.bind(this);
        this.showAddDialog=this.showAddDialog.bind(this);
        this.showUpdateDialog=this.showUpdateDialog.bind(this);

    }
    componentDidMount() {
        this.props.fetchData('http://localhost:8080/nodes');
    }
    render() {
        console.log(this.props.selectedID);
        if (this.props.NodesManager.arTrees){
            return (
                <article>
                    <article style={styles.allTreesWrapper}>
                    {
                        this.props.NodesManager.arTrees.map((elm) => (
                            <article key={elm.id} style={styles.treeWrapper}>
                                <Node id={elm.id} name={elm.name} rnd={Math.random()}/>
                            </article>
                        ))
                    }
                    </article>
                    <article style={styles.actionBtnsWrapper}>
                        <Btn caption="ADD" onclick={this.showAddDialog} disabled={!this.props.selectedID}/>
                        <Btn caption="UPDATE" onclick={this.showUpdateDialog} disabled={!this.props.selectedID}/>
                        <Btn caption="DEL" onclick={()=>this.delNode()} disabled={!this.props.selectedID}/>
                    </article>
                    {
    //                    if (this.state.showAddDialog || this.state.showUpdateDialog){
                        this.props.selectedID && (this.state.showAddDialog || this.state.showUpdateDialog) && 
                            <article style={styles.dialogStyle}>
                                <input type="text" id="eName"/>
                                {this.state.showAddDialog && <button onClick={this.addNode}>ADD</button>};
                                {this.state.showUpdateDialog && <button onClick={this.updateNode}>UPDATE</button>};
                            </article>    
                      //  }
                    
                    
                    }
                </article>
            )
        }
        else{
            return null;
        }
    }
    showAddDialog(){
        this.setState({
            showAddDialog:true,
            showUpdateDialog:false,
        });
    }
    addNode(){
        this.props.addNode(document.getElementById("eName").value,this.props.selectedID);
    }
    showUpdateDialog(){
        this.setState({
            showAddDialog:false,
            showUpdateDialog:true,
        });
    }
    updateNode(){
      this.props.updateNode(this.props.selectedID,document.getElementById("eName").value);
    }
    delNode(){
        this.props.delNode(this.props.selectedID);
    }
}

const mapStateToProps = (state) => {
    return {
        NodesManager: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading,
        selectedID:state.nodeSelection,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url)),
        addNode: (name,pid) => dispatch(addNode(name,pid)),
        updateNode: (id,name) => dispatch(updateNode(id,name)),
        delNode: (id) => dispatch(delNode(id)),
    };
};

const styles = {
    allTreesWrapper:{
        display:"flex",
    },
    treeWrapper:{
        margin:"1em",
    },
    actionBtnsWrapper:{
        padding:"2em",
        background:"#ddd",
    },
    dialogStyle:{
        padding:"10rem",
        background:"#aaa",
    },
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);

