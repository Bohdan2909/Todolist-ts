import React, {ChangeEvent, useState} from 'react';
import {BtnType, TaskType} from './App'


type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    btnFilter: (btn: BtnType) => void
    addTask: (value: string) => void
}


const TodoList = (props: TodoListPropsType) => {
    const [value, setValue] = useState('')
    const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const clickHandlerInput = () => {
        props.addTask(value)
        setValue('')
    }
    const taskList = props.tasks.length

        ? props.tasks.map((item) => {
            return (
                <li key={item.id} style={{listStyle: 'none'}}>
                    <input type="checkbox"
                           checked={item.isDone}/>
                    <span>{item.title}</span>
                    <button style={{marginLeft: 10}}
                            onClick={() => props.removeTask(item.id)}>x
                    </button>
                </li>
            )
        })
        : <span>Your list is empty</span>


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={value} onChange={changeValue}/>
                <button onClick={clickHandlerInput}>+</button>
            </div>
            <ul>
                {taskList}
            </ul>
            <div>
                <button onClick={() => props.btnFilter('All')}>All</button>
                <button onClick={() => props.btnFilter('Active')}>Active</button>
                <button onClick={() => props.btnFilter('Completed')}>Completed</button>
            </div>
        </div>
    )

}
export default TodoList

