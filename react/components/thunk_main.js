import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

import ItemList from './ItemList';

const store = configureStore(); // You can also pass in an initialState here

const renderApp = ()=>{
    ReactDOM.render(
        <Provider store={store}>
            <ItemList />
        </Provider>,
        document.querySelector('#eRoot')
    );
}

store.subscribe(()=>{
    renderApp();
})

renderApp();