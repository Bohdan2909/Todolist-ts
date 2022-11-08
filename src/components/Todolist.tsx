import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import {BtnType, TaskType} from '../App'


type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    btnFilter: (todolistId: string, btn: BtnType) => void
    addTask: (todolistId: string, value: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: BtnType
    todolistId: string
    removeTodolist:(todolistId:string) => void
}

function TodoList(props: TodoListPropsType) {
    const {title, tasks, removeTask, btnFilter, addTask, changeTaskStatus, filter, todolistId,removeTodolist} = props
    const [value, setValue] = useState('')
    const [error, setError] = useState(false)

    const changeValue = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value)
        setError(false)
    }
    const clickHandlerAddTask = () => {
        const trimValue = value.trim()
        if (trimValue) {
            addTask(todolistId, trimValue)
        } else {
            setError(true)
        }
        setValue('')

    }
    const removeTodolistHandler = () =>{
        removeTodolist(props.todolistId)
    }

    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && clickHandlerAddTask()
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
                    <span>{item.title}</span>
                    <button style={{marginLeft: 10}}
                            onClick={onclickRemoveHandler}>x
                    </button>
                </li>
            )
        })
        : <span>Your list is empty</span>


    return (
        <div>
            <h3>{title}
                <button onClick={removeTodolistHandler}>x</button>
            </h3>

            <div>
                <input value={value}
                       onChange={changeValue}
                       onKeyDown={onKeyDownAddTask}
                       className={error ? 'error' : ''}
                />
                <button onClick={clickHandlerAddTask}>+</button>
                {error && <div className="error-message">Failed is required</div>}
            </div>
            <ul>
                {taskList}
            </ul>
            <div>
                <button className={filter === 'all' ? 'btn-active' : ''} onClick={clickHandlerFilterAll}>All</button>
                <button className={filter === 'active' ? 'btn-active' : ''} onClick={clickHandlerFilterActive}>Active
                </button>
                <button className={filter === 'completed' ? 'btn-active' : ''}
                        onClick={clickHandlerFilterCompleted}>Completed
                </button>
            </div>
        </div>
    )

}

export default TodoList

