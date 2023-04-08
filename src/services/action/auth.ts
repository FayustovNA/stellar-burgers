import { checkResponse, mainUrl } from '../../utils/check-response';
import { setCookie, deleteCookie, getCookie, fetchWithRefresh, refreshToken } from '../../utils/utils';
import { AppDispatch, AppThunk } from '../types/index';
import { IRegisterUser, ILoginUser, IUser } from '../types/data';
import {
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILED,
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED,
    LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILED,
    GET_USERINFO_REQUEST, GET_USERINFO_SUCCESS, GET_USERINFO_FAILED,
    UPDATE_USERINFO_REQUEST, UPDATE_USERINFO_SUCCESS, UPDATE_USERINFO_FAILED,
    FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILED,
    RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED,
    USER_CHECK_SUCCESS, USER_AUTH_SUCCESS, USER_AUTH_FAILED
} from '../constans/auth';
import { TUserRegisterResponse } from '../types/data';


export interface IRegisterRequest {
    readonly type: typeof REGISTER_REQUEST
}

export interface IRegisterSuccess {
    readonly type: typeof REGISTER_SUCCESS
    readonly user: IRegisterUser
}

export interface IRegisterFailed {
    readonly type: typeof REGISTER_FAILED
}

export interface ILoginRequest {
    readonly type: typeof LOGIN_REQUEST
}

export interface ILoginSuccess {
    readonly type: typeof LOGIN_SUCCESS
    readonly user: ILoginUser
}

export interface ILoginFaild {
    readonly type: typeof LOGIN_FAILED
}

export interface ILogoutRequest {
    readonly type: typeof LOGOUT_REQUEST
}

export interface ILogoutSuccess {
    readonly type: typeof LOGOUT_SUCCESS
}

export interface ILogoutFailed {
    readonly type: typeof LOGOUT_FAILED
}

export interface IGetUserInfoRequest {
    readonly type: typeof GET_USERINFO_REQUEST
}

export interface IGetUserInfoSuccess {
    readonly type: typeof GET_USERINFO_SUCCESS
    readonly user: IUser
}

export interface IGetUserInfoFailed {
    readonly type: typeof GET_USERINFO_FAILED
}

export interface IUpdateUserRequest {
    readonly type: typeof UPDATE_USERINFO_REQUEST
}

export interface IUpdateUserSuccess {
    readonly type: typeof UPDATE_USERINFO_SUCCESS
    readonly user: IUser
}

export interface IUpdateUserFaild {
    readonly type: typeof UPDATE_USERINFO_FAILED
}

export interface IForgotPasswordRequest {
    readonly type: typeof FORGOT_PASSWORD_REQUEST
}

export interface IForgotPasswordSuccess {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS
}

export interface IForgotPasswordFailed {
    readonly type: typeof FORGOT_PASSWORD_FAILED
}

export interface IResetPasswordRequest {
    readonly type: typeof RESET_PASSWORD_REQUEST
}

export interface IResetPasswordSuccess {
    readonly type: typeof RESET_PASSWORD_SUCCESS
}

export interface IResetPasswordFailed {
    readonly type: typeof RESET_PASSWORD_FAILED
}

export interface IUserAuthSuccess {
    readonly type: typeof USER_AUTH_SUCCESS
}

export interface IUserCheckSuccess {
    readonly type: typeof USER_CHECK_SUCCESS
    readonly user: IUser
}

export interface IUserAuthFaild {
    readonly type: typeof USER_AUTH_FAILED
}

export type TUserActions =
    | IRegisterRequest
    | IRegisterSuccess
    | IRegisterFailed
    | ILoginRequest
    | ILoginSuccess
    | ILoginFaild
    | ILogoutRequest
    | ILogoutSuccess
    | ILogoutFailed
    | IGetUserInfoRequest
    | IGetUserInfoSuccess
    | IGetUserInfoFailed
    | IUpdateUserRequest
    | IUpdateUserSuccess
    | IUpdateUserFaild
    | IForgotPasswordRequest
    | IForgotPasswordSuccess
    | IForgotPasswordFailed
    | IResetPasswordRequest
    | IResetPasswordSuccess
    | IResetPasswordFailed
    | IUserAuthSuccess
    | IUserCheckSuccess
    | IUserAuthFaild;

export const registerRequest = (): IRegisterRequest => ({
    type: REGISTER_REQUEST,
})

export const registerSuccess = (
    user: IRegisterUser
): IRegisterSuccess => ({
    type: REGISTER_SUCCESS,
    user,
})

