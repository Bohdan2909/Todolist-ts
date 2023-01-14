import {AddTodolistTypeAC, SetTodolistsTypeAC, RemoveTodolistTypeAC,} from './todolistsReducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskType} from '../api/todolist-api';
import {Dispatch} from 'redux';
import {AppStateType, ThunkType} from './store';
import {TasksType} from '../components/TodolistWithRedux';
//Types
type RemoveTasksTypeAC = ReturnType<typeof removeTasksAC>
type AddTasksTypeAC = ReturnType<typeof addTasksAC>
type ChangeTaskStatusTypeAC = ReturnType<typeof updateTaskAC>
type UpdateTasksTitleTypeAC = ReturnType<typeof updateTasksTitleAC>
type AddTasksForTodolistTypeAC = ReturnType<typeof addTasksForTodolistAC>
type SetTasksTypeAC = ReturnType<typeof setTasksAC>
export type TasksActionType =
    RemoveTasksTypeAC
    | AddTasksTypeAC
    | ChangeTaskStatusTypeAC
    | UpdateTasksTitleTypeAC
    | AddTasksForTodolistTypeAC
    | AddTodolistTypeAC
    | RemoveTodolistTypeAC
    | SetTodolistsTypeAC
    | SetTasksTypeAC
//Initial State
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
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolist.id]: []
            }

        case 'REMOVE-TODOLIST': {
            let copySate = {...state}
            delete copySate[action.payload.todolistId]
            return copySate

        }
        case 'SET-TODOLISTS': {
            // let copyState = {...state}
            // action.todolists.forEach(tl => {
            //     copyState[tl.id] = []
            // })
            // return copyState
            return action.todolists.reduce((acc, tl) => {
                acc[tl.id] = []
                return acc
            }, {...state})
        }

        case 'SET-TASKS': {
            //     let copyState = {...state}
            //     copyState[action.todolistId] = action.tasks
            //     return copyState
            // }
            return {
                ...state,
                [action.todolistId]: action.tasks
            }
        }
        default:
            return state
    }
};

//Actions
export const removeTasksAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistId,
            taskId
        }
    } as const
}
export const addTasksAC = (task: TaskType) => {
    return {
        type: 'ADD-TASK',
        payload: {
            task
        }
    } as const
}
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskType) => {
    return {
        type: 'UPDATE-TASK',
        payload: {
            todolistId,
            taskId,
            model
        }
    } as const
}
export const updateTasksTitleAC = (todolistId: string, taskId: string, newTitle: string) => {
    return {
        type: 'UPDATE-TASK-TITLE',
        payload: {
            todolistId,
            taskId,
            newTitle
        }
    } as const
}
export const addTasksForTodolistAC = (todolistId: string) => {
    return {
        type: 'ADD-TASKS-FOR-TODOLIST',
        todolistId

    } as const
}
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {
        type: 'SET-TASKS',
        todolistId,
        tasks

    } as const
}


//Thunks
export const fetchTasksTC = (todolistId: string): ThunkType => (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistId)
        .then(res => dispatch(setTasksAC(todolistId, res.data.items)))
}
export const deleteTasksTC = (todolistId: string, taskId: string): ThunkType => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(res => dispatch(removeTasksAC(todolistId, taskId)))
}
export const addTasksTC = (todolistId: string, title: string): ThunkType => (dispatch: Dispatch) => {
    todolistsAPI.createTask(todolistId, title)
        .then(res => dispatch(addTasksAC(res.data.data.item)))
}
//Type for updateTask
export type UpdateDomainTaskType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskType): ThunkType =>
    (dispatch: Dispatch, getState: () => AppStateType) => {
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
            .then(res => dispatch(updateTaskAC(todolistId, taskId, domainModel)))
    }