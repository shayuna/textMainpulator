import { combineReducers } from 'redux';
import { items, itemsHasErrored, itemsIsLoading,nodeSelection,updateNodes } from './items';

export default combineReducers({
    items,
    itemsHasErrored,
    itemsIsLoading,
    nodeSelection,
    updateNodes,
});