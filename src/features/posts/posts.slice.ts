import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "../../components/common/utils/create-app-async-thunk"
import { RootState } from "../../app/store"
import { handleServerNetworkError } from "../../components/common/utils/handle-server-network-error"
import { CommentType, postsApi, PostType, UserType } from "./posts.api"

const getUsers = createAppAsyncThunk<UserType[], void, { state: RootState }>("posts/getUsers", async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI
    try {
        const res = await postsApi.getUsers()
        return res.data
    } catch (error) {
        return rejectWithValue(handleServerNetworkError(error))
    }
})

const getPosts = createAppAsyncThunk<InitialPostType[], void, { state: RootState }>("posts/getPosts", async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI
    try {
        const res = await postsApi.getPosts()
        const users = await postsApi.getUsers()
        return res.data.map(p=>{
            const user = users.data.find(u=>u.id===p.userId)
            return {...p,favorite:false,checked:false,name:user?.name as string}
        })
    } catch (error) {
        return rejectWithValue(handleServerNetworkError(error))
    }
})
const deletePost = createAppAsyncThunk<number, { id: number }, { state: RootState }>(
    "posts/deletePost",
    async (arg, thunkAPI) => {
        const { rejectWithValue, getState } = thunkAPI
        const posts = getState().posts.posts
        try {
            await postsApi.deletePost(arg.id)
            const index = posts.findIndex((p) => p.id === arg.id)
            return index
        } catch (error) {
            return rejectWithValue(handleServerNetworkError(error))
        }
    }
)
const getComments = createAppAsyncThunk<CommentType[], { postId: number }, { state: RootState }>(
    "posts/getComments",
    async (arg, thunkAPI) => {
        const { rejectWithValue, getState } = thunkAPI

        try {
            const res = await postsApi.getComments(arg.postId)
            return res.data
        } catch (error) {
            return rejectWithValue(handleServerNetworkError(error))
        }
    }
)
const updatePost = createAppAsyncThunk<InitialPostType[], InitialPostType, { state: RootState }>(
    "posts/updatePost",
    async (arg, thunkAPI) => {
        const { rejectWithValue, getState } = thunkAPI
        const posts = getState().posts.posts
        try {
            const post = {id:arg.id,title:arg.title,body:arg.body,userId:arg.userId}
            const res = await postsApi.updatePost(post)
            const updatedPosts = posts.map((p) => (p.id === res.data.id ? arg : p))
            return updatedPosts
        } catch (error) {
            return rejectWithValue(handleServerNetworkError(error))
        }
    }
)
export type InitialPostType= PostType & {favorite:boolean, checked:boolean,name:string}

type InitialStateType = {
    users: UserType[]
    countPosts: number
    posts: InitialPostType[]
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
        updateUser: (state, action: PayloadAction<{ userId: number; name: string }>) => {
            console.log('up')
            const userId = action.payload.userId
            const newName = action.payload.name
            state.users = state.users.map((u) => (u.id === userId ? { ...u, name: newName } : u))
        },
        addFavorite: (state, action: PayloadAction<InitialPostType>) => {
            const post = action.payload
            state.posts=state.posts.map(p=>p.id===post.id?{...p,favorite:post.favorite}:p)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.posts = action.payload
        })
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.users = action.payload
        })
        builder.addCase(getComments.fulfilled, (state, action) => {})
        builder.addCase(updatePost.fulfilled, (state, action) => {
            state.posts = action.payload
        })
        builder.addCase(deletePost.fulfilled, (state, action) => {
            const index = action.payload
            state.posts.splice(index, 1)
        })
    },
})

export const postsActions = slice.actions
export const postsReducer = slice.reducer
export const postsThunks = { getPosts, getUsers, getComments, updatePost, deletePost }
