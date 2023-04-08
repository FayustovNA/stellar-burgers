import {
    WS_USER_CONNECTION_START,
    WS_USER_CONNECTION_SUCCESS,
    WS_USER_CONNECTION_ERROR,
    WS_USER_CONNECTION_CLOSE,
    WS_USER_CONNECTION_CLOSED,
    WS_USER_GET_ORDERS,
    WS_USER_SEND_ORDERS
} from "../constans/wsUserActionType";
import { TOrdersResponse, TOrder } from "../types/data";


interface IwsConnectionStartUser {
    readonly type: typeof WS_USER_CONNECTION_START
    readonly payload: string
}

interface IwsConnectionSuccessUser {
    readonly type: typeof WS_USER_CONNECTION_SUCCESS
}

interface IwsConnectionErrorUser {
    readonly type: typeof WS_USER_CONNECTION_ERROR
    readonly payload: string
}

interface IwsConnectionCloseUser {
    readonly type: typeof WS_USER_CONNECTION_CLOSE
}

interface IwsConnectionClosedUser {
    readonly type: typeof WS_USER_CONNECTION_CLOSED
}

interface IwsGetOrdersUser {
    readonly type: typeof WS_USER_GET_ORDERS
    readonly payload: TOrdersResponse
}


interface IwsSendOrdersUser {
    readonly type: typeof WS_USER_SEND_ORDERS
    readonly payload: TOrder
}

export type TSocketUserAction =
    | IwsConnectionStartUser
    | IwsConnectionSuccessUser
    | IwsConnectionErrorUser
    | IwsConnectionCloseUser
    | IwsConnectionClosedUser
    | IwsGetOrdersUser
    | IwsGetOrdersUser

export const wsConnectionStart = (url: string): IwsConnectionStartUser => {
    return {
        type: WS_USER_CONNECTION_START,
        payload: url,
    }
}

export const wsConnectionSuccess = (): IwsConnectionSuccessUser => {
    return {
        type: WS_USER_CONNECTION_SUCCESS,
    }
}

export const wsConnectionError = (error: string): IwsConnectionErrorUser => {
    return {
        type: WS_USER_CONNECTION_ERROR,
        payload: error,
    }
}

export const wsConnectionClosed = (): IwsConnectionClosedUser => {
    return {
        type: WS_USER_CONNECTION_CLOSED,
    }
}

export const wsConnectionClose = (): IwsConnectionCloseUser => {
    return {
        type: WS_USER_CONNECTION_CLOSE,
    }
}

export const wsConnectionGetOrders = (response: TOrdersResponse): IwsGetOrdersUser => {
    return {
        type: WS_USER_GET_ORDERS,
        payload: response,
    }
}

export const wsConnectionSendOrders = (order: TOrder): IwsSendOrdersUser => {
    return {
        type: WS_USER_SEND_ORDERS,
        payload: order,
    }
}