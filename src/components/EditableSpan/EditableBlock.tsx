import React, { ChangeEvent, useState } from "react"
import TextField from "@mui/material/TextField"
import { Button } from "@mui/material"
import s from "./EditableBlock.module.scss"

type EditableSpanPropsType = {
    title: string
    name: string
    body: string
    editMode:boolean
    activateViewMode: () => void
}

export const EditableBlock = React.memo(function (props: EditableSpanPropsType) {

    let [title, setTitle] = useState(props.title)
    let [name, setName] = useState(props.name)
    let [body, setBody] = useState(props.body)

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const changeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }
    const changeBody = (e: ChangeEvent<HTMLInputElement>) => {
        setBody(e.currentTarget.value)
    }
    const saveChanges=()=>{

    }


    return <div className={s.block}>
        {
            props.editMode ? (
                <>
                    <TextField label={title}  fullWidth value={title} onChange={changeTitle} autoFocus />
                    <TextField label={name} fullWidth value={name} onChange={changeName}/>
                    <TextField label={body} fullWidth value={body} onChange={changeBody}/>
                    <div className={s.button}>
                        <Button onClick={saveChanges}>Save</Button>
                        <Button onClick={props.activateViewMode} variant={"outlined"}>Cancel</Button>
                    </div>
                </>
            ) : (
                <>
                    <span>Title: {props.title}</span>
                    <span>Name: {props.name}</span>
                    <span>Description: {props.body}</span>
                </>
            )
        }
    </div>
})
