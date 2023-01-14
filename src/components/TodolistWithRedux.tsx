import React, {memo, useCallback, useEffect} from 'react';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import {AddItemForm} from './AddItemForm';
import Button from '@mui/material/Button';
import {useSelector} from 'react-redux';
import {appDispatch, AppStateType} from '../state/store';
import {addTasksTC, deleteTasksTC, fetchTasksTC, updateTaskTC} from '../state/tasksReducer';
import {
    btnFilterAC,
    BtnType,
    changeTodolistsTC,
    deleteTodolistsTC,
    TodolistDomainType,
} from '../state/todolistsReducer';
import {TaskStatuses, TaskType} from '../api/todolist-api';
import {Task} from './Task';

//Types
type TodolistWithReduxType = {
    todolist: TodolistDomainType
}
export type TasksType = {
    [key: string]: TaskType[]
}
//UI
const TodolistWithRedux = memo((props: TodolistWithReduxType) => {
    const dispatch = appDispatch()
    const {id, title, filter} = props.todolist

    let tasks = useSelector<AppStateType, TaskType[]>(state => state.tasks[id])

    useEffect(() => {
        dispatch(fetchTasksTC(id))
    }, [])

//Filter tasks
    if (filter === 'active') {
        tasks = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (filter === 'completed') {
        tasks = tasks.filter(t => t.status === TaskStatuses.Completed)
    }
//Callbacks
    const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(todolistId, taskId, {status}))
    }, [])
    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(deleteTasksTC(todolistId, taskId))

    }, [])
    const updateTitleTaskHandler = useCallback((taskId: string, newTitle: string) => {
        dispatch(updateTaskTC(id, taskId, {title: newTitle}))
    }, [])
    const updateTitleTodolistHandler = useCallback((newTitle: string) => dispatch(changeTodolistsTC(id, newTitle)), [])

    const removeTodolistHandler = useCallback(() => dispatch(deleteTodolistsTC(id)), [])

    const addTask = useCallback((title: string) => {
        dispatch(addTasksTC(id, title))
    }, [])

    const clickHandlerFilterAll = useCallback((btn: BtnType) => dispatch(btnFilterAC(id, btn)), [])

    const clickHandlerFilterCompleted = useCallback(() => dispatch(btnFilterAC(id, 'completed')), [])

    const clickHandlerFilterActive = useCallback(() => dispatch(btnFilterAC(id, 'active')), [])
//Render Tasks
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
    //Render Todolist
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



