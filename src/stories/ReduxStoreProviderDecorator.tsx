import React from 'react';
import {Provider} from 'react-redux';
import {AppStateType} from '../state/store';
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {tasksReducer} from '../state/tasksReducer';
import {todolistsReducer} from '../state/todolistsReducer';
import {v1} from 'uuid';
import {TaskPriorities, TaskStatuses} from '../api/todolist-api';
import {appReducer} from '../state/appReducer';
import thunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app:appReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0}
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
    },
    app:{
        status: 'idle',
        error: null
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppStateType,applyMiddleware(thunkMiddleware))
export const ReduxStoreProviderDecorator = (storyFn:()=> JSX.Element) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}