import {
    ADD_OTHER_INGREDIENTS,
    DELETE_OTHER_INGREDIENTS,
    ADD_BUN,
    UPDATE_OTHER_INGREDIENTS,
    CLEAN_ORDER
} from '../constans/burger-constructor';
// import { ORDER_CHECKOUT_CLEAN } from '../constans/order-details';
import { TConstructorAction } from '../action/burger-constructor';
import { TIngredientWithKey } from '../types/data';
import { TConstructorInitialState } from '../types/data';

const initialState: TConstructorInitialState = {
    totalSumm: 0,
    bun: [],
    otherIngredients: [],
    counters: {},
    prevBunPrice: 0,
}

export const constructorReducer = (
    state = initialState,
    action: TConstructorAction): TConstructorInitialState => {
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
                otherIngredients: state.otherIngredients.filter((ingr: TIngredientWithKey) => ingr.key !== action.key),
                totalSumm: state.totalSumm - action.item.price,
            };
        }
        case CLEAN_ORDER: {
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

