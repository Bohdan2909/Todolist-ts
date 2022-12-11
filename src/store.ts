import {combineReducers, createStore} from 'redux';
import {todolistsReducer} from './reducers/todolistsReducer';
import {tasksReducer} from './reducers/tasksReducer';


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks:tasksReducer
})

export type AppStateType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer)

// @ts-ignore
window.store=store