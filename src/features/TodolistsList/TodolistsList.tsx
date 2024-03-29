import {appDispatch, AppStateType} from '../../state/store';
import {useSelector} from 'react-redux';
import {addTodolistsTC, fetchTodolistsTC, TodolistDomainType} from '../../state/todolistsReducer';
import React, {useCallback, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import {AddItemForm} from '../../components/AddItemForm';
import Paper from '@mui/material/Paper';
import TodolistWithRedux from '../../components/TodolistWithRedux';
import {setAppStatusAC} from '../../state/appReducer';
import {Navigate} from 'react-router-dom';

type PropsType = {
    demo?: boolean
}
export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {
    //BLL:
    const dispatch = appDispatch()
    const todolists = useSelector<AppStateType, TodolistDomainType[]>((state) => state.todolists)
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)
//Get Todolist from Server
    useEffect(() => {
        if (demo || !isLoggedIn) return
        dispatch(fetchTodolistsTC())
    }, [])
//Callback
    const addTodolist = useCallback((newTitle: string) => {
        // let newTodolistId = v1()
        // const newTodolist: TodolistType = {id: v1(), title: newTitle, filter: 'all'}
        // setTodolist([newTodolist, ...todolist])
        // setTasks({
        //     ...tasks,
        //     [newTodolistId]: []
        // })
        let action = addTodolistsTC(newTitle)
        dispatch(action)
    }, [dispatch])
    // const removeTask = (todolistId: string, taskId: string) => {
    //     // let deleteTask = tasksForTodoList.filter(item => item.id !== taskId)
    //     // setTasksForTodoList(deleteTask)
    //     // setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)})
    //     dispatch(RemoveTasksAC(todolistId, taskId))
    // }
    //
    // const addTask = (todolistId: string, value: string) => {
    //     // let newTask: TaskType = {id: v1(), title: value, isDone: false}
    //     // setTasksForTodoList([newTask, ...tasksForTodoList])
    //     // setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    //     dispatch(AddTasksAC(todolistId, value))
    // }
    // const updateTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
    //     // setTasks({
    //     //     ...tasks,
    //     //     [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title: newTitle} : task)
    //     // })
    //     dispatch(UpdateTasksTitleAC(todolistId, taskId, newTitle))
    // }
    // const changeTaskStatus = (todolistId: string, taskId: string, status: TaskStatuses) => {
    //     // setTasksForTodoList(tasksForTodoList.map(t => t.id === taskId ? {...t, isDone: isDone} : t))
    //     // setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone: isDone} : el)})
    //     dispatch(ChangeTaskStatusAC(todolistId, taskId, status))
    // }
    // const removeTodolist = (todolistId: string) => {
    //     // setTodolist(todolist.filter(el => el.id !== todolistId))
    //     // setTasks({...tasks})
    //     // delete tasks[todolistId]
    //     dispatch(RemoveTodolistAC(todolistId))
    //     // dispatchTasks(RemoveTodolistAC(todolistId))
    // }
    // const btnFilter = (todolistId: string, btn: BtnType) => {
    //     // setTodolist(todolist.map(el => el.id === todolistId ? {...el, filter: btn} : el))
    //     dispatch(BtnFilterAC(todolistId, btn))
    // }
    //
    // const updateTitleTodolist = (todolistId: string, newTitle: string) => {
    //     // setTodolist(todolist.map(t => t.id === todolistId ? {...t, title: newTitle} : t))
    //     dispatch(UpdateTitleTodolistAC(todolistId, newTitle))
    // }


    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    return (
        <>
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
                                    <TodolistWithRedux todolist={el} demo={demo}/>
                                </Paper>
                            </Grid>
                        )
                    })}
            </Grid>
        </>
    )
}