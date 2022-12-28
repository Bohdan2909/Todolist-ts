import React, {useCallback} from 'react';
import './App.css';
// import TodoList from './components/Todolist';
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
    UpdateTasksTitleAC
} from './reducers/tasksReducer';
import {
    AddTodolistAC,
    BtnFilterAC,
    RemoveTodolistAC,
    UpdateTitleTodolistAC
} from './reducers/todolistsReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from './store';
import TodolistWithRedux from './components/TodolistWithRedux';


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


function AppWithRedux() {
    //BLL:
    console.log('App')

    const dispatch = useDispatch()
    const todolists = useSelector<AppStateType, TodolistType[]>((state) => state.todolists)


    const removeTask = (todolistId: string, taskId: string) => {
        // let deleteTask = tasksForTodoList.filter(item => item.id !== taskId)
        // setTasksForTodoList(deleteTask)
        // setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)})
        dispatch(RemoveTasksAC(todolistId, taskId))
    }

    const addTask = (todolistId: string, value: string) => {
        // let newTask: TaskType = {id: v1(), title: value, isDone: false}
        // setTasksForTodoList([newTask, ...tasksForTodoList])
        // setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
        dispatch(AddTasksAC(todolistId, value))
    }
    const updateTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        // setTasks({
        //     ...tasks,
        //     [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title: newTitle} : task)
        // })
        dispatch(UpdateTasksTitleAC(todolistId, taskId, newTitle))
    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        // setTasksForTodoList(tasksForTodoList.map(t => t.id === taskId ? {...t, isDone: isDone} : t))
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone: isDone} : el)})
        dispatch(ChangeTaskStatusAC(todolistId, taskId, isDone))
    }

    const addTodolist = useCallback((newTitle: string) => {
        // let newTodolistId = v1()
        // const newTodolist: TodolistType = {id: v1(), title: newTitle, filter: 'all'}
        // setTodolist([newTodolist, ...todolist])
        // setTasks({
        //     ...tasks,
        //     [newTodolistId]: []
        // })
        let action = AddTodolistAC(newTitle)
        dispatch(action)
        // dispatchTasks(action)

        // dispatchTasks(AddTasksForTodolistAC(newTodolist.id))
    },[dispatch])
    const removeTodolist = (todolistId: string) => {
        // setTodolist(todolist.filter(el => el.id !== todolistId))
        // setTasks({...tasks})
        // delete tasks[todolistId]
        dispatch(RemoveTodolistAC(todolistId))
        // dispatchTasks(RemoveTodolistAC(todolistId))
    }
    const btnFilter = (todolistId: string, btn: BtnType) => {
        // setTodolist(todolist.map(el => el.id === todolistId ? {...el, filter: btn} : el))
        dispatch(BtnFilterAC(todolistId, btn))
    }

    const updateTitleTodolist = (todolistId: string, newTitle: string) => {
        // setTodolist(todolist.map(t => t.id === todolistId ? {...t, title: newTitle} : t))
        dispatch(UpdateTitleTodolistAC(todolistId, newTitle))
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

                <Grid container spacing={5}>
                    {
                        todolists.map(el => {
                            // let filteredTask = tasks[el.id]
                            // if (el.filter === 'active') {
                            //     filteredTask = tasks[el.id].filter(t => !t.isDone)
                            // }
                            // if (el.filter === 'completed') {
                            //     filteredTask = tasks[el.id].filter(t => t.isDone)
                            // }
                            return (

                                <Grid key={el.id} item>
                                    <Paper elevation={3} style={{padding: '50px'}}>
                                        <TodolistWithRedux todolist={el}/>
                                    </Paper>
                                </Grid>
                            )
                        })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
