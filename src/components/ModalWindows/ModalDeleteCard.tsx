import React, { FC } from "react"
import { Button, Paper, Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import s from "./Modal.module.scss"

import { useSelector } from "react-redux"
import { selectIsLoading } from "../../app/app.select"
import { postsThunks } from "../../features/posts/posts.slice"
import { useActions } from "../../hooks/useActions"

type PropsType = {
    hideModalDeleteCard: () => void
    id: number
}

export const ModalDeleteCard: FC<PropsType> = ({ hideModalDeleteCard, id }) => {
    const isLoading = useSelector(selectIsLoading)

    const { deletePost } = useActions(postsThunks)

    const deletePostHandler = () => {
        deletePost({ id })
            .unwrap()
            .then(() => hideModalDeleteCard())
    }
    return (
        <div className={s.modalWrapper}>
            <Paper elevation={3} sx={{ maxWidth: "350px", width: "100%" }}>
                <div className={s.modal}>
                    <div className={s.title}>
                        <Typography component="p" sx={{ fontSize: "18px" }}>
                            Delete Post
                        </Typography>
                        <button onClick={hideModalDeleteCard}>
                            <CloseIcon />
                        </button>
                    </div>
                    <form className={s.form}>
                        <Typography component="p" sx={{ fontSize: "16px" }}>
                            Do you really want to remove post?
                        </Typography>
                        <div className={s.modalButtons}>
                            <Button
                                disabled={isLoading}
                                onClick={hideModalDeleteCard}
                                variant="outlined"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Cancel
                            </Button>
                            <Button
                                disabled={isLoading}
                                onClick={deletePostHandler}
                                color={"error"}
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Delete
                            </Button>
                        </div>
                    </form>
                </div>
            </Paper>
        </div>
    )
}
