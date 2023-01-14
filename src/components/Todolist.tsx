import React from 'react';
import {EditableSpan} from './EditableSpan';
import {AddItemForm} from './AddItemForm';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import CheckBox from './CheckBox';
import {TaskStatuses, TaskType} from '../api/todolist-api';
import {BtnType} from '../state/todolistsReducer';
// import Checkbox from '@mui/material/Checkbox';


type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    btnFilter: (todolistId: string, btn: BtnType) => void
    addTask: (todolistId: string, value: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
    filter: BtnType
    todolistId: string
    removeTodolist: (todolistId: string) => void
    updateTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    updateTitleTodolist: (todolistId: string, newTitle: string) => void
}

function TodoList(props: TodoListPropsType) {
    const {
        title,
        tasks,
        removeTask,
        btnFilter,
        addTask,
        changeTaskStatus,
        filter,
        todolistId,
        removeTodolist,
        updateTaskTitle,
        updateTitleTodolist
    } = props

    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }
    const addTaskForm = (value: string) => {
        addTask(todolistId, value)
    }
    const updateTitleTaskHandler = (taskId: string, newTitle: string) => {
        updateTaskTitle(todolistId, taskId, newTitle)
    }
    const updateTitleTodolistHandler = (newTitle: string) => {
        updateTitleTodolist(todolistId, newTitle)
    }

    const clickHandlerFilterAll = () => btnFilter(todolistId, 'all')
    const clickHandlerFilterActive = () => btnFilter(todolistId, 'active')
    const clickHandlerFilterCompleted = () => btnFilter(todolistId, 'completed')
    const changeTaskStatusHandler = (id: string, status: TaskStatuses) => changeTaskStatus(todolistId, id, status)

    const taskList = tasks.length
        ? tasks.map((item) => {
            const onclickRemoveHandler = () => removeTask(todolistId, item.id)

            // const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(todolistId, item.id, e.currentTarget.checked)
            return (
                <li key={item.id} className={item.status === TaskStatuses.Completed ? 'is-done' : ''}>
                    {/*<Checkbox*/}
                    {/*    checked={item.isDone}*/}
                    {/*    onChange={changeTaskStatusHandler}*/}
                    {/*/>*/}
                    <CheckBox callback={(check) => changeTaskStatusHandler(item.id, check)} status={item.status}/>

                    <EditableSpan title={item.title}
                                  callback={(newTitle) => updateTitleTaskHandler(item.id, newTitle)}/>
                    <IconButton style={{marginLeft: 10}}
                                onClick={onclickRemoveHandler}>
                        <Delete/>
                    </IconButton>
                </li>
            )
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
            <AddItemForm addItem={addTaskForm}/>
            <ul>
                {taskList}
            </ul>
            <div>
                <Button variant={filter === 'all' ? 'contained' : 'outlined'}
                        size="small"
                        className={filter === 'all' ? 'btn-active' : ''}
                        onClick={clickHandlerFilterAll}
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
    )

}

export default TodoList



