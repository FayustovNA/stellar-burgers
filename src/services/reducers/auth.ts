import { TUserActions } from '../action/auth';
import { IUserInitialState } from '../types/data';

import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILED,

    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,

    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,

    UPDATE_USERINFO_REQUEST,
    UPDATE_USERINFO_SUCCESS,
    UPDATE_USERINFO_FAILED,

    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED,

    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,

    USER_CHECK_SUCCESS,
    USER_AUTH_SUCCESS,
    USER_AUTH_FAILED,

    // GET_USERINFO_REQUEST,
    // GET_USERINFO_SUCCESS,
    // GET_USERINFO_FAILED,
} from '../constans/auth';

const initialState: IUserInitialState = {
    name: '',
    email: '',
    password: '',
    token: '',
    visitedFogotPage: false,
    isUserCheked: false,
    registerRequest: false,
    registerFailed: false,
    logInUserRequest: false,
    logInUserFailed: false,
    logOutUserRequest: false,
    logOutUserFailed: false,
    forgotPasswordRequest: false,
    forgotPasswordFailed: false,
    resetPasswordRequest: false,
    resetPasswordFailed: false,
}


export const authReducer = (
    state = initialState,
    action: TUserActions): IUserInitialState => {
    switch (action.type) {

        case USER_AUTH_SUCCESS:
        case USER_CHECK_SUCCESS: {
            return {
                ...state,
                name: action.user.name,
                email: action.user.email,
                isUserCheked: true,
            };
        }
        case USER_AUTH_FAILED: {
            return {
                ...state,
                isUserCheked: false,
            };
        }
        case UPDATE_USERINFO_REQUEST:
        case REGISTER_REQUEST: {
            return {
                ...state,
                registerRequest: true,
                registerFailed: false,
            };
        }
        case UPDATE_USERINFO_SUCCESS:
        case REGISTER_SUCCESS: {
            return {
                ...state,
                registerRequest: false,
                registerFailed: false,
                name: action.user.name,
                email: action.user.email,
                password: action.user.password
            };
        }
        case UPDATE_USERINFO_FAILED:
        case REGISTER_FAILED: {
            return {
                ...state,
                registerRequest: false,
                registerFailed: true,
            };
        }
        case LOGIN_REQUEST: {
            return {
                ...state,
                logInUserRequest: true,
                logInUserFailed: false,
            };
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                name: action.user.name,
                email: action.user.email,
                logInUserRequest: false,
                logInUserFailed: false,
            };
        }
        case LOGIN_FAILED: {
            return {
                ...state,
                logInUserRequest: false,
                logInUserFailed: true,
            };
        }
        case LOGOUT_REQUEST: {
            return {
                ...state,
                logOutUserRequest: true,
                logOutUserFailed: false,
            };
        }
        case LOGOUT_SUCCESS: {
            return {
                ...state,
                name: '',
                email: '',
                password: '',
                logOutUserRequest: false,
                logOutUserFailed: false,
            };
        }
        case LOGOUT_FAILED: {
            return {
                ...state,
                logOutUserRequest: false,
                logOutUserFailed: true,
            };
        }
        case FORGOT_PASSWORD_REQUEST: {
            return {
                ...state,
                forgotPasswordRequest: true,
                forgotPasswordFailed: false,
            }
        }
        case FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                visitedFogotPage: true,
                forgotPasswordRequest: false,
                forgotPasswordFailed: false,
            }
        }
        case FORGOT_PASSWORD_FAILED: {
            return {
                ...state,
                forgotPasswordRequest: false,
                forgotPasswordFailed: true,
            }
        }
        case RESET_PASSWORD_REQUEST: {
            return {
                ...state,
                resetPasswordRequest: true,
                resetPasswordFailed: false,
            }
        }
        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                resetPasswordRequest: false,
                resetPasswordFailed: false,
            }
        }
        case RESET_PASSWORD_FAILED: {
            return {
                ...state,
                resetPasswordRequest: false,
                resetPasswordFailed: true,
            }
        }
        default: {
            return state;
        }
    }
};
