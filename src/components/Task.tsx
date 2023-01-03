import React, {ChangeEvent, memo} from 'react';
import {TaskStatuses, TaskType} from '../api/todolist-api';
import Checkbox from '@mui/material/Checkbox';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';

type TaskPropsType = {
    task: TaskType
    todolistId: string
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
    updateTitleTaskHandler: (taskId: string, newTitle: string) => void
}
export const Task = memo((props: TaskPropsType) => {
    const onclickRemoveHandler = () => props.removeTask(props.todolistId, props.task.id)

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.todolistId, props.task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
    return (
        <li className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
            <Checkbox
                checked={props.task.status === TaskStatuses.Completed}
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