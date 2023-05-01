import 'react'
import './Searchbar.scss'

//tools
import { useState, useEffect } from 'react';

interface serachbarProps {
    action?: Function
}

export default function Searchbar(props: serachbarProps): JSX.Element {
    const [value, setValue] = useState("");
    const { action } = props

    useEffect(() => {
        //change the query 500ms after the user stoped typing
        const timeout = setTimeout(() => {
            if (action !== undefined) action(value);
        }, 500)

        return () => {
            clearTimeout(timeout)
        }
    }, [value])

    const inputChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
        evt.preventDefault();
        const val: string = evt.target.value.trim();
        if (val === value) return;
        setValue(val);
    }

    return (
        <div className="Searchbar">
            <div className="Searchbar-content">
                <input className='Searchbar-input' type="text" placeholder='Search' minLength={1} required={true} onChange={inputChangeHandler}></input>
                <i className="material-icons">search</i>
            </div>
        </div>
    )
}