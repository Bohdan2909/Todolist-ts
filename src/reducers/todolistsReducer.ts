import {BtnType, TodolistType} from '../App';
import {v1} from 'uuid';

export let todolistID1 = v1()
export let todolistID2 = v1()
const initialState: TodolistType[] = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'}
]
export type ActionType = RemoveTodolistAC | BtnFilterAC | UpdateTitleTodolistAC | AddTodolistAC

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionType): TodolistType[] => {

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
            const newTodolist: TodolistType = {id: action.todolistId, title: action.newTitle, filter: 'all'}
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

