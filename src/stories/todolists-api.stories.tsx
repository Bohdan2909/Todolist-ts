import React, {useEffect, useState} from 'react'
import {todolistsAPI} from '../api/todolist-api';

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolist()
            .then((res) => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTodolist('newTodolist')
            .then((res) => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '32cc9d98-fb16-4e05-a429-a9e70b25ba04'
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'e65dfe65-edb3-431d-a1d5-bd3b5aa329eb'

        todolistsAPI.updateTodolist(todolistId, 'React...')
            .then((res) => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>('')

    const getTask = () => {
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)} placeholder={'todolistId'}
                   type="text"/>
            <button onClick={getTask}>get task</button>
        </div>
    </div>
}
export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>('')
    const [taskId, setTaskId] = useState<any>('')

    const deleteTask = () => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)} placeholder={'todolistId'}
                   type="text"/>
            <input value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)} placeholder={'taskIdId'}
                   type="text"/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>('')
    const [title, setTitle] = useState<any>('')

    const createTask = () => {
        todolistsAPI.createTask(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)} placeholder={'todolistId'}
                   type="text"/>
            <input value={title} onChange={(e) => setTitle(e.currentTarget.value)} placeholder={'title'}
                   type="text"/>
            <button onClick={createTask}>create task</button>
        </div>
    </div>
}
export const UpdateTask = () => {
    const [state, setState] = useState({})
    const [title, setTitle] = useState('title 1')
    const [todolistId, setTodolistId] = useState<any>('')
    const [taskId, setTaskId] = useState('')
    const [description, setDescription] = useState('description 1')
    const [completed, setCompleted] = useState(false)
    const [status, setStatus] = useState(0)
    const [priority, setPriority] = useState(0)
    const [startDate, setStartDate] = useState('')
    const [deadline, setDeadline] = useState('')

    const updateTask = () => {
        todolistsAPI.updateTask(todolistId, title, {
            deadline: deadline,
            startDate: startDate,
            description: description,
            // completed: completed,
            priority: priority,
            status: status,
            title: title
        })
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)} placeholder={'todolistId'}
                   type="text"/>
            <input value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)} placeholder={'taskId'}
                   type="text"/>
            <input value={title} onChange={(e) => setTitle(e.currentTarget.value)} placeholder={'title'}
                   type="text"/>
            <input value={description} onChange={(e) => setDescription(e.currentTarget.value)}
                   placeholder={'description'}
                   type="text"/>
            <input checked={completed} onChange={(e) => setCompleted(e.currentTarget.checked)} placeholder={'completed'}
                   type="text"/>
            <input value={status} onChange={(e) => setStatus(+e.currentTarget.value)} placeholder={'status'}
                   type="text"/>
            <input value={priority} onChange={(e) => setPriority(+e.currentTarget.value)} placeholder={'priority'}
                   type="text"/>
            <input value={startDate} onChange={(e) => setStartDate(e.currentTarget.value)} placeholder={'startDate'}
                   type="text"/>
            <input value={deadline} onChange={(e) => setDeadline(e.currentTarget.value)} placeholder={'deadline'}
                   type="text"/>

            <button onClick={updateTask}>update task</button>
        </div>
    </div>
}