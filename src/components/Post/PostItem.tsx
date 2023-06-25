import React, { useEffect, useState } from "react"
import s from "./postItem.module.scss"
import DeleteIcon from "@mui/icons-material/Delete"
import CommentIcon from "@mui/icons-material/Comment"
import EditIcon from "@mui/icons-material/Edit"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import IconButton from "@mui/material/IconButton"
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded"
import Comments from "../Comments/Comments"
import { CommentType } from "../../features/posts/posts.api"
import { useActions } from "../../hooks/useActions"
import { postsThunks } from "../../features/posts/posts.slice"
import { EditableBlock } from "../EditableSpan/EditableBlock"

type Props = {
    id: number
    title: string
    name: string
    body: string
}
export const PostItem = ({ title, body, name, id }: Props) => {
    const [comments, setComments] = useState<CommentType[]>([])
    const { getComments } = useActions(postsThunks)
    let [editMode, setEditMode] = useState(false)

    const [isShowComments, setIsShowComments] = useState<boolean>(false)
    const buttonCommentClass= isShowComments? "": s.buttonComment
    const handleChange = () => {
        console.log("ch")
    }
    const activateViewMode=()=>{
        setEditMode(false)
    }
    const onClickHandler = (e:any) => {
        setIsShowComments(!isShowComments)
        getComments({ postId:id }).then((res) => {
            if (Array.isArray(res.payload)) {
                setComments(res.payload)
            }
        })
    }

    return (
        <div className={s.postBlock}>
            <div className={s.container}>
                <div className={s.post}></div>
                <EditableBlock title={title} name={name} body={body} activateViewMode={activateViewMode} editMode={editMode}/>

                <div className={s.settings}>
                    <IconButton onClick={onClickHandler} className={buttonCommentClass}>
                        <CommentIcon />
                    </IconButton>
                    <IconButton onClick={()=>{setEditMode(true)}}>
                        <EditIcon />
                    </IconButton>
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton>
                        <BookmarkAddedIcon />
                    </IconButton>

                    <FormControlLabel control={<Checkbox onChange={handleChange} />} label="Выбрать" />
                </div>
            </div>
            {isShowComments && <Comments comments={comments} postId={id} />}
        </div>
    )
}
