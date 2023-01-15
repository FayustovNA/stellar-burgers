import {
    ADD_OTHER_INGREDIENTS,
    DELETE_OTHER_INGREDIENTS,
    ADD_BUN,
    UPDATE_OTHER_INGREDIENTS,
} from '../action/burger-constructor';
import { ORDER_CHECKOUT_CLEAN } from '../action/order-details';
// import { v4 as uuidv4 } from 'uuid';


const initialState = {
    totalSumm: 0,
    bun: [],
    otherIngredients: [],
    counters: {},
    prevBunPrice: 0,
}

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_OTHER_INGREDIENTS: {
            return {
                ...state,
                otherIngredients: [
                    ...state.otherIngredients,
                    { ...action.item, key: action.key },],
                totalSumm: state.totalSumm + action.item.price,
            };
        }
        case UPDATE_OTHER_INGREDIENTS: {
            const newOtherIngredients = [...state.otherIngredients]
            newOtherIngredients.splice(
                action.toIndex,
                0,
                newOtherIngredients.splice(action.fromIndex, 1)[0]
            )
            return {
                ...state,
                otherIngredients: newOtherIngredients
            };
        }
        case ADD_BUN: {
            return {
                ...state,
                bun: [action.item],
                prevBunPrice: action.item.price * 2,
                totalSumm: state.totalSumm + action.item.price * 2 - state.prevBunPrice,
            };
        }
        case DELETE_OTHER_INGREDIENTS: {
            return {
                ...state,
                otherIngredients: state.otherIngredients.filter((ingr) => ingr.key !== action.key),
                totalSumm: state.totalSumm - action.item.price,
            };
        }
        case ORDER_CHECKOUT_CLEAN: {
            return {
                ...state,
                bun: [],
                otherIngredients: [],
                totalSumm: 0,
                prevBunPrice: 0
            };
        }
        default: {
            return state;
        }
    }
};

