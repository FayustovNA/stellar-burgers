import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { compose } from 'redux';
import { rootReducer } from '../services/reducers/index';
import { socketMiddleware } from '../services/middleware/socketMiddleware';
import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSE,
    WS_CONNECTION_CLOSED,
    WS_GET_ORDERS,
    WS_SEND_ORDERS,
} from './constans/wsActionTypes';

import {
    WS_USER_CONNECTION_START,
    WS_USER_CONNECTION_SUCCESS,
    WS_USER_CONNECTION_ERROR,
    WS_USER_CONNECTION_CLOSE,
    WS_USER_CONNECTION_CLOSED,
    WS_USER_GET_ORDERS,
    WS_USER_SEND_ORDERS,
} from './constans/wsUserActionType';

const wsActions = {
    wsInit: WS_CONNECTION_START,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSE,
    onClosed: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onOrders: WS_GET_ORDERS,
    wsSendOrders: WS_SEND_ORDERS,
};

const wsUserActions = {
    wsInit: WS_USER_CONNECTION_START,
    onOpen: WS_USER_CONNECTION_SUCCESS,
    onClose: WS_USER_CONNECTION_CLOSE,
    onClosed: WS_USER_CONNECTION_CLOSED,
    onError: WS_USER_CONNECTION_ERROR,
    onOrders: WS_USER_GET_ORDERS,
    wsSendOrders: WS_USER_SEND_ORDERS,
};

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const enhancer = composeEnhancers(
    applyMiddleware(
        thunk,
        socketMiddleware(wsActions, false),
        socketMiddleware(wsUserActions, true)
    )
);

export const store = createStore(rootReducer, enhancer);
// export type AppDispatch = typeof store.dispatch