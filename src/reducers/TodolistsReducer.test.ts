import {v1} from 'uuid';
import {AddTodolistAC, TodolistDomainType, todolistsReducer, UpdateTitleTodolistAC} from './todolistsReducer';

let todolistId1 = v1()
let todolistId2 = v1()
let startState: Array<TodolistDomainType> = [
    {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
]
beforeEach(()=>{
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ]
})
test('correct todolist should be added', () => {

    let newTitle = 'New Todolist'
    const endState = todolistsReducer(startState, AddTodolistAC(newTitle))

    expect(endState.length).toBe(3)
    // expect(endState[2].title).toBe(newTitle)
    expect(endState[2].filter).toBe('all')
})
test('correct todolist title', () => {
    let newTitle = 'New Todolist'
    const endState = todolistsReducer(startState, UpdateTitleTodolistAC(todolistId2, newTitle))
    expect(endState[1].title).toBe(newTitle)
    expect(endState[0].filter).toBe('all')
})