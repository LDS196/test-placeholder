import React, { useEffect, useState } from "react"
import s from "./comments.module.scss"
import { useActions } from "../../hooks/useActions"
import { postsThunks } from "../../features/posts/posts.slice"
import { CommentType } from "../../features/posts/posts.api"
import CommentItem from "./CommentItem/CommentItem"

type Props = {
    postId: number
    comments: CommentType[]
}
const Comments = ({ postId, comments }: Props) => {
    const commentsForRender = comments.map((c) => (
        <CommentItem key={c.id} name={c.name} email={c.email} body={c.body} />
    ))

    return <div className={s.container}>{commentsForRender}</div>
}

export default Comments
