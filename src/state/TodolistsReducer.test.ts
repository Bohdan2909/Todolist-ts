import {v1} from 'uuid';
import {
    addTodolistAC, changeTodolistEntityStatusAC,
    setTodolistsAC,
    TodolistDomainType,
    todolistsReducer,
    updateTitleTodolistAC
} from './todolistsReducer';
import {RequestStatusType} from './appReducer';

let todolistId1 = v1()
let todolistId2 = v1()
let startState: Array<TodolistDomainType> = [
    {id: todolistId1, title: 'What to learn', filter: 'all', entityStatus:'idle', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', entityStatus:'idle', addedDate: '', order: 0}
]
beforeEach(()=>{
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', entityStatus:'idle', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', entityStatus:'idle', addedDate: '', order: 0}
    ]
})
test('correct todolist should be added', () => {

    let newTitle = 'New Todolist'
    const endState = todolistsReducer(startState, addTodolistAC( {id: todolistId2, title: newTitle, addedDate: '', order: 0}))

    expect(endState.length).toBe(3)
    // expect(endState[2].title).toBe(newTitle)
    // expect(endState[2].filter).toBe('all')
})
test('correct todolist title', () => {
    let newTitle = 'New Todolist'
    const endState = todolistsReducer(startState, updateTitleTodolistAC(todolistId2, newTitle))
    expect(endState[1].title).toBe(newTitle)
    expect(endState[0].filter).toBe('all')
})
test('correct todolist entity status', () => {
    let status: RequestStatusType = 'loading'
    const endState = todolistsReducer(startState, changeTodolistEntityStatusAC(todolistId2, status))
    expect(endState[1].entityStatus).toBe(status)
    expect(endState[0].entityStatus).toBe('idle')

})
test('todolist should be set to the state ', () => {

    const endState = todolistsReducer([], setTodolistsAC(startState))
    expect(endState.length).toBe(2)

})