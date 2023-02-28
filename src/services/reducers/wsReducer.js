import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_ORDERS,
} from '../action/wsActionTypes';

export const initialState = {
    wsStart: false,
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
    errorType: null,
}

export default function wsReducer(state = initialState, action) {
    switch (action.type) {

        case WS_CONNECTION_START:
            return {
                ...state,
                wsStart: true,
            };

        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true,
            };

        case WS_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false,
                wsStart: false,
                errorType: action.payload,
            }

        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false,
                wsStart: false,
                errorType: null,
            };

        case WS_GET_ORDERS:
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