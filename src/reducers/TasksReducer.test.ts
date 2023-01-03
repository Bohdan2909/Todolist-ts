import {AddTasksAC, ChangeTaskStatusAC, RemoveTasksAC, tasksReducer, UpdateTasksTitleAC} from './tasksReducer';
import {TasksType} from '../App';
import {AddTodolistAC, RemoveTodolistAC, TodolistDomainType, todolistsReducer} from './todolistsReducer';
import {TaskPriorities, TaskStatuses} from '../api/todolist-api';

let startState:TasksType ={}

beforeEach(() => {
    startState =
        {
            'todolistID1': [
                {id: '1', title: 'HTML&CSS2', status: TaskStatuses.Completed, todoListId: 'todolistID1',
                    startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
                },
                {id: '2', title: 'JS2', status: TaskStatuses.Completed, todoListId: 'todolistID1',
                    startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
                },
                {id: '3', title: 'ReactJS2', status: TaskStatuses.New, todoListId: 'todolistID1',
                    startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
                {id: '4', title: 'Rest API2', status: TaskStatuses.New, todoListId: 'todolistID1',
                    startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
                {id: '5', title: 'GraphQL2', status: TaskStatuses.New, todoListId: 'todolistID1',
                    startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
            ],
            'todolistID2': [

                {id: '1', title: 'HTML&CSS2',  status: TaskStatuses.Completed, todoListId: 'todolistID2',
                    startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
                {id: '2', title: 'JS2',  status: TaskStatuses.Completed, todoListId: 'todolistID2',
                    startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
                {id: '3', title: 'ReactJS2',  status: TaskStatuses.New, todoListId: 'todolistID2',
                    startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
                {id: '4', title: 'Rest API2',  status: TaskStatuses.New, todoListId: 'todolistID2',
                    startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''}
            ]
        }
})
test('Should be tasks deleted', () => {

    const endState = tasksReducer(startState, RemoveTasksAC('todolistID2', '1'))
    expect(endState['todolistID2'].length).toBe(3)
})
test('Should be tasks added', () => {

    let newTitle = 'What new?'

    const endState = tasksReducer(startState, AddTasksAC('todolistID2', newTitle))
    expect(endState['todolistID2'].length).toBe(5)
    expect(endState['todolistID1'].length).toBe(5)
    expect(endState['todolistID2'][0].title).toBe('What new?')
    expect(endState['todolistID2'][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {


    const action = ChangeTaskStatusAC('todolistID2', '2', TaskStatuses.New)

    const endState = tasksReducer(startState, action)

    expect(endState['todolistID2'][1].status).toBe(TaskStatuses.New)
    expect(endState['todolistID1'][1].status).toBe(TaskStatuses.Completed)

})


test('should be updated new title of task', () => {


    const action = UpdateTasksTitleAC('todolistID2', '2', 'New title')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistID2'][1].title).toBe('New title')
    expect(endState['todolistID2'].length).toBe(4)
})

test('new array should be added when new todolist is added', () => {


    const action = AddTodolistAC('new todolist')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistID1' && k !== 'todolistID2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual(endState[newKey])
})

test('ids should be equals', () => {
    const startTasksState: TasksType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    const action = AddTodolistAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolists).toBe(action.todolistId)
})


test('property with todolistId should be deleted', () => {

    const action = RemoveTodolistAC('todolistID2')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    expect(keys.length).toBe(1)
    expect(endState['todolistID2']).toBeUndefined()
})



