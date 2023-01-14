import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {TodolistActionType, todolistsReducer} from './todolistsReducer';
import {TasksActionType, tasksReducer} from './tasksReducer';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {useDispatch} from 'react-redux';
import {appReducer, AppReducerActionsType} from './appReducer';

export type DispatchThunkType = ThunkDispatch<AppStateType, any, AnyAction>
export type AppActionsType = TasksActionType | TodolistActionType | AppReducerActionsType
export type ThunkType = ThunkAction<void, AppStateType, unknown, AppActionsType>
export type AppStateType = ReturnType<typeof rootReducer>
export const appDispatch = () => useDispatch<DispatchThunkType>() // заміна useDispatch


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app:appReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))

// @ts-ignore
window.store = store

// export type ThunkType<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionsType>