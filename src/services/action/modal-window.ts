import {
    MODALWINDOW_CLOSE_ING,
    MODALWINDOW_CLOSE_ORD,
    MODALWINDOW_OPEN_ING,
    MODALWINDOW_OPEN_ORD
} from "../constans/modal-window";

export interface IOpenModalIng {
    readonly type: typeof MODALWINDOW_OPEN_ING
}

export interface ICloseModalIng {
    readonly type: typeof MODALWINDOW_CLOSE_ING
}

export interface IOpenModalOrd {
    readonly type: typeof MODALWINDOW_OPEN_ORD
}

export interface ICloseModalOrd {
    readonly type: typeof MODALWINDOW_CLOSE_ORD
}

export const openModalIng = (): IOpenModalIng => ({
    type: MODALWINDOW_OPEN_ING,
})

export const closeModalIng = (): ICloseModalIng => ({
    type: MODALWINDOW_CLOSE_ING,
})

export const IOpenModalOrd = (): IOpenModalOrd => ({
    type: MODALWINDOW_OPEN_ORD,
})

export const ICloseModalOrd = (): ICloseModalOrd => ({
    type: MODALWINDOW_CLOSE_ORD,
})

export type TModalActions =
    | IOpenModalIng
    | ICloseModalIng
    | IOpenModalOrd
    | ICloseModalOrd