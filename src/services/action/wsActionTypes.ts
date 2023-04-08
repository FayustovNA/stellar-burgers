import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSE,
    WS_CONNECTION_CLOSED,
    WS_GET_ORDERS,
    WS_SEND_ORDERS
} from "../constans/wsActionTypes";
import { TOrdersResponse, TOrder } from "../types/data";

export interface IwsConnectionStart {
    readonly type: typeof WS_CONNECTION_START;
    readonly payload: string;
}

export interface IwsConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IwsConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly payload: string;
}

export interface IwsConnectionClose {
    readonly type: typeof WS_CONNECTION_CLOSE;
}

export interface IwsConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED;
}

interface IwsGetOrders {
    readonly type: typeof WS_GET_ORDERS
    readonly payload: TOrdersResponse
}

interface IwsSendOrder {
    readonly type: typeof WS_SEND_ORDERS
    readonly payload: TOrder
}

export type TSocketAction =
    | IwsConnectionStart
    | IwsConnectionSuccess
    | IwsConnectionError
    | IwsConnectionClose
    | IwsConnectionClosed
    | IwsGetOrders
    | IwsSendOrder

export const wsConnectionStart = (url: string): IwsConnectionStart => {
    return {
        type: WS_CONNECTION_START,
        payload: url,
    }
}

export const wsConnectionSuccess = (): IwsConnectionSuccess => {
    return {
        type: WS_CONNECTION_SUCCESS,
    }
}

export const wsConnectionError = (error: string): IwsConnectionError => {
    return {
        type: WS_CONNECTION_ERROR,
        payload: error,
    }
}

export const wsConnectionClose = (): IwsConnectionClose => {
    return {
        type: WS_CONNECTION_CLOSE,
    }
}

export const wsConnectionClosed = (): IwsConnectionClosed => {
    return {
        type: WS_CONNECTION_CLOSED,
    }
}

export const wsConnectionGetOrders = (response: TOrdersResponse): IwsGetOrders => {
    return {
        type: WS_GET_ORDERS,
        payload: response,
    }
}

export const wsConnectionSendOrders = (order: TOrder): IwsSendOrder => {
    return {
        type: WS_SEND_ORDERS,
        payload: order,
    }
}