import React from 'react';
import {Provider} from 'react-redux';
import {AppStateType} from '../state/store';
import {combineReducers, legacy_createStore} from 'redux';
import {tasksReducer} from '../state/tasksReducer';
import {todolistsReducer} from '../state/todolistsReducer';
import {v1} from 'uuid';
import {TaskPriorities, TaskStatuses} from '../api/todolist-api';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ],
    tasks: {
        'todolistId1': [
            {
                id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, todoListId: 'todolistId1',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
            },
            {
                id: v1(), title: 'JS', status: TaskStatuses.Completed, todoListId: 'todolistId1',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
            },
        ],
        'todolistId2': [
            {
                id: v1(), title: 'HTML&CSS2', status: TaskStatuses.Completed, todoListId: 'todolistId2',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
            },
            {
                id: v1(), title: 'JS2', status: TaskStatuses.Completed, todoListId: 'todolistId2',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
            },
        ]
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppStateType)
export const ReduxStoreProviderDecorator = (storyFn:()=> JSX.Element) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}