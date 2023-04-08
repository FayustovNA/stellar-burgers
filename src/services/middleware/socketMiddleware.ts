import { getCookie } from "../../utils/utils";
import { refreshToken } from "../../utils/utils";
import { Middleware } from "redux";
import { IWebSocket } from "../types/data";


export const socketMiddleware = (wsActions: IWebSocket, isAuth: boolean): Middleware => {
    return (store) => {
        let socket: WebSocket | null = null;
        let url = undefined;

        return (next) => (action) => {
            const { dispatch } = store;

            const { type, payload } = action;

            const { wsInit, onOpen, onClose, onClosed, onError, onOrders, wsSendOrders } = wsActions;


            const token = isAuth ? getCookie('token') : null;

            if (type === wsInit) {
                url = payload;
                socket = new WebSocket(url);
            }

            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: onOpen, payload: event });
                };

                socket.onerror = event => {
                    dispatch({ type: onError, payload: event });
                };


                socket.onmessage = event => {

                    const data = JSON.parse(event.data)
                    if (data.success) {
                        dispatch({ type: onOrders, payload: data })
                    } else {
                        socket!.close()
                    }
                    // const { data } = event;
                    // const parsedData = JSON.parse(data);
                    // const { success, ...restParsedData } = parsedData;

                    // if (restParsedData.message === "Invalid or missing token" || "Token is invalid") {
                    //     dispatch(refreshToken())
                    // } else {
                    //     dispatch({ type: onOrders, payload: restParsedData });
                    // }
                };

                socket.onclose = event => {
                    dispatch({ type: onClose, payload: event });
                };

                if (type === onClosed) {
                    socket.close()
                }

                if (type === wsSendOrders) {

                    const sendOrderResult = { ...payload, token };
                    socket.send(JSON.stringify(sendOrderResult));
                }
            }

            next(action);
        };
    };
};