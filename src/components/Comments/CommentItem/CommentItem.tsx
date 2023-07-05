import React from "react"
import s from "./commentItem.module.scss"

type Props = {
    name: string
    email: string
    body: string
}
const CommentItem = ({ name, email, body }: Props) => {
    return (
        <div className={s.comment}>
            <span>Name: {name}</span>
            <span>Email: {email}</span>
            <p>Comment: {body}</p>
        </div>
    )
}

export default CommentItem
