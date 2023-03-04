import {
    WS_USER_CONNECTION_START,
    WS_USER_CONNECTION_SUCCESS,
    WS_USER_CONNECTION_ERROR,
    WS_USER_CONNECTION_CLOSED,
    WS_USER_GET_ORDERS,
} from '../action/wsUserActionTypes';

export const initialState = {
    wsStart: false,
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
    errorType: null,
}

export default function wsUserReducer(state = initialState, action) {
    switch (action.type) {

        case WS_USER_CONNECTION_START:
            return {
                ...state,
                wsStart: true,
            };

        case WS_USER_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true,
            };

        case WS_USER_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false,
                wsStart: false,
                errorType: action.payload,
            }

        case WS_USER_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false,
                wsStart: false,
                errorType: null,
            };

        case WS_USER_GET_ORDERS:
            return {
                ...state,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday,
                wsStart: false,
            };


        default:
            return state;
    }
}

