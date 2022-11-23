import React, {useReducer, useState} from 'react';
import './App.css';
import TodoList from './components/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {tasksAC, TasksReducer} from './reducers/TasksReducer';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type BtnType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: BtnType
}
export type TasksType = {
    [key:string]:TaskType[]
}

function App() {
    //BLL:
    let todolistID1 = v1()
    let todolistID2 = v1()
    const [todolist, setTodolist] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ])

    // const [tasks, setTasks] = useState<TasksType>({
    //     [todolistID1]: [
    //         {id: v1(), title: 'HTML&CSS', isDone: true},
    //         {id: v1(), title: 'JS', isDone: true},
    //         {id: v1(), title: 'ReactJS', isDone: false},
    //         {id: v1(), title: 'Rest API', isDone: false},
    //         {id: v1(), title: 'GraphQL', isDone: false},
    //     ],
    //     [todolistID2]: [
    //         {id: v1(), title: 'HTML&CSS2', isDone: true},
    //         {id: v1(), title: 'JS2', isDone: true},
    //         {id: v1(), title: 'ReactJS2', isDone: false},
    //         {id: v1(), title: 'Rest API2', isDone: false},
    //         {id: v1(), title: 'GraphQL2', isDone: false},
    //     ]
    // });
    // const todoListTitle: string = 'What to learn?'
    // const [tasksForTodoList, setTasksForTodoList] = useState<Array<TaskType>>([
    //     {id: v1(), title: 'HTML & CSS', isDone: false},
    //     {id: v1(), title: 'React & TS', isDone: false},
    //     {id: v1(), title: 'JS & ES6', isDone: false}
    // ])
    // const [filter, setFilter] = useState<BtnType>('All')

    // const getFilterTasks = (tasks: Array<TaskType>, filterValue: BtnType) => {
    //     let filteredTasks = tasks
    //     if (filterValue === 'Active') {
    //         filteredTasks = tasks.filter(t => !t.isDone)
    //     }
    //     if (filterValue === 'Completed') {
    //         filteredTasks = tasks.filter(t => t.isDone)
    //     }
    //     return filteredTasks
    // }
    // const filteredTasks = getFilterTasks(tasksForTodoList, filter)
    const [tasks, dispatchTasks] = useReducer(TasksReducer,{
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
        ]
    })
    const removeTask = (todolistId: string, taskId: string) => {
        // let deleteTask = tasksForTodoList.filter(item => item.id !== taskId)
        // setTasksForTodoList(deleteTask)
        // setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)})
        dispatchTasks(tasksAC(todolistId, taskId))
    }
    const removeTodolist = (todolistId: string) => {
        // setTodolist(todolist.filter(el => el.id !== todolistId))
        // delete tasks[todolistId]
        // setTasks({...tasks})
    }
    const btnFilter = (todolistId: string, btn: BtnType) => {
        // setTodolist(todolist.map(el => el.id === todolistId ? {...el, filter: btn} : el))
    }
// todo: addTask function
    const addTask = (todolistId: string, value: string) => {
        // let newTask: TaskType = {id: v1(), title: value, isDone: false}
        // setTasksForTodoList([newTask, ...tasksForTodoList])
        // setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        // setTasksForTodoList(tasksForTodoList.map(t => t.id === taskId ? {...t, isDone: isDone} : t))
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone: isDone} : el)})
    }

    const addTodolist = (value: string) => {
        // let newTodolistId = v1()
        // let newTodolist: TodolistType = {id: newTodolistId, title: value, filter: 'all'}
        // setTodolist([newTodolist, ...todolist])
        // setTasks({
        //     ...tasks,
        //     [newTodolistId]: []
        // })
    }
    const updateTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        // setTasks({
        //     ...tasks,
        //     [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title: newTitle} : task)
        // })
    }
    const updateTitleTodolist = (todolistId: string, newTitle: string) => {
        // setTodolist(todolist.map(todo => todo.id === todolistId ? {...todo, title: newTitle} : todo))
    }
    //GUI
    return (
        <div className={'App'}>

            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        Todolists
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>

                <Grid container spacing={3}>
                    {todolist.map(el => {
                        let filteredTasks = tasks[el.id]
                        if (el.filter === 'active') {
                            filteredTasks = tasks[el.id].filter(t => !t.isDone)
                        }
                        if (el.filter === 'completed') {
                            filteredTasks = tasks[el.id].filter(t => t.isDone)
                        }
                        return (

                            <Grid item>
                                <Paper style={{padding: '50px'}}>
                                    <TodoList
                                        key={el.id}
                                        todolistId={el.id}
                                        title={el.title}
                                        tasks={filteredTasks}
                                        removeTask={removeTask}
                                        btnFilter={btnFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={el.filter}
                                        removeTodolist={removeTodolist}
                                        updateTaskTitle={updateTaskTitle}
                                        updateTitleTodolist={updateTitleTodolist}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
