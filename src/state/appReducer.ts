import {authAPI} from '../api/todolist-api';
import {Dispatch} from 'redux';
import {setIsLoggedInAC} from './authReducer';

export type InitialStateType = {
    //відбувається взаємодія з сервером
    status:RequestStatusType ,
    //якшо буде якась ошибка запишемо сюда
    error: string | null,
    //true коли провірили пользователя и получили настройки
    isInitialized:boolean
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type SetErrorType = ReturnType<typeof setAppErrorAC>
export type SetStatusType =ReturnType<typeof setAppStatusAC>
export type SetAppInitializedType = ReturnType<typeof setAppInitializedAC>
export type AppReducerActionsType = SetErrorType | SetStatusType|SetAppInitializedType

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}
export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS': {
            return {...state, status: action.status}
        }
        case 'APP/SET-ERROR': {
            return {...state, error: action.error}
        }
        case 'APP/SET-INITIALIZED': {
            return {...state, isInitialized: action.value}
        }
        default:
            return {...state}
    }
}

export const setAppErrorAC = (error: string | null) => {
    return {
        type: 'APP/SET-ERROR',
        error
    }as const
}
export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        status
    }as const
}
export const setAppInitializedAC = (value: boolean) => {
    return {
        type: 'APP/SET-INITIALIZED',
        value
    }as const
}
//Thunk
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))

        }else{

        }
        dispatch(setAppInitializedAC(true));
    })
}
