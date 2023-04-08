import { mainUrl } from '../../utils/check-response';
import { checkResponse } from '../../utils/check-response';
import { getCookie } from '../../utils/utils';
import { AppDispatch } from '../types/index';
import {
    ORDER_CHECKOUT_SUCCESS,
    ORDER_CHECKOUT_CLEAN,
    ORDER_CHECKOUT_FAILED,
    ORDER_CHECKOUT_REQUEST
} from '../constans/order-details';

import { CLEAN_ORDER } from '../constans/burger-constructor';
import { ICleanOrder } from './burger-constructor';

export interface IOrderChekoutRequest {
    readonly type: typeof ORDER_CHECKOUT_REQUEST
}

export interface IOrderChekoutSuccess {
    readonly type: typeof ORDER_CHECKOUT_SUCCESS;
    readonly orderdetails: any;
}

export interface IOrderChekoutFailed {
    readonly type: typeof ORDER_CHECKOUT_FAILED
}

export interface IOrderChekoutClean {
    readonly type: typeof ORDER_CHECKOUT_CLEAN
}


export type TOrderAction =
    | IOrderChekoutRequest
    | IOrderChekoutSuccess
    | IOrderChekoutFailed
    | IOrderChekoutClean;


const OrderChekoutRequest = (): IOrderChekoutRequest => {
    return {
        type: ORDER_CHECKOUT_REQUEST
    }
}

const OrderChekoutSuccess = (orderNumber: any): IOrderChekoutSuccess => {
    return {
        type: ORDER_CHECKOUT_SUCCESS,
        orderdetails: orderNumber,
    }
}

const OrderChekoutFailed = (): IOrderChekoutFailed => {
    return {
        type: ORDER_CHECKOUT_FAILED
    }
}

const OrderChekoutClean = (): IOrderChekoutClean => {
    return {
        type: ORDER_CHECKOUT_CLEAN
    }
}

const OrderClean = (): ICleanOrder => {
    return {
        type: CLEAN_ORDER
    }
}


export function getOrderDetails(ingredients: Array<string>) {
    return function (dispatch: AppDispatch) {
        dispatch(OrderChekoutRequest());

        fetch(`${mainUrl}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${getCookie('token')}`,
            },
            body: JSON.stringify({
                ingredients: ingredients,
            }),

        }).then(checkResponse)
            .then((res) => {
                dispatch(OrderChekoutSuccess(res.order))
            })

            .then((res) => {
                dispatch(OrderClean())
                dispatch(OrderChekoutClean())
            })

            .catch((error) => {
                dispatch(OrderChekoutFailed())
            })
    }
}
