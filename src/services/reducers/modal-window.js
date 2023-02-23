import { MODALWINDOW_OPEN_ING, MODALWINDOW_CLOSE_ING, MODALWINDOW_OPEN_ORD, MODALWINDOW_CLOSE_ORD } from "../action/modal-window";

const initialState = {
    isOpenIng: false,
    isOpenOrd: false
}

export const modalWindowReducer = (state = initialState, action) => {
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