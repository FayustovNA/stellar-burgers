import {
    ORDER_CHECKOUT_REQUEST,
    ORDER_CHECKOUT_SUCCESS,
    ORDER_CHECKOUT_FAILED
} from '../constans/order-details';

import { TOrderAction } from '../action/order-details';
import { IOrderInitialState } from '../types/data';

const initialState: IOrderInitialState = {
    orderNumber: [],
    orderNumberRequest: false,
    orderNumberFailed: false,
}


export const orderNumberReducer = (
    state = initialState,
    action: TOrderAction): IOrderInitialState => {
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