import React, {ChangeEvent} from 'react';
import {TaskStatuses} from '../api/todolist-api';

type CheckBoxType = {
    callback: (status: TaskStatuses) => void
    status: TaskStatuses
}

const CheckBox = (props: CheckBoxType) => {
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newStatus = e.currentTarget.checked
        props.callback(newStatus ? TaskStatuses.Completed : TaskStatuses.New)
    }
    return (

        <input type="checkbox"
               checked={props.status === TaskStatuses.Completed}
               onChange={changeHandler}
        />
    );
};

export default CheckBox;