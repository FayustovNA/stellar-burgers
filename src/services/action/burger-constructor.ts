import {
    ADD_OTHER_INGREDIENTS,
    DELETE_OTHER_INGREDIENTS,
    ADD_BUN,
    UPDATE_OTHER_INGREDIENTS,
    CLEAN_ORDER
} from '../constans/burger-constructor';

import { IIngredient } from '../types/data';

export interface IAddOtherIngredient {
    readonly type: typeof ADD_OTHER_INGREDIENTS;
    readonly key: string;
    readonly item: IIngredient;
}

export interface IDeleteOtherIngredient {
    readonly type: typeof DELETE_OTHER_INGREDIENTS;
    readonly item: IIngredient;
    readonly key: string;
}

export interface IAddBun {
    readonly type: typeof ADD_BUN;
    readonly item: IIngredient;
}

export interface IUpdateOtherIngredient {
    readonly type: typeof UPDATE_OTHER_INGREDIENTS
    readonly toIndex: number
    readonly fromIndex: number
}

export interface ICleanOrder {
    readonly type: typeof CLEAN_ORDER;
}

export type TConstructorAction =
    | IAddOtherIngredient
    | IDeleteOtherIngredient
    | IAddBun
    | IUpdateOtherIngredient
    | ICleanOrder;