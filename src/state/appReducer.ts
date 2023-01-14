export type InitialStateType = {
    status:RequestStatusType ,
    error: string | null
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type SetErrorType = ReturnType<typeof setAppErrorAC>
export type SetStatusType =ReturnType<typeof setAppStatusAC>
export type AppReducerActionsType = SetErrorType | SetStatusType

const initialState: InitialStateType = {
    status: 'idle',
    error: null
}
export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS': {
            return {...state, status: action.status}
        }
        case 'APP/SET-ERROR': {
            return {...state, error: action.error}
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