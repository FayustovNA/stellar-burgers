import {
    MODALWINDOW_OPEN_ING,
    MODALWINDOW_CLOSE_ING,
    MODALWINDOW_OPEN_ORD,
    MODALWINDOW_CLOSE_ORD
} from "../constans/modal-window";
import { TModalActions } from "../action/modal-window";
import { TModalInitialState } from "../types/data";


const initialState: TModalInitialState = {
    isOpenIng: false,
    isOpenOrd: false
}

export const modalWindowReducer = (
    state = initialState,
    action: TModalActions): TModalInitialState => {
    switch (action.type) {
        case MODALWINDOW_OPEN_ING: {
            return {
                ...state,
                isOpenIng: true
            }
        }
        case MODALWINDOW_CLOSE_ING: {
            return {
                ...state,
                isOpenIng: false
            }
        }
        case MODALWINDOW_OPEN_ORD: {
            return {
                ...state,
                isOpenOrd: true
            }
        }
        case MODALWINDOW_CLOSE_ORD: {
            return {
                ...state,
                isOpenOrd: false
            }
        }

        default: {
            return state;
        }
    }
};