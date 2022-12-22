import React, {ChangeEvent, memo, useCallback} from 'react';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import {AddItemForm} from './AddItemForm';
import Button from '@mui/material/Button';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../store';
import {BtnType, TaskType, TodolistType} from '../AppWithRedux';
import Checkbox from '@mui/material/Checkbox';
import {AddTasksAC, ChangeTaskStatusAC, RemoveTasksAC, UpdateTasksTitleAC} from '../reducers/tasksReducer';
import {BtnFilterAC, RemoveTodolistAC, UpdateTitleTodolistAC} from '../reducers/todolistsReducer';
// import CheckBox from './CheckBox';

type TodolistWithReduxType = {
    todolist: TodolistType
}
const TodolistWithRedux = memo((props: TodolistWithReduxType) => {
    console.log('TodolistWithRedux')
    const {id, title, filter} = props.todolist
    let tasks = useSelector<AppStateType, TaskType[]>(state => state.tasks[id])

    if (filter === 'active') {
        tasks = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasks = tasks.filter(t => t.isDone)
    }
    const dispatch = useDispatch()
    const changeTaskStatus = useCallback((todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(ChangeTaskStatusAC(todolistId, taskId, isDone))
    }, [dispatch])
    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(RemoveTasksAC(todolistId, taskId))
    }, [dispatch])
    const updateTitleTaskHandler = useCallback((taskId: string, newTitle: string) => {
        dispatch(UpdateTasksTitleAC(id, taskId, newTitle))
    }, [dispatch, id])
    const updateTitleTodolistHandler = useCallback((newTitle: string) => dispatch(UpdateTitleTodolistAC(id, newTitle)), [dispatch])

    const removeTodolistHandler = useCallback(() => dispatch(RemoveTodolistAC(id)), [dispatch, id])

    const addTask = useCallback((value: string) => {
        dispatch(AddTasksAC(id, value))
    }, [dispatch, id])

    const clickHandlerFilterAll = useCallback((btn: BtnType) => dispatch(BtnFilterAC(id, 'all')), [dispatch, id])

    const clickHandlerFilterCompleted = useCallback(() => dispatch(BtnFilterAC(id, 'completed')), [dispatch, id])

    const clickHandlerFilterActive = useCallback(() => dispatch(BtnFilterAC(id, 'active')), [dispatch, id])

    const taskList = tasks.length
        ? tasks.map((item) => {
            return <Task
                key={item.id}
                task={item}
                todolistId={id}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                updateTitleTaskHandler={updateTitleTaskHandler}/>

            // const onclickRemoveHandler = () => removeTask(id, item.id)
            //
            // const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(id, item.id, e.currentTarget.checked)
            // return (
            //     <li key={item.id} className={item.isDone ? 'is-done' : ''}>
            //         <Checkbox
            //             checked={item.isDone}
            //             onChange={changeTaskStatusHandler}
            //         />
            //         {/*<CheckBox callback={(check) => changeTaskStatusHandler(item.id, check)} isDone={item.isDone}/>*/}
            //
            //         <EditableSpan title={item.title}
            //                       callback={(newTitle) => updateTitleTaskHandler(item.id, newTitle)}/>
            //         <IconButton style={{marginLeft: 10}}
            //                     onClick={onclickRemoveHandler}>
            //             <Delete/>
            //         </IconButton>
            //     </li>
            // )


        })
        : <span>Your list is empty</span>
    return (
        <div>
            <h3>
                <EditableSpan title={title} callback={(newTitle: string) => updateTitleTodolistHandler(newTitle)}/>
                <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {taskList}
            </ul>
            <div>
                <Button variant={filter === 'all' ? 'contained' : 'outlined'}
                        size="small"
                        className={filter === 'all' ? 'btn-active' : ''}
                        onClick={() => clickHandlerFilterAll('all')}
                        color="success"
                >
                    All
                </Button>
                <Button variant={filter === 'active' ? 'contained' : 'outlined'}
                        size="small"
                        className={filter === 'active' ? 'btn-active' : ''}
                        onClick={clickHandlerFilterActive}
                        color="primary"
                >

                    Active
                </Button>
                <Button variant={filter === 'completed' ? 'contained' : 'outlined'}
                        size="small"
                        className={filter === 'completed' ? 'btn-active' : ''}
                        onClick={clickHandlerFilterCompleted}
                        color="secondary"
                >
                    Completed
                </Button>
            </div>
        </div>
    );
});

export default TodolistWithRedux;



type TaskPropsType = {
    task: TaskType
    todolistId: string
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    updateTitleTaskHandler: (taskId: string, newTitle: string) => void
}
export const Task = memo((props: TaskPropsType) => {
    const onclickRemoveHandler = () => props.removeTask(props.todolistId, props.task.id)

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.todolistId, props.task.id, e.currentTarget.checked)
    return (
        <li className={props.task.isDone ? 'is-done' : ''}>
            <Checkbox
                checked={props.task.isDone}
                onChange={changeTaskStatusHandler}
            />
            {/*<CheckBox callback={(check) => changeTaskStatusHandler(item.id, check)} isDone={item.isDone}/>*/}

            <EditableSpan title={props.task.title}
                          callback={(newTitle) => props.updateTitleTaskHandler(props.task.id, newTitle)}/>
            <IconButton style={{marginLeft: 10}}
                        onClick={onclickRemoveHandler}>
                <Delete/>
            </IconButton>
        </li>
    )
})