import { getCookie } from "../../utils/utils";

export const socketMiddleware = (wsActions) => {
    return store => {
        let socket = null;
        let url = undefined;

        return (next) => (action) => {
            const { dispatch } = store;

            const { type, payload } = action;

            const { wsInit, onOpen, onClose, onClosed, onError, onOrders, wsSendOrders } = wsActions;

            const token = getCookie('token');

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
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    const { success, ...restParsedData } = parsedData;
                    dispatch({ type: onOrders, payload: restParsedData });
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