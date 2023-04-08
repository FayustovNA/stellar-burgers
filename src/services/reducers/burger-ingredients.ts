import {
    SET_INGREDIENTS,
    UNSET_INGREDIENTS
} from '../constans/burger-ingredients';
import { TCurrentIngredientState } from '../types/data';
import { TCurrentIngredientAction } from '../action/burger-ingredients';

const initialState: TCurrentIngredientState = {
    currentIngredient: null,
}

export const currentIngredientsReducer = (
    state = initialState,
    action: TCurrentIngredientAction): TCurrentIngredientState => {
    switch (action.type) {

        case SET_INGREDIENTS: {
            return {
                ...state,
                currentIngredient: action.item,
            }
        }

        case UNSET_INGREDIENTS: {
            return {
                ...state,
                currentIngredient: null,
            }
        }
        default:
            return state
    }
}