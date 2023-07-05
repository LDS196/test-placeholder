import { RootState } from "../../app/store"

export const selectPosts = (state: RootState) => state.posts.posts
export const selectCountPosts = (state: RootState) => state.posts.countPosts
