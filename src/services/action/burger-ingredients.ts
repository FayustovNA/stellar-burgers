import {
    SET_INGREDIENTS,
    UNSET_INGREDIENTS
} from '../constans/burger-ingredients';
import { IIngredient } from '../types/data';

export interface ISetCurrentIngredient {
    readonly type: typeof SET_INGREDIENTS
    readonly item: IIngredient
}

export interface IUnSetCurrentIngredient {
    readonly type: typeof UNSET_INGREDIENTS;
}

export type TCurrentIngredientAction =
    | ISetCurrentIngredient
    | IUnSetCurrentIngredient