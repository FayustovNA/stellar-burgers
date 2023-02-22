import { combineReducers } from 'redux';
import { constructorReducer } from './burger-constructor';
import { orderNumberReducer } from './order-details';
import { modalWindowReducer } from './modal-window';
import { currentIngredientsReducer } from './burger-ingredients';
import { authReducer } from './auth';

import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,

} from '../action/index';


const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
}


export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true
            }
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredients: action.ingredients,
                ingredientsRequest: false,
                ingredientsFailed: false
            }
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ingredients: [],
                ingredientsFailed: true,
                ingredientsRequest: false
            }
        }
        default: {
            return state;
        }
    }
};


export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    maker: constructorReducer,
    order: orderNumberReducer,
    modal: modalWindowReducer,
    current: currentIngredientsReducer,
    auth: authReducer
});