export const registerFailed = (): IRegisterFailed => ({
    type: REGISTER_FAILED,
})

export const getUserInfoRequest = (): IGetUserInfoRequest => ({
    type: GET_USERINFO_REQUEST,
})

export const getUserInfoRequestSuccess = (user: IUser): IGetUserInfoSuccess => ({
    type: GET_USERINFO_SUCCESS,
    user,
})

export const getUserInfoRequestFailed = (): IGetUserInfoFailed => ({
    type: GET_USERINFO_FAILED,
})

export const loginRequest = (): ILoginRequest => ({
    type: LOGIN_REQUEST,
})

export const loginSuccess = (user: ILoginUser): ILoginSuccess => ({
    type: LOGIN_SUCCESS,
    user,
})

export const loginFailed = (): ILoginFaild => ({
    type: LOGIN_FAILED,
})

export const logoutRequest = (): ILogoutRequest => ({
    type: LOGOUT_REQUEST,
})

export const logoutSuccess = (): ILogoutSuccess => ({
    type: LOGOUT_SUCCESS,
})

export const logoutFailed = (): ILogoutFailed => ({
    type: LOGOUT_FAILED,
})


export const updateUserRequest = (): IUpdateUserRequest => ({
    type: UPDATE_USERINFO_REQUEST,
})

export const updateUserSuccess = (
    user: IUser
): IUpdateUserSuccess => ({
    type: UPDATE_USERINFO_SUCCESS,
    user,
})

export const updateUserFailed = (): IUpdateUserFaild => ({
    type: UPDATE_USERINFO_FAILED,
})

export const forgotPasswordRequest = (): IForgotPasswordRequest => ({
    type: FORGOT_PASSWORD_REQUEST,
})

export const forgotPasswordSuccess = (
): IForgotPasswordSuccess => ({
    type: FORGOT_PASSWORD_SUCCESS,
})

export const forgotPasswordFailed = (): IForgotPasswordFailed => ({
    type: FORGOT_PASSWORD_FAILED,
})

export const resetPasswordAction = (): IResetPasswordRequest => ({
    type: RESET_PASSWORD_REQUEST,
})

export const resetPasswordSuccessAction = (): IResetPasswordSuccess => ({
    type: RESET_PASSWORD_SUCCESS,
})

export const resetPasswordFailedAction = (): IResetPasswordFailed => ({
    type: RESET_PASSWORD_FAILED,
})

export const userAuthSuccess = (): IUserAuthSuccess => ({
    type: USER_AUTH_SUCCESS,
})

export const userCheckSuccess = (user: IUser): IUserCheckSuccess => ({
    type: USER_CHECK_SUCCESS,
    user
})


export const userAuthFaild = (): IUserAuthFaild => ({
    type: USER_AUTH_FAILED,
})


//Регистрация пользователя
export function registrationUsers({ name, email, password }: IRegisterUser, gotologin: any) {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: REGISTER_REQUEST
        })
        fetch(`${mainUrl}/auth/register`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                email: email,
                password: password,
                name: name,
            })
        })
            .then(checkResponse)
            .then((res) => {
                if (res && res.success) {
                    const authToken = res.accessToken.split('Bearer ')[1]
                    const refreshToken = res.refreshToken
                    setCookie('token', authToken)
                    localStorage.setItem('refreshToken', refreshToken)
                    dispatch({
                        type: REGISTER_SUCCESS,
                        user: res.user,
                    })
                    gotologin()
                } else {
                    console.error('Error')
                    dispatch({
                        type: REGISTER_FAILED,
                    })
                }
            })
            .catch((error) => {
                dispatch({
                    type: REGISTER_FAILED,
                })
                console.error('Возникла проблема с вашим запросом', error)
            })
    }
}


//Логирование в личный кабинет
export function logInUser({ email, password }: ILoginUser) {

    return function (dispatch: AppDispatch) {
        dispatch({
            type: LOGIN_REQUEST
        })
        fetch(`${mainUrl}/auth/login`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                email: email,
                password: password,
            })
        })
            .then(checkResponse)
            .then((res) => {
                if (res && res.success) {
                    const authToken = res.accessToken.split('Bearer ')[1]
                    const refreshToken = res.refreshToken
                    setCookie('token', authToken)
                    localStorage.setItem('refreshToken', refreshToken)
                    dispatch({
                        type: LOGIN_SUCCESS,
                        user: res.user,
                    })
                    // dispatch({
                    //     goToPage,
                    // })
                } else {
                    dispatch({
                        type: LOGIN_FAILED
                    })
                }
            })
            .catch((error) => {
                dispatch({
                    type: LOGIN_FAILED,
                })
                console.error('Возникла проблема с вашим запросом', error)
            })
    }
}

