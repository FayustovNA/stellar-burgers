import { ORDER_CHECKOUT_REQUEST, ORDER_CHECKOUT_SUCCESS, ORDER_CHECKOUT_FAILED } from "../action/order-details";

const initialState = {
    orderNumber: [],
    orderNumberRequest: false,
    orderNumberFailed: false,
}


export const orderNumberReducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDER_CHECKOUT_REQUEST: {
            return {
                ...state,
                orderNumberRequest: true,
                orderNumberFailed: false
            }
        }
        case ORDER_CHECKOUT_SUCCESS: {
            return {
                ...state,
                orderNumber: action.orderdetails,
                orderNumberRequest: false,
                orderNumberFailed: false
            }
        }
        case ORDER_CHECKOUT_FAILED: {
            return {
                orderNumber: [],
                orderNumberFailed: true,
                orderNumberRequest: false
            }
        }
        default: {
            return state;
        }
    }
};