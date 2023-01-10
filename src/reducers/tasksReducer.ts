import {v1} from 'uuid';
import {
    AddTodolistAC,
    SetTodolistsType,
    RemoveTodolistAC,
    todolistID1,
    todolistID2,
    SetTodolistsAC
} from './todolistsReducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskType} from '../api/todolist-api';
import {Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {AppStateType, ThunkType} from '../store';
import {TasksType} from '../components/TodolistWithRedux';


export type TasksActionType =
    RemoveTasksAC
    | AddTasksAC
    | ChangeTaskStatusAC
    | UpdateTasksTitleAC
    | AddTasksForTodolistAC
    | AddTodolistAC
    | RemoveTodolistAC
    | SetTodolistsType
    | SetTasksTypeAC
const initialState: TasksType = {
    // [todolistID1]: [
    //     {
    //         id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, todoListId: todolistID1,
    //         startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
    //     },
    //     {
    //         id: v1(), title: 'JS', status: TaskStatuses.Completed, todoListId: todolistID1,
    //         startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
    //     },
    //     {
    //         id: v1(), title: 'ReactJS', status: TaskStatuses.New, todoListId: todolistID1,
    //         startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
    //     },
    //     {
    //         id: v1(), title: 'Rest API', status: TaskStatuses.New, todoListId: todolistID1,
    //         startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
    //     },
    //     {
    //         id: v1(), title: 'GraphQL', status: TaskStatuses.New, todoListId: todolistID1,
    //         startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
    //     },
    // ],
    // [todolistID2]: [
    //     {
    //         id: v1(), title: 'HTML&CSS2', status: TaskStatuses.Completed, todoListId: todolistID2,
    //         startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
    //     },
    //     {
    //         id: v1(), title: 'JS2', status: TaskStatuses.Completed, todoListId: todolistID2,
    //         startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
    //     },
    //     {
    //         id: v1(), title: 'ReactJS2', status: TaskStatuses.New, todoListId: todolistID2,
    //         startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
    //     },
    //     {
    //         id: v1(), title: 'Rest API2', status: TaskStatuses.New, todoListId: todolistID2,
    //         startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
    //     },
    //     {
    //         id: v1(), title: 'GraphQL2', status: TaskStatuses.New, todoListId: todolistID2,
    //         startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
    //     },
    // ],
}
export const tasksReducer = (state: TasksType = initialState, action: TasksActionType): TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK': {

            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId)
            }
        }
        case 'ADD-TASK': {
            // let newTask: TaskType = {
            //     id: v1(), title: action.payload.value, status: TaskStatuses.New, todoListId: todolistID1,
            //     startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
            // }
            let newTask = action.payload.task
            let todolistId = newTask.todoListId
            return {
                ...state,
                [todolistId]: [newTask, ...state[todolistId]]

            }
        }
        case 'UPDATE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(el => el.id === action.payload.taskId ? {...el, ...action.payload.model} : el)
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
            let todolistId = action.todolist.id
            return {
                ...state,
                [todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            let copySate = {...state}
            delete copySate[action.payload.todolistId]
            return copySate

        }
        case 'SET-TODOLISTS': {
            let copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'SET-TASKS': {
            let copyState = {...state}
            copyState[action.todolistId] = action.tasks
            return copyState
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
export const AddTasksAC = (task: TaskType) => {
    return {
        type: 'ADD-TASK',
        payload: {
            task
        }
    } as const
}
export type ChangeTaskStatusAC = ReturnType<typeof UpdateTaskAC>
export const UpdateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskType) => {
    return {
        type: 'UPDATE-TASK',
        payload: {
            todolistId,
            taskId,
            model
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

type AddTasksForTodolistAC = ReturnType<typeof AddTasksForTodolistAC>
export const AddTasksForTodolistAC = (todolistId: string) => {
    return {
        type: 'ADD-TASKS-FOR-TODOLIST',
        todolistId

    } as const
}
export type SetTasksTypeAC = ReturnType<typeof setTasksAC>
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {
        type: 'SET-TASKS',
        todolistId,
        tasks

    } as const
}
//Thunks
export const fetchTasksTC = (todolistId: string): any => (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistId)
        .then(res => dispatch(setTasksAC(todolistId, res.data.items)))
}

export const deleteTasksTC = (todolistId: string, taskId: string): any => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(res => dispatch(RemoveTasksAC(todolistId, taskId)))
}
export const addTasksTC = (todolistId: string, title: string): any => (dispatch: Dispatch) => {
    todolistsAPI.createTask(todolistId, title)
        .then(res => dispatch(AddTasksAC(res.data.data.item)))
}
export type UpdateDomainTaskType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskType): any => (dispatch: Dispatch, getState: () => AppStateType) => {
    const state = getState()
    const task = state.tasks[todolistId].find(t => t.id === taskId)
    
    if (!task) return
    const apiModel: UpdateTaskType = {
        description: task.description,
        deadline: task.deadline,
        title: task.title,
        priority: task.priority,
        startDate: task.startDate,
        status: task.status,
        ...domainModel
    }
    todolistsAPI.updateTask(todolistId, taskId, apiModel)
        .then(res => dispatch(UpdateTaskAC(todolistId, taskId, domainModel)))
}