import React, { useEffect } from "react"
import { useActions } from "../../hooks/useActions"
import { postsThunks } from "./posts.slice"
import { selectIsLoading } from "../../app/app.select"
import { useSelector } from "react-redux"
import { PostItem } from "../../components/Post/PostItem"
import { selectCountPosts, selectPosts } from "./posts.selector"

export const Posts = () => {
    const isLoading = useSelector(selectIsLoading)
    const countPosts = useSelector(selectCountPosts)
    const { getPosts} = useActions(postsThunks)
    const posts = useSelector(selectPosts)

    const postsForRender = countPosts ? posts.slice(0, countPosts) : posts

    useEffect(() => {
        getPosts({})
    }, [])

    return (
        <>
            <div>
                {postsForRender.map((p) => {
                    return <PostItem key={p.id} post={p} />
                })}
            </div>
        </>
    )
}
