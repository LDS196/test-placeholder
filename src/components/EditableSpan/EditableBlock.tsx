import React, { ChangeEvent, useState } from "react"
import TextField from "@mui/material/TextField"
import { Button } from "@mui/material"
import s from "./EditableBlock.module.scss"
import { useActions } from "../../hooks/useActions"
import { InitialPostType, postsThunks } from "../../features/posts/posts.slice"

type EditableSpanPropsType = {
    editMode: boolean
    activateViewMode: () => void
    post: InitialPostType
}

export const EditableBlock = ({ editMode, activateViewMode, post }: EditableSpanPropsType) => {
    const [title, setTitle] = useState(post.title)
    const [name, setName] = useState(post.name)
    const [body, setBody] = useState(post.body)
    const { updatePost } = useActions(postsThunks)

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const changeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }
    const changeBody = (e: ChangeEvent<HTMLInputElement>) => {
        setBody(e.currentTarget.value)
    }
    const saveChanges = () => {
        updatePost({
            id: post.id,
            title,
            body,
            userId: post.userId,
            favorite: post.favorite,
            checked: post.checked,
            name: name,
        })
        activateViewMode()
    }
    const favoriteClass = post.favorite ? s.favorite + " " + s.block : s.block
    return (
        <div className={favoriteClass}>
            {editMode ? (
                <>
                    <TextField label={"Title"} fullWidth value={title} onChange={changeTitle} autoFocus />
                    <TextField label={"Name"} fullWidth value={name} onChange={changeName} />
                    <TextField label={"Body"} fullWidth value={body} onChange={changeBody} />
                    <div className={s.button}>
                        <Button onClick={saveChanges} variant={"contained"}>
                            Save
                        </Button>
                        <Button onClick={activateViewMode} variant={"outlined"}>
                            Cancel
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <span>Title: {post.title}</span>
                    <span>Name: {post.name}</span>
                    <span>Description: {post.body}</span>
                </>
            )}
        </div>
    )
}
