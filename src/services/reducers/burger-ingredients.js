import { SET_INGREDIENTS, UNSET_INGREDIENTS } from '../action/burger-ingredients';

const initialState = {
    currentIngredient: null,
}

export const currentIngredientsReducer = (state = initialState, action) => {
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