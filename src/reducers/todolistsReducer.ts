import {v1} from 'uuid';
import {TodolistType} from '../api/todolist-api';

export let todolistID1 = v1()
export let todolistID2 = v1()
export type BtnType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: BtnType
}
const initialState: TodolistDomainType[] = [
    // {id: todolistID1, title: 'What to learn', filter: 'all'},
    // {id: todolistID2, title: 'What to buy', filter: 'all'}
]
export type ActionTodolistType = RemoveTodolistAC | BtnFilterAC | UpdateTitleTodolistAC | AddTodolistAC

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionTodolistType): TodolistDomainType[] => {

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
            const newTodolist: TodolistDomainType = {id: action.todolistId, title: action.newTitle, filter: 'all',addedDate:'',order:0}
            return [
                newTodolist,
                ...state
            ]
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
export const AddTodolistAC = (newTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        newTitle,
        todolistId: v1()

    } as const
}

