import React, { useEffect} from "react"
import { useActions } from "../../hooks/useActions"
import { postsThunks } from "./posts.slice"
import { selectIsLoading } from "../../app/app.select"
import { useSelector } from "react-redux"
import { PostItem } from "../../components/Post/PostItem"
import { selectPosts, selectUsers } from "./posts.selector"


export const Posts = () => {
    const isLoading = useSelector(selectIsLoading)
    const { getPosts, getUsers } = useActions(postsThunks)
    const posts = useSelector(selectPosts)
    const users = useSelector(selectUsers)

    const postsForRender = posts.map((p) => {
        const user = users.find((u) => u.id === p.userId)
        return {
            ...p,
            name: user ? user.name : "",
        }
    })


    useEffect(() => {
        getPosts({})
        getUsers({})
    },[])

    return (
        <>
                <div>
                    {
                        postsForRender.map(p=>{
                            return <PostItem key={p.id} title={p.title} name={p.name} body={p.body} id={p.id}/>
                        })
                    }
                </div>

        </>
    )
}
