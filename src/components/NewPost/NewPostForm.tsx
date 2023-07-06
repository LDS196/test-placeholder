import React from "react"
import { Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField } from "@mui/material"
import { useForm, Controller } from "react-hook-form"
import s from "./NewPostForm.module.scss"
import { selectUsers } from "../../features/posts/posts.selector"
import { useSelector } from "react-redux"
import { useActions } from "../../hooks/useActions"
import { postsThunks } from "../../features/posts/posts.slice"

export type FormDataType = {
    title: string
    body: string
    name: string
}
type PropsType = {
    hideModal: () => void
}
const NewPostForm = ({ hideModal }: PropsType) => {
    const users = useSelector(selectUsers)
    let usersName: string[] = []
    users.forEach((u) => {
        if (!usersName.includes(u.name)) usersName.push(u.name)
    })

    const { createPost } = useActions(postsThunks)
    const defaultValues = {
        title: "",
        body: "",
        name: "",
    }

    const {
        getValues,
        control,
        register,
        watch,
        formState: { errors },
        handleSubmit,
    } = useForm<FormDataType>({
        defaultValues: defaultValues,
        mode: "onBlur",
    })
    watch()

    const onSubmit = (data: FormDataType) => {
        if (Object.keys(errors).length === 0) {
            createPost(data)
                .unwrap()
                .then(() => hideModal())
        }
    }


    return (
        <div className={s.modalWrapper}>
            <Paper elevation={3} sx={{ maxWidth: "600px", width: "100%" }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3>Add new post</h3>
                    <div className={s.inputContainer}>
                        <TextField
                            {...register("title", {
                                required: "Required field",
                                maxLength: {
                                    value: 30,
                                    message: "Max length 30 symbols",
                                },
                                pattern: {
                                    value: /^[a-zA-Zа-яА-Я0-9]+$/,
                                    message: "Only numbers and letters are allowed",
                                },
                            })}
                            error={!!errors.title}
                            name="title"
                            placeholder={"Title"}
                            id="field-title"
                            variant="outlined"
                            fullWidth={true}
                        />

                        <div className={s.error}>{errors?.title && <p>{errors?.title?.message || "Error"}</p>}</div>
                    </div>
                    <div className={s.inputContainer}>
                        <TextField
                            {...register("body", {
                                required: "Required field",
                                maxLength: {
                                    value: 300,
                                    message: "Max length 300 symbols",
                                },
                                pattern: {
                                    value: /^[a-zA-Zа-яА-Я0-9]+$/,
                                    message: "Only numbers and letters are allowed",
                                },
                            })}
                            error={!!errors.body}
                            name="body"
                            placeholder={"Body"}
                            id="field-body"
                            variant="outlined"
                            fullWidth={true}
                        />

                        <div className={s.error}>{errors?.body && <p>{errors?.body?.message || "Error"}</p>}</div>
                    </div>
                    <div className={s.inputContainer}>
                        <FormControl fullWidth className={s.formControll}>
                            <InputLabel shrink={false} className={s.inputSelectLabel} id="select-label">
                                {!getValues("name") && "Не выбрано"}
                            </InputLabel>
                            <Controller
                                name="name"
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        {...register("name", { required: "Required field" })}
                                        onChange={(val) => onChange(val.target.value)}
                                        labelId="select-label"
                                        error={!!errors.name && !value}
                                        value={value ? value : ""}
                                        label={null}
                                    >
                                        {usersName.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </FormControl>

                        <div className={s.error}>
                            {errors?.name && !getValues("name") && <p>{errors?.name?.message || "Error"}</p>}
                        </div>
                    </div>
                    <div className={s.buttons}>
                        <Button onClick={hideModal} variant="outlined">
                            Cancel
                        </Button>

                        <Button type={"submit"} variant="contained">
                            Add Post
                        </Button>
                    </div>
                </form>
            </Paper>
        </div>
    )
}

export default NewPostForm
