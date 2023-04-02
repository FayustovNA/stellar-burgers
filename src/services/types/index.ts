import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { store } from '../store';
import { TUserActions } from "../action/auth";
import { TIngredientsActions } from "../action";
import { TOrderAction } from "../action/order-details";
import { TSocketAction } from "../action/wsActionTypes";
import { TSocketUserAction } from "../action/wsUserActionTypes";
import { TConstructorAction } from "../action/burger-constructor";
import { TCurrentIngredientAction } from "../action/burger-ingredients";
import { TModalActions } from "../action/modal-window";


type TApplicationActions =
    | TUserActions
    | TIngredientsActions
    | TOrderAction
    | TSocketAction
    | TSocketUserAction
    | TConstructorAction
    | TCurrentIngredientAction
    | TModalActions;


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    TApplicationActions
>;
