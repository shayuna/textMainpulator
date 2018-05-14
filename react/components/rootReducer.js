import { combineReducers } from 'redux';
import { items, itemsHasErrored, itemsIsLoading,nodeSelection } from './items';

export default combineReducers({
    items,
    itemsHasErrored,
    itemsIsLoading,
    nodeSelection,
});