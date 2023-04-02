//Работа с регистацией, логированием, восстановлением пароля и юзером//
export interface IRegisterUser {
    email: string;
    name: string;
    password: string;
}

export interface ILoginUser {
    email: string;
    name?: string;
    password: string;
}

export interface IUser {
    email: string;
    name: string;
    password?: string;
}
//////!!!!!!
export interface IUserInitialState {
    name: any;
    email: string;
    password: any;
    token: string;
    visitedFogotPage: boolean;
    isUserCheked: boolean;
    registerRequest: boolean;
    registerFailed: boolean;
    logInUserRequest: boolean;
    logInUserFailed: boolean;
    logOutUserRequest: boolean;
    logOutUserFailed: boolean;
    forgotPasswordRequest: boolean;
    forgotPasswordFailed: boolean;
    resetPasswordRequest: boolean;
    resetPasswordFailed: boolean;
}


//Работа с ингредиентами//
export interface IIngredient {
    readonly _id: string
    readonly name: string
    readonly type: string
    readonly proteins: number
    readonly fat: number
    readonly carbohydrates: number
    readonly calories: number
    readonly price: number
    readonly image: string
    readonly image_mobile: string
    readonly image_large: string
    readonly __v: number
}

export type TIngredientsInitialState = {
    ingredients: Array<IIngredient>
    ingredientsRequest: boolean
    ingredientsFailed: boolean
}

//Работа с конструктором
export type TIngredientWithKey = IIngredient & { key: string }

export type TConstructorInitialState = {
    totalSumm: any
    bun: any,
    otherIngredients: any,
    counters: any,
    prevBunPrice: number
}

export type TCurrentIngredientState = {
    currentIngredient: IIngredient | null
}

//Работа с заказами//
export interface IOrder {
    readonly _id: string;
    readonly ingredients: Array<string>;
    readonly status: string;
    readonly name: string;
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly number: number;
}

export interface IOrderInitialState {
    orderNumber: undefined | number | any,
    orderNumberRequest: boolean,
    orderNumberFailed: boolean,
}

//Работа с веб-сокетом//
export type TWsInitialState = {
    wsStart: boolean
    wsConnected: boolean
    orders: Array<IOrder>
    total: number
    totalToday: number
    errorType?: null | string
    loading?: any
}

export interface IWebSocket {
    wsInit: string;
    onOpen: string;
    onClose: string;
    onClosed: string;
    onError: string;
    onOrders: string;
    wsSendOrders: string;
}

export type TOrder = {
    createdAt: string
    ingredients: Array<string>
    name: string
    number: number
    status: string
    updatedAt: string
    _id: string
}

export type TOrdersResponse = {
    success: boolean
    orders: TOrder[]
    total: number
    totalToday: number
}

//Работа с модалкой 
export type TModalInitialState = {
    isOpenIng: boolean
    isOpenOrd: boolean
}