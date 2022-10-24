import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList';
import {v1} from 'uuid';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type BtnType = 'All' | 'Active' | 'Completed'

function App() {
    //BLL:
    const todoListTitle: string = 'What to learn?'
    const [tasksForTodoList, setTasksForTodoList] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML & CSS', isDone: true},
        {id: v1(), title: 'React & TS', isDone: false},
        {id: v1(), title: 'JS & ES6', isDone: false}
    ])
    const [filter, setFilter] = useState<BtnType>('All')
    const getFilterTasks = (tasks: Array<TaskType>, filterValue: BtnType) => {
        let filteredTasks = tasks
        if (filterValue === 'Active') {
            filteredTasks = tasks.filter(t => !t.isDone)
        }
        if (filterValue === 'Completed') {
            filteredTasks = tasks.filter(t => t.isDone)
        }
        return filteredTasks
    }
    const filteredTasks = getFilterTasks(tasksForTodoList, filter)
    const removeTask = (taskId: string) => {
        let deleteTask = tasksForTodoList.filter(item => item.id !== taskId)
        setTasksForTodoList(deleteTask)
    }
    const btnFilter = (btn: BtnType) => {
        setFilter(btn)
    }
    const addTask = (value: string) => {
        let newTask: TaskType = {id: v1(), title: value, isDone: false}
        setTasksForTodoList([newTask, ...tasksForTodoList])
    }


    //GUI
    return (
        <div className={'App'}>
            <TodoList title={todoListTitle}
                      tasks={filteredTasks}
                      removeTask={removeTask}
                      btnFilter={btnFilter}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;
