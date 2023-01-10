import {v1} from 'uuid';
import {todolistsAPI, TodolistType} from '../api/todolist-api';
import {ThunkType} from '../store';
import {Dispatch} from 'redux';

export let todolistID1 = v1()
export let todolistID2 = v1()
export type BtnType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: BtnType
}
const initialState: TodolistDomainType[] = []
export type TodolistActionType =
    RemoveTodolistAC
    | BtnFilterAC
    | UpdateTitleTodolistAC
    | AddTodolistAC
    | SetTodolistsType

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
            // const newTodolist: TodolistDomainType = {
            //     id: action.todolistId,
            //     title: action.newTitle,
            //     filter: 'all',
            //     addedDate: '',
            //     order: 0
            // }
            const newTodolist: TodolistDomainType = {...action.todolist, filter:'all'}
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
export type RemoveTodolistAC = ReturnType<typeof RemoveTodolistAC>
export const RemoveTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId
        }
    } as const
}
export type BtnFilterAC = ReturnType<typeof BtnFilterAC>
export const BtnFilterAC = (todolistId: string, btn: BtnType) => {
    return {
        type: 'BTN-FILTER',
        payload: {
            todolistId,
            btn
        }
    } as const
}
export type UpdateTitleTodolistAC = ReturnType<typeof UpdateTitleTodolistAC>
export const UpdateTitleTodolistAC = (todolistId: string, newTitle: string) => {
    return {
        type: 'UPDATE-TODOLIST-TITLE',
        payload: {
            todolistId,
            newTitle
        }
    } as const
}

export type AddTodolistAC = ReturnType<typeof AddTodolistAC>
export const AddTodolistAC = (todolist:TodolistType) => {
    return {
        type: 'ADD-TODOLIST',
        todolist

    } as const
}
export type SetTodolistsType = ReturnType<typeof SetTodolistsAC>
export const SetTodolistsAC = (todolists: TodolistType[]) => {
    return {
        type: 'SET-TODOLISTS',
        todolists


    } as const
}

//Thunks

export const fetchTodolistsTC = ():any => {
    return (dispatch:Dispatch) => {
        todolistsAPI.getTodolist()
            .then(res => dispatch(SetTodolistsAC(res.data)))
    }
}
export const deleteTodolistsTC = (todolistId:string):any => {
    return (dispatch:Dispatch) => {
        todolistsAPI.deleteTodolist(todolistId)
            .then(res => dispatch(RemoveTodolistAC(todolistId)))
    }
}
export const addTodolistsTC = (title:string):any => {
    return (dispatch:Dispatch) => {
        todolistsAPI.createTodolist(title)
            .then(res => dispatch(AddTodolistAC(res.data.data.item)))
    }
}
export const changeTodolistsTC = (todolistId: string, newTitle: string):any => {
    return (dispatch:Dispatch) => {
        todolistsAPI.updateTodolist(todolistId,newTitle)
            .then(res => dispatch(UpdateTitleTodolistAC(todolistId,newTitle)))
    }
}

