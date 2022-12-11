import React, {ChangeEvent} from 'react';
type CheckBoxType = {
    callback: (check:boolean) => void
    isDone:boolean
}

const CheckBox = (props:CheckBoxType) => {
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callback(e.currentTarget.checked)
    }
    return (

            <input type="checkbox"
                   checked={props.isDone}
                   onChange={changeHandler}
            />
    );
};

export default CheckBox;