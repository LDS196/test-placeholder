import React, { useEffect, useState } from "react"
import { useActions } from "../../hooks/useActions"
import { postsActions, postsThunks } from "./posts.slice"
import { useSelector } from "react-redux"
import { PostItem } from "../../components/Post/PostItem"
import { selectCountPosts, selectFilterUserNames, selectPosts, selectSearchValue, selectSortBy } from "./posts.selector"
import s from "./posts.module.scss"
import { Button } from "@mui/material"
import { ModalWindow } from "../../components/ModalWindows/ModalWindow"
import Filter from "../../components/Filter/Filter"

export const Posts = () => {
    const searchValue = useSelector(selectSearchValue)
    const countPosts = useSelector(selectCountPosts)
    const filterUserNames = useSelector(selectFilterUserNames)
    const { getPosts } = useActions(postsThunks)
    const { removePosts, addPostsFavorites } = useActions(postsActions)
    const posts = useSelector(selectPosts)
    const sortBy = useSelector(selectSortBy)

    let postForRender = posts.filter((p) => p.title.includes(searchValue))
    if (filterUserNames.length !== 0) {
        postForRender = postForRender.filter((p) => filterUserNames.includes(p.name))
    }
    if (sortBy.name && sortBy.sortType) {
        const key = sortBy.name
        const sortDirection = sortBy.sortType
        postForRender.sort((a, b) => {
            if (key === "userId") return (a[key] - b[key])* sortDirection
            if (key === "favorites") return (-sortDirection)
            if (a[key].toLowerCase() < b[key].toLowerCase()) return sortDirection
            if (a[key].toLowerCase() > b[key].toLowerCase()) return sortDirection
            return 0
        })
    }

    const postChecked = posts.find((p) => p.checked)

    const [showModalWindow, setShowModalWindow] = useState(false)
    const hideModal = () => setShowModalWindow(false)
    const removePostsHandler = () => {
        removePosts()
        hideModal()
    }
    const [showModalWindowFavorites, setShowModalWindowFavorites] = useState(false)
    const hideModalFavorites = () => setShowModalWindowFavorites(false)
    const addPostsFavoritesHandler = () => {
        addPostsFavorites()
        hideModalFavorites()
    }

    useEffect(() => {
        getPosts({})
    }, [countPosts])

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
            <div>
                {postForRender.map((p) => (
                    <PostItem key={p.id} post={p} />
                ))}
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
