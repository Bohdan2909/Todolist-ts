import {v1} from 'uuid';
import {todolistsAPI, TodolistType} from '../api/todolist-api';
import {Dispatch} from 'redux';
import {ThunkType} from './store';
import {RequestStatusType, setAppStatusAC} from './appReducer';

export let todolistID1 = v1()
export let todolistID2 = v1()
//Types
export type BtnType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: BtnType
    entityStatus: RequestStatusType
}
export type RemoveTodolistTypeAC = ReturnType<typeof removeTodolistAC>
export type BtnFilterTypeAC = ReturnType<typeof btnFilterAC>
export type UpdateTitleTodolistTypeAC = ReturnType<typeof updateTitleTodolistAC>
export type AddTodolistTypeAC = ReturnType<typeof addTodolistAC>
export type SetTodolistsTypeAC = ReturnType<typeof setTodolistsAC>
export type ChangeTodolistEntityStatusTypeAC = ReturnType<typeof changeTodolistEntityStatusAC>
export type TodolistActionType =
    RemoveTodolistTypeAC
    | BtnFilterTypeAC
    | UpdateTitleTodolistTypeAC
    | AddTodolistTypeAC
    | SetTodolistsTypeAC
    | ChangeTodolistEntityStatusTypeAC
//Initial State
const initialState: TodolistDomainType[] = []
export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: TodolistActionType): TodolistDomainType[] => {

    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(t => t.id !== action.payload.todolistId)

        }
        case 'BTN-FILTER': {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.btn} : tl)
        }
        case 'UPDATE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, title: action.payload.newTitle} : tl)

        }
        case 'CHANGE-TODOLIST-ENTITY-STATUS': {
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistDomainType = {...action.todolist, filter: 'all', entityStatus: 'idle'}
            return [
                newTodolist,
                ...state
            ]
        }
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
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
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => {
    return {
        type: 'CHANGE-TODOLIST-ENTITY-STATUS',
        status,
        id
    } as const
}


//Thunks
export const fetchTodolistsTC = (): ThunkType => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.getTodolist()
            .then(res => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setAppStatusAC('succeeded'))
            })

    }
}
export const deleteTodolistsTC = (todolistId: string): ThunkType => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
        todolistsAPI.deleteTodolist(todolistId)
            .then(res => {
                dispatch(removeTodolistAC(todolistId))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}
export const addTodolistsTC = (title: string): ThunkType => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.createTodolist(title)
            .then(res => {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}
export const changeTodolistsTC = (todolistId: string, newTitle: string): ThunkType => {
    return (dispatch: Dispatch) => {
        todolistsAPI.updateTodolist(todolistId, newTitle)
            .then(res => dispatch(updateTitleTodolistAC(todolistId, newTitle)))
    }
}

