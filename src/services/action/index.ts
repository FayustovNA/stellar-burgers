import { checkResponse } from '../../utils/check-response';
import { mainUrl } from '../../utils/check-response';
import { AppDispatch } from '../types/index';
import { AppThunk } from '../types/index';
import { GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS } from '../constans/index';
import { IIngredient } from '../types/data';

export interface IGetIngredientsRequest {
    readonly type: typeof GET_INGREDIENTS_REQUEST
}

export interface IGetIngredientsSuccess {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly ingredients: Array<IIngredient>;
}

export interface IGetIngredientsFailed {
    readonly type: typeof GET_INGREDIENTS_FAILED
}

export type TIngredientsActions =
    | IGetIngredientsRequest
    | IGetIngredientsSuccess
    | IGetIngredientsFailed

export const getIngredientsRequest = (): IGetIngredientsRequest => ({
    type: GET_INGREDIENTS_REQUEST,
})

export const getIngredientsSuccess = (
    ingredients: Array<IIngredient>
): IGetIngredientsSuccess => ({
    type: GET_INGREDIENTS_SUCCESS,
    ingredients,
})

export const getIngredientsFailed = (): IGetIngredientsFailed => ({
    type: GET_INGREDIENTS_FAILED,
})

type TIngredientsResponse = {
    success: boolean
    data: IIngredient[]
}


export function getIngredients() {
    return function (dispatch: AppDispatch) {
        dispatch(getIngredientsRequest())

        fetch(`${mainUrl}/ingredients`)
            .then(checkResponse)

            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: GET_INGREDIENTS_SUCCESS,
                        ingredients: res.data
                    });
                }

                else {
                    dispatch(getIngredientsFailed());
                }
            })
            .catch((e) => { console.log('Возникла проблема с вашим fetch запросом', e.message) })
    }
}

