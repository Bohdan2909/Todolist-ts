import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from '@mui/material/TextField';

type EditableSpanType = {
    title: string
    callback: (newTitle: string) => void

}
export const EditableSpan = (props: EditableSpanType) => {
    const [edit, setEdit] = useState(false)
    const [updateTitle, setUpdateTitle] = useState(props.title)
    const clickChangeSpanHandler = () => {
        setEdit(!edit)
        edit && props.callback(updateTitle)

    }
    const onEnterChangeSpanHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        console.log(e)
        if (e.key === 'Enter') {
            setEdit(!edit)
            edit && props.callback(updateTitle)
        }
    }
    const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdateTitle(e.currentTarget.value)
    }
    return (
        edit
            ?
            <TextField onKeyDown={onEnterChangeSpanHandler}
                       onChange={changeInputHandler}
                       value={updateTitle}
                       type="text"
                       autoFocus onBlur={clickChangeSpanHandler}
                       variant="outlined"
                       size="small"
            />
            :
            <span onDoubleClick={clickChangeSpanHandler}>{props.title}</span>

    )
}