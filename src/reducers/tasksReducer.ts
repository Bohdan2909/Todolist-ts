import {TasksType, TaskType} from '../App';
import {v1} from 'uuid';
import {AddTodolistAC, RemoveTodolistAC, todolistID1, todolistID2} from './todolistsReducer';


type ActionType =
    RemoveTasksAC
    | AddTasksAC
    | ChangeTaskStatusAC
    | UpdateTasksTitleAC
    | UpdateTasksAC
    | AddTasksForTodolistAC
    | AddTodolistAC
    | RemoveTodolistAC
const initialState: TasksType = {
    [todolistID1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false},
    ],
    [todolistID2]: [
        {id: v1(), title: 'HTML&CSS2', isDone: true},
        {id: v1(), title: 'JS2', isDone: true},
        {id: v1(), title: 'ReactJS2', isDone: false},
        {id: v1(), title: 'Rest API2', isDone: false},
        {id: v1(), title: 'GraphQL2', isDone: false},
    ],
}
export const tasksReducer = (state: TasksType = initialState, action: ActionType): TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK': {

            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId)
            }
        }
        case 'ADD-TASK': {
            let newTask: TaskType = {id: v1(), title: action.payload.value, isDone: false}
            return {
                ...state,
                [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]

            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(el => el.id === action.payload.taskId ? {...el, isDone: action.payload.isDone} : el)
            }
        }
        case 'UPDATE-TASK-TITLE': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(task => task.id === action.payload.taskId ? {...task, title: action.payload.newTitle} : task)
            }
        }

        case 'ADD-TODOLIST': {

            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            let copySate = {...state}
            delete copySate[action.payload.todolistId]
            return copySate

        }
        default:
            return state
    }
};


export type RemoveTasksAC = ReturnType<typeof RemoveTasksAC>
export const RemoveTasksAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistId,
            taskId
        }
    } as const
}
export type AddTasksAC = ReturnType<typeof AddTasksAC>
export const AddTasksAC = (todolistId: string, value: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistId,
            value
        }
    } as const
}
export type ChangeTaskStatusAC = ReturnType<typeof ChangeTaskStatusAC>
export const ChangeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todolistId,
            taskId,
            isDone
        }
    } as const
}
export type UpdateTasksTitleAC = ReturnType<typeof UpdateTasksTitleAC>
export const UpdateTasksTitleAC = (todolistId: string, taskId: string, newTitle: string) => {
    return {
        type: 'UPDATE-TASK-TITLE',
        payload: {
            todolistId,
            taskId,
            newTitle
        }
    } as const
}
export type UpdateTasksAC = ReturnType<typeof UpdateTasksAC>
export const UpdateTasksAC = () => {
    return {
        type: 'UPDATE-TASKS',

    } as const
}
export type AddTasksForTodolistAC = ReturnType<typeof AddTasksForTodolistAC>
export const AddTasksForTodolistAC = (todolistId: string) => {
    return {
        type: 'ADD-TASKS-FOR-TODOLIST',
        todolistId

    } as const
}