//Выход из личного кабинета
export function logOutUser() {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: LOGOUT_REQUEST
        })
        fetch(`${mainUrl}/auth/logout`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                token: localStorage.getItem('refreshToken'),
            })
        })
            .then(checkResponse)
            .then((res) => {
                if (res && res.success) {
                    deleteCookie('token')
                    localStorage.removeItem('refreshToken')
                    dispatch({
                        type: LOGOUT_SUCCESS,
                    })
                } else {
                    dispatch({
                        type: LOGOUT_FAILED
                    })
                }
            })
            .catch((error) => {
                dispatch({
                    type: LOGOUT_FAILED,
                })
                console.error('Возникла проблема с вашим запросом', error)
            })
    }
}

//Получение данных пользователя
export function getUserInfo() {
    return function (dispatch: AppDispatch) {
        dispatch(getUserInfoRequest())
        fetchWithRefresh<TUserRegisterResponse>(`${mainUrl}/auth/user`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json;charger=utf-8',
                Authorization: 'Bearer ' + getCookie('token'),
            },
        })
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: GET_USERINFO_SUCCESS,
                        user: res.user,
                    })
                } else {
                    dispatch(getUserInfoRequestFailed());
                }
            })
            .catch((error) => {
                dispatch(getUserInfoRequestFailed())
                console.error('Возникла проблема с вашим запросом', error)
            })
    }
}

//Проверка был ли пользователь
export function checkUserRegistration() {
    return function (dispatch: AppDispatch) {
        if (getCookie('token')) {
            dispatch(getUserInfo())
        } else dispatch({ type: 'USER_AUTH_SUCCESS' })
    }
}

//Обновление данных пользователя
export function updateUserInfo({ name, email, password }: IRegisterUser) {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: UPDATE_USERINFO_REQUEST
        })
        fetch(`${mainUrl}/auth/user`, {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json;charger=utf-8',
                authorization: `Bearer ${getCookie('token')}`,
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
            }),
        })
            .then(checkResponse)
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: UPDATE_USERINFO_SUCCESS,
                        user: res.user,
                    })
                } else {
                    dispatch({
                        type: UPDATE_USERINFO_FAILED
                    })
                }
            })
            .catch((error) => {
                dispatch({
                    type: UPDATE_USERINFO_FAILED,
                })
                console.error('Возникла проблема с обновлением', error)
            })
    }
}

//Запрос на восстановление пароля
export function forgotPassword(email: { email: string }, resetpage: any) {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST,
        })
        fetch(`${mainUrl}/password-reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charger=utf-8',
            },
            body: JSON.stringify({
                email: email,
            }),
        }).then(checkResponse)
            .then((res) => {
                dispatch({
                    type: FORGOT_PASSWORD_SUCCESS,
                })
                resetpage();
            })
            .catch((error) => {
                dispatch({
                    type: FORGOT_PASSWORD_FAILED,
                })
            })
    }
}

//Восстановление пароля
export function resetPassword(password: string, token: string, navigate?: any) {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: RESET_PASSWORD_REQUEST,
        })
        fetch(`${mainUrl}/password-reset/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charger=utf-8',
            },
            body: JSON.stringify({
                password: password,
                token: token,
            }),
        }).then(checkResponse)
            .then((res) => {
                dispatch({
                    type: RESET_PASSWORD_SUCCESS,
                })
                navigate();
            })
            .catch((error) => {
                dispatch({
                    type: RESET_PASSWORD_FAILED,
                })
            })
    }
}

//Проверка пользователя на авторизованность в сессии
export function checkUserAuth() {
    return function (dispatch: AppDispatch) {
        return fetch(`${mainUrl}/auth/user`, {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${getCookie('token')}`,
            },
        }).then(checkResponse)
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: USER_AUTH_SUCCESS,
                        user: res.user,
                    })
                } else {
                    dispatch({
                        type: USER_AUTH_FAILED
                    })
                }
            })
            .catch((error) => {
                if (error.message === 'Token is invalid' || "jwt expired" || "jwt malformed" || 'Token is invalid') {
                    dispatch(refreshToken());
                }
            })
    }
}
