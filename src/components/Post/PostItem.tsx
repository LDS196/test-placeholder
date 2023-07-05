import React, { useState } from "react"
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
import { InitialPostType, postsActions, postsThunks } from "../../features/posts/posts.slice"
import { EditableBlock } from "../EditableSpan/EditableBlock"
import { ModalDeleteCard } from "../ModalWindows/ModalDeleteCard"

type Props = {
   post:InitialPostType
}
export const PostItem = ({ post}: Props) => {
    const [comments, setComments] = useState<CommentType[]>([])
    const { getComments} = useActions(postsThunks)
    const {addFavorite}=useActions(postsActions)
    const [editMode, setEditMode] = useState(false)
    const [showModalWindow, setShowModalWindow] = useState(false)


    const [isShowComments, setIsShowComments] = useState<boolean>(false)
    const buttonCommentClass= isShowComments? "": s.buttonComment
    const handleChange = () => {
        console.log("ch")
    }

    const addFavoriteHandler = ()=>{
        addFavorite({...post,favorite:!post.favorite})
    }
    const activateViewMode=()=>{
        setEditMode(false)
    }
    const hideModalDeleteCard=()=>setShowModalWindow(false)

    const onClickHandler = (e:any) => {
        setIsShowComments(!isShowComments)
        getComments({ postId:post.id }).then((res) => {
            if (Array.isArray(res.payload)) {
                setComments(res.payload)
            }
        })
    }

    return (
        <div className={s.postBlock}>
            <div className={s.container}>
                    <EditableBlock post={post}
                                   activateViewMode={activateViewMode} editMode={editMode} />
                <div className={s.settings}>
                    <IconButton onClick={onClickHandler} className={buttonCommentClass}>
                        <CommentIcon />
                    </IconButton>
                    <IconButton onClick={()=>{setEditMode(true)}}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={()=>{setShowModalWindow(true)}}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={addFavoriteHandler}>
                        <BookmarkAddedIcon />
                    </IconButton>

                    <FormControlLabel control={<Checkbox onChange={handleChange} />} label="Выбрать" />
                </div>
            </div>
            {isShowComments && <Comments comments={comments} postId={post.id} />}
            {showModalWindow && <ModalDeleteCard id={post.id} hideModalDeleteCard={hideModalDeleteCard}/>}
        </div>
    )
}
