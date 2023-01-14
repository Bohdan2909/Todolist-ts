import {v1} from 'uuid';
import {todolistsAPI, TodolistType} from '../api/todolist-api';
import {Dispatch} from 'redux';
import {ThunkType} from './store';

export let todolistID1 = v1()
export let todolistID2 = v1()
//Types
export type BtnType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & { filter: BtnType }
export type RemoveTodolistTypeAC = ReturnType<typeof removeTodolistAC>
export type BtnFilterTypeAC = ReturnType<typeof btnFilterAC>
export type UpdateTitleTodolistTypeAC = ReturnType<typeof updateTitleTodolistAC>
export type AddTodolistTypeAC = ReturnType<typeof addTodolistAC>
export type SetTodolistsTypeAC = ReturnType<typeof setTodolistsAC>
export type TodolistActionType =
    RemoveTodolistTypeAC
    | BtnFilterTypeAC
    | UpdateTitleTodolistTypeAC
    | AddTodolistTypeAC
    | SetTodolistsTypeAC
//Initial State
const initialState: TodolistDomainType[] = []
export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: TodolistActionType): TodolistDomainType[] => {

    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(t => t.id !== action.payload.todolistId)

        }
        case 'BTN-FILTER': {
            return state.map(el => el.id === action.payload.todolistId ? {...el, filter: action.payload.btn} : el)
        }
        case 'UPDATE-TODOLIST-TITLE': {
            return state.map(t => t.id === action.payload.todolistId ? {...t, title: action.payload.newTitle} : t)

        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistDomainType = {...action.todolist, filter: 'all'}
            return [
                newTodolist,
                ...state
            ]
        }
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
        }
        default:
            return state
    }

}

//Actions
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId
        }
    } as const
}
export const btnFilterAC = (todolistId: string, btn: BtnType) => {
    return {
        type: 'BTN-FILTER',
        payload: {
            todolistId,
            btn
        }
    } as const
}
export const updateTitleTodolistAC = (todolistId: string, newTitle: string) => {
    return {
        type: 'UPDATE-TODOLIST-TITLE',
        payload: {
            todolistId,
            newTitle
        }
    } as const
}
export const addTodolistAC = (todolist: TodolistType) => {
    return {
        type: 'ADD-TODOLIST',
        todolist

    } as const
}
export const setTodolistsAC = (todolists: TodolistType[]) => {
    return {
        type: 'SET-TODOLISTS',
        todolists


    } as const
}


//Thunks
export const fetchTodolistsTC = (): ThunkType => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTodolist()
            .then(res => dispatch(setTodolistsAC(res.data)))
    }
}
export const deleteTodolistsTC = (todolistId: string): ThunkType => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTodolist(todolistId)
            .then(res => dispatch(removeTodolistAC(todolistId)))
    }
}
export const addTodolistsTC = (title: string): ThunkType => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTodolist(title)
            .then(res => dispatch(addTodolistAC(res.data.data.item)))
    }
}
export const changeTodolistsTC = (todolistId: string, newTitle: string): ThunkType => {
    return (dispatch: Dispatch) => {
        todolistsAPI.updateTodolist(todolistId, newTitle)
            .then(res => dispatch(updateTitleTodolistAC(todolistId, newTitle)))
    }
}

