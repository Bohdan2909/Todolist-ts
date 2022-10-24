import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList';


export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
export type BtnType = 'All' | 'Active' | 'Completed'

function App() {
    //BLL:
    const todoListTitle: string = 'What to learn?'
    const [tasksForTodoList, setTasksForTodoList] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML & CSS', isDone: true},
        {id: 2, title: 'React & TS', isDone: false},
        {id: 3, title: 'JS & ES6', isDone: false}
    ])
    const [filter, setFilter] = useState<BtnType>('All')

    let tasks = tasksForTodoList
    if (filter === 'Active') {
        tasks = tasksForTodoList.filter(t => !t.isDone)
    }
    if (filter === 'Completed') {
        tasks = tasksForTodoList.filter(t => t.isDone)
    }
    const removeTask = (taskId: number) => {
        let deleteTask = tasksForTodoList.filter(item => item.id !== taskId)
        setTasksForTodoList(deleteTask)
    }
    const btnFilter = (btn: BtnType) => {
        setFilter(btn)
    }
    const addTask = (value: string) => {
        let newTask = {id: Math.floor(Math.random() * 100 - 1), title: value, isDone: false}
        setTasksForTodoList([newTask, ...tasksForTodoList])
    }

    //GUI
    return (
        <div className={'App'}>
            <TodoList title={todoListTitle}
                      tasks={tasks}
                      removeTask={removeTask}
                      btnFilter={btnFilter}
                      addTask={addTask}
            />


        </div>
    );
}

export default App;
