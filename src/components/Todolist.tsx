import React, {ChangeEvent} from 'react';
import {BtnType, TaskType} from '../App'
import {EditableSpan} from './EditableSpan';
import {AddItemForm} from './AddItemForm';
import {Button, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';




type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    btnFilter: (todolistId: string, btn: BtnType) => void
    addTask: (todolistId: string, value: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
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
    const updateTitleTaskHandler = (taskId: string, newTile: string) => {
        updateTaskTitle(todolistId, taskId, newTile)
    }
    const updateTitleTodolistHandler = (newTitle: string) => {
        updateTitleTodolist(todolistId, newTitle)
    }

    const clickHandlerFilterAll = () => btnFilter(todolistId, 'all')
    const clickHandlerFilterActive = () => btnFilter(todolistId, 'active')
    const clickHandlerFilterCompleted = () => btnFilter(todolistId, 'completed')

    const taskList = tasks.length
        ? tasks.map((item) => {
            const onclickRemoveHandler = () => removeTask(todolistId, item.id)
            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(todolistId, item.id, e.currentTarget.checked)
            return (
                <li key={item.id} className={item.isDone ? 'is-done' : ''}>
                    <input type="checkbox"
                           checked={item.isDone}
                           onChange={changeTaskStatusHandler}
                    />
                    {/*<span>{item.title}</span>*/}
                    <EditableSpan title={item.title}
                                  callback={(newTitle) => updateTitleTaskHandler(item.id, newTitle)}/>
                    <IconButton  style={{marginLeft: 10}}
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
                <IconButton aria-label='delete' onClick={removeTodolistHandler}>
                <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskForm}/>
            <ul>
                {taskList}
            </ul>
            <div>
                <Button variant='contained' size='small' className={filter === 'all' ? 'btn-active' : ''} onClick={clickHandlerFilterAll}>All</Button>
                <Button variant='contained' size='small'  className={filter === 'active' ? 'btn-active' : ''} onClick={clickHandlerFilterActive}>Active
                </Button>
                <Button variant='contained' size='small'  className={filter === 'completed' ? 'btn-active' : ''}
                        onClick={clickHandlerFilterCompleted}>Completed
                </Button>
            </div>
        </div>
    )

}

export default TodoList



