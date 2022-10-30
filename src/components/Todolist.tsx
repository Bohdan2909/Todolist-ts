import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import {BtnType, TaskType} from '../App'

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    btnFilter: (btn: BtnType) => void
    addTask: (value: string) => void
}

function TodoList  (props: TodoListPropsType)  {

    const [value, setValue] = useState('')

    const changeValue = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value)
    }
    const clickHandlerAddTask = () => {
        const trimValue = value.trim()
        if (trimValue) {
            props.addTask(trimValue)
        }
        setValue('')
    }
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && clickHandlerAddTask()
    const clickHandlerFilterAll = () => props.btnFilter('All')
    const clickHandlerFilterActive = () => props.btnFilter('Active')
    const clickHandlerFilterCompleted = () => props.btnFilter('Completed')

    const taskList = props.tasks.length
        ? props.tasks.map((item) => {
            const removeTask = () => props.removeTask(item.id)
            return (
                <li key={item.id} style={{listStyle: 'none'}}>
                    <input type="checkbox"
                           checked={item.isDone}/>
                    <span>{item.title}</span>
                    <button style={{marginLeft: 10}}
                            onClick={removeTask}>x
                    </button>
                </li>
            )
        })
        : <span>Your list is empty</span>


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={value}
                       onChange={changeValue}
                       onKeyDown={onKeyDownAddTask}/>
                <button onClick={clickHandlerAddTask}>+</button>
            </div>
            <ul>
                {taskList}
            </ul>
            <div>
                <button onClick={clickHandlerFilterAll}>All</button>
                <button onClick={clickHandlerFilterActive}>Active</button>
                <button onClick={clickHandlerFilterCompleted}>Completed</button>
            </div>
        </div>
    )

}
export default TodoList

