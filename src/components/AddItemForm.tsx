import {Button, TextField} from '@mui/material';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


type AddItemFormType = {

    addItem: (value: string) => void
}

export function AddItemForm(props: AddItemFormType) {
    const [value, setValue] = useState('')
    const [error, setError] = useState(false)
    const changeValue = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value)
        setError(false)
    }
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && clickHandlerAddTask()
    const clickHandlerAddTask = () => {
        const trimValue = value.trim()
        if (trimValue) {
            props.addItem(trimValue)
        } else {
            setError(true)
        }
        setValue('')

    }
    return (
        <div>
            <TextField value={value}
                       onChange={changeValue}
                       onKeyDown={onKeyDownAddTask}
                       variant="standard"
                       className={error ? 'error' : ''}
            />
            <Button size="small" variant="contained" onClick={clickHandlerAddTask}>+</Button>
            {error && <div className="error-message">Failed is required</div>}
        </div>
    )
}