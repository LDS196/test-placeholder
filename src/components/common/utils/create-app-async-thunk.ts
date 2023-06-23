import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from "../../../app/store"

/**
 Эта функция предназначена для того, чтобы избавиться от дублирования кода по созданию типов в санке
 */
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: RootState
    dispatch: AppDispatch
    rejectValue: RejectValueType | null
}>()

export type RejectValueType = {
    data: string
    showGlobalError: boolean
}
// export type ResponseErrorType={
// error:string
// }
