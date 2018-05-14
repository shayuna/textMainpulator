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
                <article>
                {
                    this.props.NodesManager.arTrees.map((elm) => (
                        <Node key={elm.id} id={elm.id} name={elm.name}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);

