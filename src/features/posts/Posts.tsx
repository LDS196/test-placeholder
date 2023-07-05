import React, { useEffect, useState } from "react"
import { useActions } from "../../hooks/useActions"
import { postsActions, postsThunks } from "./posts.slice"
import { selectIsLoading } from "../../app/app.select"
import { useSelector } from "react-redux"
import { PostItem } from "../../components/Post/PostItem"
import { selectFilterUserNames, selectPosts, selectSearchValue } from "./posts.selector"
import s from "./posts.module.scss"
import { Button } from "@mui/material"
import { ModalWindow } from "../../components/ModalWindows/ModalWindow"
import Filter from "../../components/Filter/Filter"

export const Posts = () => {
    const searchValue = useSelector(selectSearchValue)
    const filterUserNames = useSelector(selectFilterUserNames)
    const isLoading = useSelector(selectIsLoading)
    const { getPosts } = useActions(postsThunks)
    const { removePosts, addPostsFavorites } = useActions(postsActions)
    const posts = useSelector(selectPosts)

    let postForRender = posts.filter((p) => p.title.includes(searchValue))
    if (filterUserNames.length !== 0) {
        postForRender = postForRender.filter((p) => filterUserNames.includes(p.name))
    }

    const postChecked = posts.find((p) => p.checked)

    const [showModalWindow, setShowModalWindow] = useState(false)
    const hideModal = () => setShowModalWindow(false)
    const removePostsHandler = () => {
        removePosts({})
        hideModal()
    }
    const [showModalWindowFavorites, setShowModalWindowFavorites] = useState(false)
    const hideModalFavorites = () => setShowModalWindowFavorites(false)
    const addPostsFavoritesHandler = () => {
        addPostsFavorites({})
        hideModalFavorites()
    }

    useEffect(() => {
        getPosts({})
    }, [])

    return (
        <>
            <Filter />
            <div className={s.checked}>
                {postChecked && (
                    <>
                        <Button onClick={() => setShowModalWindow(true)} variant={"contained"}>
                            Удалить
                        </Button>
                        <Button onClick={() => setShowModalWindowFavorites(true)} variant={"outlined"}>
                            В избранное
                        </Button>
                    </>
                )}
            </div>
            {postChecked && <div></div>}
            <div>
                {postForRender.map((p) => {
                    return <PostItem key={p.id} post={p} />
                })}
            </div>
            <>
                {showModalWindow && (
                    <ModalWindow
                        buttonTitle={"Delete"}
                        callback={removePostsHandler}
                        subTitle={"remove posts"}
                        title={"Delete Posts"}
                        hideModal={hideModal}
                    />
                )}
                {showModalWindowFavorites && (
                    <ModalWindow
                        buttonTitle={"Add"}
                        callback={addPostsFavoritesHandler}
                        subTitle={"add posts to favorites"}
                        title={"Add Posts"}
                        hideModal={hideModalFavorites}
                    />
                )}
            </>
        </>
    )
}
