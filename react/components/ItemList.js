import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { connect } from 'react-redux';
import { itemsFetchData } from './items';
import Node from "./Node";

class ItemList extends Component {
    componentDidMount() {
        this.props.fetchData('http://localhost:8080/nodes');
    }
    render() {
        if (this.props.hasErrored) {
            return <p>Sorry blablabla! There was an error loading the items</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }
/*     
        if (this.props.NodesManager.getNodeByID){

            console.log (JSON.stringify(this.props.NodesManager.getNodeByID(4)));
        }
*/
        if (this.props.NodesManager.arTrees){
            return (
                <article style={styles.mainWrapper}>
                {
                    this.props.NodesManager.arTrees.map((elm) => (
                        <article key={elm.id} style={styles.treeWrapper}>
                            <Node id={elm.id} name={elm.name}/>
                        </article>
                    ))
                }
                </article>
            )
        }
        else{
            return null;
        }
    }
}

const mapStateToProps = (state) => {
    return {
        NodesManager: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url))
    };
};

const styles = {
    mainWrapper:{
        display:"flex",
    },
    treeWrapper:{
        margin:"1em",
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);

