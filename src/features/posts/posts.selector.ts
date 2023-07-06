import { RootState } from "../../app/store"

export const selectPosts = (state: RootState) => state.posts.posts
export const selectSearchValue = (state: RootState) => state.posts.searchValue
export const selectCountPosts = (state: RootState) => state.posts.countPosts
export const selectFilterUserNames = (state: RootState) => state.posts.filterUserNames
export const selectSortBy = (state: RootState) => state.posts.sortBy
