import {TasksType} from '../App';
type ActionType = TasksAC
export const TasksReducer = (state: TasksType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId)
            }
        }

        default:
            return state
    }
};
export type TasksAC = ReturnType<typeof tasksAC>
export const tasksAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            taskId,
            todolistId
        }
    } as const
}
