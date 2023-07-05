import React, { FC } from "react"
import { Button, Paper, Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import s from "./Modal.module.scss"
import { useSelector } from "react-redux"
import { selectIsLoading } from "../../app/app.select"

type PropsType = {
    hideModal: () => void
    callback: () => void
    title: string
    subTitle: string
    buttonTitle: string
}

export const ModalWindow: FC<PropsType> = ({ title, subTitle, hideModal, callback, buttonTitle }) => {
    const isLoading = useSelector(selectIsLoading)

    const onClickHandler = () => {
        callback()
    }
    return (
        <div className={s.modalWrapper}>
            <Paper elevation={3} sx={{ maxWidth: "350px", width: "100%" }}>
                <div className={s.modal}>
                    <div className={s.title}>
                        <Typography component="p" sx={{ fontSize: "18px" }}>
                            {title}
                        </Typography>
                        <button onClick={hideModal}>
                            <CloseIcon />
                        </button>
                    </div>
                    <form className={s.form}>
                        <Typography component="p" sx={{ fontSize: "16px" }}>
                            Do you really want to {subTitle}?
                        </Typography>
                        <div className={s.modalButtons}>
                            <Button disabled={isLoading} onClick={hideModal} variant="outlined" sx={{ mt: 3, mb: 2 }}>
                                Cancel
                            </Button>
                            <Button
                                disabled={isLoading}
                                onClick={onClickHandler}
                                color={"error"}
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {buttonTitle}
                            </Button>
                        </div>
                    </form>
                </div>
            </Paper>
        </div>
    )
}
