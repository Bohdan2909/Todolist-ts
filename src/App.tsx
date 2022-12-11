import React, {useReducer} from 'react';
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
import {
    AddTasksAC,
    ChangeTaskStatusAC,
    RemoveTasksAC,
    tasksReducer,
    UpdateTasksTitleAC
} from './reducers/tasksReducer';
import {
    AddTodolistAC,
    BtnFilterAC,
    RemoveTodolistAC,
    todolistsReducer,
    UpdateTitleTodolistAC
} from './reducers/todolistsReducer';


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
    [key: string]: TaskType[]
}

function App() {
    //BLL:
    let todolistID1 = v1()
    let todolistID2 = v1()
    const [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ])
    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
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
        ],
    })
    const removeTask = (todolistId: string, taskId: string) => {
        // let deleteTask = tasksForTodoList.filter(item => item.id !== taskId)
        // setTasksForTodoList(deleteTask)
        // setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)})
        dispatchTasks(RemoveTasksAC(todolistId, taskId))
    }

    const addTask = (todolistId: string, value: string) => {
        // let newTask: TaskType = {id: v1(), title: value, isDone: false}
        // setTasksForTodoList([newTask, ...tasksForTodoList])
        // setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
        dispatchTasks(AddTasksAC(todolistId, value))
    }
    const updateTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        // setTasks({
        //     ...tasks,
        //     [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title: newTitle} : task)
        // })
        dispatchTasks(UpdateTasksTitleAC(todolistId, taskId, newTitle))
    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        // setTasksForTodoList(tasksForTodoList.map(t => t.id === taskId ? {...t, isDone: isDone} : t))
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone: isDone} : el)})
        dispatchTasks(ChangeTaskStatusAC(todolistId, taskId, isDone))
    }

    const addTodolist = (newTitle: string) => {
        // let newTodolistId = v1()
        // const newTodolist: TodolistType = {id: v1(), title: newTitle, filter: 'all'}
        // setTodolist([newTodolist, ...todolist])
        // setTasks({
        //     ...tasks,
        //     [newTodolistId]: []
        // })
        let action = AddTodolistAC(newTitle)
        dispatchTodolists(action)
        dispatchTasks(action)

        // dispatchTasks(AddTasksForTodolistAC(newTodolist.id))
    }
    const removeTodolist = (todolistId: string) => {
        // setTodolist(todolist.filter(el => el.id !== todolistId))
        // setTasks({...tasks})
        // delete tasks[todolistId]
        dispatchTodolists(RemoveTodolistAC(todolistId))
        dispatchTasks(RemoveTodolistAC(todolistId))
    }
    const btnFilter = (todolistId: string, btn: BtnType) => {
        // setTodolist(todolist.map(el => el.id === todolistId ? {...el, filter: btn} : el))
        dispatchTodolists(BtnFilterAC(todolistId, btn))
    }

    const updateTitleTodolist = (todolistId: string, newTitle: string) => {
        // setTodolist(todolist.map(t => t.id === todolistId ? {...t, title: newTitle} : t))
        dispatchTodolists(UpdateTitleTodolistAC(todolistId, newTitle))
    }
    console.log(tasks)
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

                <Grid container spacing={5}>

                    {
                        todolists.map(el => {
                            let filteredTask = tasks[el.id]
                            if (el.filter === 'active') {
                                filteredTask = tasks[el.id].filter(t => !t.isDone)
                            }
                            if (el.filter === 'completed') {
                                filteredTask = tasks[el.id].filter(t => t.isDone)
                            }

                            return (

                                <Grid key={el.id} item>
                                    <Paper elevation={3} style={{padding: '50px'}}>
                                        <TodoList
                                            todolistId={el.id}
                                            title={el.title}
                                            tasks={filteredTask}
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
