import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "../../components/common/utils/create-app-async-thunk"
import { RootState } from "../../app/store"
import { handleServerNetworkError } from "../../components/common/utils/handle-server-network-error"
import { CommentType, postsApi, PostType, UserType } from "./posts.api"

const getPosts = createAppAsyncThunk<PostType[], void, { state: RootState }>("posts/getPosts",
    async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI
    try {
        const res = await postsApi.getPosts()
        return res.data
    } catch (error) {
        return rejectWithValue(handleServerNetworkError(error))
    }
})
const getUsers = createAppAsyncThunk<UserType[], void, { state: RootState }>("posts/getUsers",
    async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI
    try {
        const res = await postsApi.getUsers()
        return res.data
    } catch (error) {
        return rejectWithValue(handleServerNetworkError(error))
    }
})
const getComments = createAppAsyncThunk<CommentType[],{postId:number}, { state: RootState }>("posts/getComments",
    async (arg, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI
    try {
        const res = await postsApi.getComments(arg.postId)
        return res.data
    } catch (error) {
        return rejectWithValue(handleServerNetworkError(error))
    }
})

type InitialStateType = {
    users: UserType[]
    countPosts: number
    posts: PostType[]
}
const initialState: InitialStateType = {
    countPosts: 10,
    posts: [],
    users: [],
}
const slice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        changePageSize: (state, action: PayloadAction<number>) => {},
    },
    extraReducers: (builder) => {
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.posts = action.payload
        })
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.users = action.payload
        })
        builder.addCase(getComments.fulfilled, (state, action) => {

        })
    },
})

export const postsActions = slice.actions
export const postsReducer = slice.reducer
export const postsThunks = { getPosts,getUsers,getComments }
