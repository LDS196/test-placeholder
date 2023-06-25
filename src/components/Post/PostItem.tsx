import React from "react"
import s from "./postItem.module.scss"
import DeleteIcon from "@mui/icons-material/Delete"
import CommentIcon from "@mui/icons-material/Comment"
import EditIcon from "@mui/icons-material/Edit"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import IconButton from "@mui/material/IconButton"
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded"

type Props = {
    title: string
    name: string
    body: string
}
export const PostItem = ({ title, body, name }: Props) => {
    const handleChange = () => {
        console.log('ch')
    }

    return (
        <div className={s.container}>
            <div className={s.post}>
                <h3>Title: {title}</h3>
                <h4>Name: {name}</h4>
                <p>Description: {body}</p>
            </div>

            <div className={s.settings}>
                <IconButton>
                    <CommentIcon />
                </IconButton>
                <IconButton>
                    <EditIcon />
                </IconButton>
                <IconButton>
                    <DeleteIcon />
                </IconButton>
                <IconButton>
                    <BookmarkAddedIcon />
                </IconButton>

                <FormControlLabel control={<Checkbox  onChange={handleChange} />} label="Выбрать" />
            </div>
        </div>
    )
}
