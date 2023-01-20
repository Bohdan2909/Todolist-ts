import {addTasksAC, removeTasksAC, setTasksAC, tasksReducer, updateTaskAC} from './tasksReducer';

import {
    addTodolistAC,
    removeTodolistAC,
    setTodolistsAC,
    TodolistDomainType,
    todolistsReducer
} from './todolistsReducer';
import {TaskPriorities, TaskStatuses} from '../api/todolist-api';
import {TasksType} from '../components/TodolistWithRedux';

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

    const endState = tasksReducer(startState, removeTasksAC('todolistID2', '1'))
    expect(endState['todolistID2'].length).toBe(3)
})
test('Should be tasks added', () => {

    let newTitle = 'What new?'

    const endState = tasksReducer(startState, addTasksAC({
        todoListId:'todolistID2',
        title:newTitle,
        deadline:'',
        status:TaskStatuses.New,
        description:'',
        addedDate:'',
        order:0,
        priority:0,
        startDate:'',
        id:'bla'
    }))
    expect(endState['todolistID2'].length).toBe(5)
    expect(endState['todolistID1'].length).toBe(5)
    expect(endState['todolistID2'][0].title).toBe('What new?')
    expect(endState['todolistID2'][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {


    const action = updateTaskAC('todolistID2', '2', {status:TaskStatuses.New})

    const endState = tasksReducer(startState, action)

    expect(endState['todolistID2'][1].status).toBe(TaskStatuses.New)
    expect(endState['todolistID1'][1].status).toBe(TaskStatuses.Completed)

})


test('should be updated new title of task', () => {


    const action = updateTaskAC('todolistID2', '2', {title:'New title'})

    const endState = tasksReducer(startState, action)

    expect(endState['todolistID2'][1].title).toBe('New title')
    expect(endState['todolistID2'].length).toBe(4)
})

test('new array should be added when new todolist is added', () => {


    const action = addTodolistAC({id:'todolistID3', title: 'What to learn',  addedDate: '', order: 0},)

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

    const action = addTodolistAC({id: 'any id', title: 'What to learn',  addedDate: '', order: 0})

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolist.id)
    expect(idFromTodolists).toBe(action.todolist.id)
})


test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC('todolistID2')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    expect(keys.length).toBe(1)
    expect(endState['todolistID2']).toBeUndefined()
})
test('empty arrays should be added when we set todolist', () => {

    const action = setTodolistsAC( [{id: 'todolistID1', title: 'What to learn',  addedDate: '', order: 0},
        {id: 'todolistID2', title: 'What to buy',  addedDate: '', order: 0}])

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    expect(keys.length).toBe(2)
    expect(endState['todolistID1']).toStrictEqual([])
    expect(endState['todolistID2']).toStrictEqual([])
})
test('tasks should be added for todolist', () => {

    const action = setTasksAC('todolistID1',startState['todolistID1'])

    const endState = tasksReducer({'todolistID2':[],
        'todolistID1':[]}, action)


    expect(endState['todolistID1'].length).toBe(5)
    expect(endState['todolistID2'].length).toBe(0)

})




