import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {store} from './redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist"

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
let persist = persistStore(store)
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <PersistGate persistor={persist} >
                <App/>
            </PersistGate>
        </BrowserRouter>
    </Provider>
);
