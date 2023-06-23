import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "../../components/common/utils/create-app-async-thunk"
import { RootState } from "../../app/store"
import { handleServerNetworkError } from "../../components/common/utils/handle-server-network-error"
import { ResponsePosts } from "./posts.api"

const getPosts = createAppAsyncThunk<any, any, { state: RootState }>("posts/getPosts", async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI
    try {
    } catch (error) {
        return rejectWithValue(handleServerNetworkError(error))
    }
})

type InitialStateType = ResponsePosts & {}
const initialState: InitialStateType = {}
const slice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        changePageSize: (state, action: PayloadAction<number>) => {},
    },
    extraReducers: (builder) => {
        builder.addCase(getPosts.fulfilled, (state, action) => {
            return { ...state, ...action.payload }
        })
    },
})

export const postsActions = slice.actions
export const postsReducer = slice.reducer
export const postsThunks = {}
