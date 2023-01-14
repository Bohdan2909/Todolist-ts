import Button from '@mui/material/Button';
import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import TextField from '@mui/material/TextField';
import AddBox from '@mui/icons-material/AddBox';
import IconButton from '@mui/material/IconButton';


type AddItemFormType = {
    disabled?: boolean
    addItem: (value: string) => void
}

export const AddItemForm = memo(({disabled = false, ...props}: AddItemFormType) => {

    const [value, setValue] = useState<string>('')
    const [error, setError] = useState<string | null>('')
    const changeValue = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value)
        if (error) setError('')
    }
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && clickHandlerAddTask()
    const clickHandlerAddTask = () => {
        const trimValue = value.trim()
        if (trimValue) {
            props.addItem(trimValue)
        } else {
            setError('Field is required!')
        }
        setValue('')

    }
    return (
        <div>
            <TextField value={value}
                       onChange={changeValue}
                       onKeyDown={onKeyDownAddTask}
                       variant="outlined"
                       label="Type your text..."
                       className={error ? 'error' : ''}
                       error={!!error}
                       size="small"
                       helperText={error}
                       disabled={disabled}
            />
            {/*<Button style={{minWidth: '38px', maxWidth: '38px', minHeight: '38px', maxHeight: '38px'}}*/}
            {/*        variant="contained"*/}
            {/*        color="primary"*/}
            {/*        onClick={clickHandlerAddTask}>+</Button>  */}
            <IconButton style={{minWidth: '38px', maxWidth: '38px', minHeight: '38px', maxHeight: '38px'}}
                        disabled={disabled}
                        color="primary"
                        onClick={clickHandlerAddTask}>
                <AddBox/>
            </IconButton>
            {/*{error && <div className="error-message">Failed is required</div>}*/}
        </div>
    )
})