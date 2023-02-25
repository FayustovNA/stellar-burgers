export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSE = 'WS_CONNECTION_CLOSE';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_ORDERS = 'WS_GET_ORDERS';
export const WS_SEND_ORDERS = 'WS_SEND_ORDERS';

export const wsConnectionStart = (url) => {
    return {
        type: WS_CONNECTION_START,
        payload: url,
    }
}

export const wsConnectionClosed = () => {
    return {
        type: WS_CONNECTION_CLOSED,
    }
}

export const wsConnectionSuccess = () => {
    return {
        type: WS_CONNECTION_SUCCESS,
    }
}

export const wsConnectionError = (error) => {
    return {
        type: WS_CONNECTION_ERROR,
        payload: error,
    }
}

export const wsConnectionClose = () => {
    return {
        type: WS_CONNECTION_CLOSE,
    }
}

export const wsConnectionGetOrders = (message) => {
    return {
        type: WS_GET_ORDERS,
        payload: message,
    }
}

export const wsConnectionSendOrders = (order) => {
    return {
        type: WS_SEND_ORDERS,
        payload: order,
    }
}