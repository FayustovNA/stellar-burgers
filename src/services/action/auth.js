import { checkResponse, mainUrl } from '../../utils/check-response';
import { setCookie, deleteCookie, getCookie } from '../../utils/utils';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const GET_USERINFO_REQUEST = 'GET_USERINFO_REQUEST';
export const GET_USERINFO_SUCCESS = 'GET_USERINFO_SUCCESS';
export const GET_USERINFO_FAILED = 'GET_USERINFO_FAILED';

export const UPDATE_USERINFO_REQUEST = 'UPDATE_USERINFO_REQUEST';
export const UPDATE_USERINFO_SUCCESS = 'UPDATE_USERINFO_SUCCESS';
export const UPDATE_USERINFO_FAILED = 'UPDATE_USERINFO_FAILED';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export const USER_CHECK = 'USER_CHECK';

//Регистрация пользователя
export function registrationUsers({ name, email, password }) {
    return function (dispatch) {
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
                    console.log(res)
                    const authToken = res.accessToken.split('Bearer ')[1]
                    const refreshToken = res.refreshToken
                    setCookie('token', authToken)
                    localStorage.setItem('refreshToken', refreshToken)
                    dispatch({
                        type: REGISTER_SUCCESS,
                        user: res.user,
                    })
                } else {
                    console.log('Error')
                    dispatch({
                        type: REGISTER_FAILED,
                    })
                }
            })
            .catch((error) => {
                dispatch({
                    type: REGISTER_FAILED,
                })
                console.log('Возникла проблема с вашим запросом', error)
            })
    }
}

//Логирование в личный кабинет
export function logInUser({ email, password }) {

    return function (dispatch) {
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
                    console.log(res)
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
                console.log('Возникла проблема с вашим запросом', error)
            })
    }
}

//Выход из личного кабинета
export function logOutUser() {
    return function (dispatch) {
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
                console.log('Возникла проблема с вашим запросом', error)
            })
    }
}

//Получение данных пользователя
export function getUserInfo() {
    return function (dispatch) {
        dispatch({
            type: GET_USERINFO_REQUEST
        })
        fetch(`${mainUrl}/auth/user`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json;charger=utf-8',
                Authorization: 'Bearer ' + getCookie('token'),
            },
        })
            .then(checkResponse)
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: GET_USERINFO_SUCCESS,
                        user: res.user,
                    })
                } else {
                    dispatch({
                        type: GET_USERINFO_FAILED
                    })
                }
            })
            .catch((error) => {
                dispatch({
                    type: GET_USERINFO_FAILED,
                })
                console.log('Возникла проблема с вашим запросом', error)
            })
    }
}

//Обновление данных пользователя
export function updateUserInfo({ name, email, password }) {
    return function (dispatch) {
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
                console.log('Возникла проблема с обновлением', error)
            })
    }
}

//Запрос на восстановление пароля
export function forgotPassword({ email }, resetpage) {
    return function (dispatch) {
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
export function resetPassword({ password, token }, navigate) {
    return function (dispatch) {
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

//Проверка был ли пользователь
export const checkUserRegistration = () => async (dispatch) => {
    if (getCookie('token')) {
        try {
            await dispatch(getUserInfo())
        } catch (error) {
            console.log(error)
        }
    }
    await dispatch({ type: 'USER_CHECK' })
}