import { RootState } from "../../app/store"

export const selectPosts = (state: RootState) => state.posts.posts
export const selectUsers = (state: RootState) => state.posts.users
