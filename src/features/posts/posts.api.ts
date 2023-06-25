import { instance } from "../../components/common/api/common.api"

export const postsApi = {
    getPosts() {
        return instance.get<PostType[]>(`/posts`)
    },
    getUsers() {
        return instance.get<UserType[]>(`/users`)
    },
    getComments(postId:number) {
        return instance.get<CommentType[]>(`/posts/${postId}/comments`)
    },
}



export type PostType={
    userId: number,
    id: number,
    title: string,
    body: string
}
export type UserType={
    name:string
    id:number
}

export type CommentType={
    postId: number
    id: number
    name: string
    email: string,
    body: string
}