import { mainUrl } from '../../utils/check-response';
import { checkResponse } from '../../utils/check-response';
export const ORDER_CHECKOUT_REQUEST = 'ORDER_CHECKOUT_REQUEST';
export const ORDER_CHECKOUT_SUCCESS = 'ORDER_CHECKOUT_SUCCESS';
export const ORDER_CHECKOUT_FAILED = 'ORDER_CHECKOUT_FAILED';
export const ORDER_CHECKOUT_CLEAN = 'ORDER_CHECKOUT_CLEAN';




export function getOrderDetails(ingredients) {
    return function (dispatch) {
        dispatch({
            type: ORDER_CHECKOUT_REQUEST,
        })
        fetch(`${mainUrl}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ingredients: ingredients,
            }),
        }).then(checkResponse)
            .then((res) => {
                dispatch({
                    type: ORDER_CHECKOUT_SUCCESS,
                    orderdetails: res.order,
                })
            })
            .then((res) => {
                dispatch({
                    type: ORDER_CHECKOUT_CLEAN,
                })
            })
            .catch((error) => {
                dispatch({
                    type: ORDER_CHECKOUT_FAILED,
                })
            })
    }
}
