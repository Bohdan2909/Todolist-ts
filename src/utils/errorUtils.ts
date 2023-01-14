import {setAppErrorAC, setAppStatusAC} from '../state/appReducer';
import {ResponseType} from '../api/todolist-api'
import {Dispatch} from 'redux';

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error'))
    }
    dispatch(setAppStatusAC('failed'))

}
export const handleServerNetworkError = <D>(e: {message:string}, dispatch: Dispatch) => {
    dispatch(setAppErrorAC(e.message ? e.message : 'Some error'))
    dispatch(setAppStatusAC('failed'))

}