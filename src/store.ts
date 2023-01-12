import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {TodolistActionType, todolistsReducer} from './reducers/todolistsReducer';
import {TasksActionType, tasksReducer} from './reducers/tasksReducer';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {useDispatch} from 'react-redux';


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks:tasksReducer
})
export type DispatchThunkType = ThunkDispatch<AppStateType, any, AnyAction>
export const appDispatch = () => useDispatch<DispatchThunkType>() // заміна useDispatch
export type AppActionsType = TasksActionType | TodolistActionType
// export type ThunkType = ThunkAction<void,AppStateType,unknown,AppActionsType>
export type ThunkType<ReturnType = void> = ThunkAction<
    ReturnType,
    AppStateType,
    unknown,
    AppActionsType
    >
export type AppStateType = ReturnType<typeof rootReducer>
export const store = legacy_createStore(rootReducer,applyMiddleware(thunkMiddleware))

// @ts-ignore
window.store=store