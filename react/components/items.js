import NodesManager from "./NodesManager";

const itemsHasErrored1 = (bool) =>({
    type: 'ITEMS_HAS_ERRORED',
    hasErrored: bool
});

const itemsIsLoading1 = (bool)=> ({
    type: 'ITEMS_IS_LOADING',
    isLoading: bool
});

const setSelectedNode1 = (selectedID)=>({
    type:"NODE_SELECTED",
    selectedID,
})

export function setSelectedNode(selectedID){
    return {
        type:"NODE_SELECTED",
        selectedID,
    }
}

const itemsFetchDataSuccess = (items) => ({
    type: 'ITEMS_FETCH_DATA_SUCCESS',
    items
});

function errorAfterFiveSeconds() {
    // We return a function instead of an action object
    return (dispatch) => {
        setTimeout(() => {
            // This function is able to dispatch other action creators
            dispatch(itemsHasErrored(true));
        }, 5000);
    };
}

export function itemsFetchData(url) {
    return (dispatch) => {
        dispatch(itemsIsLoading1(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(itemsIsLoading1(false));

                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(itemsFetchDataSuccess(items)))
            .catch(() => dispatch(itemsHasErrored1(true)));
    };
}

export function itemsHasErrored(state = false, action) {
    switch (action.type) {
        case 'ITEMS_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function itemsIsLoading(state = false, action) {
    switch (action.type) {
        case 'ITEMS_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function nodeSelection(state=null,action){
    switch(action.type){
        case "NODE_SELECTED":
            return state && state.selectedID===action.selectedID ? null : action.selectedID;
        default:
            return null;
    }
}

export function items(state = [], action) {
    switch (action.type) {
        case 'ITEMS_FETCH_DATA_SUCCESS':
            NodesManager.addFromList(action.items);
            return NodesManager;
        default:
            return state;
    }
}