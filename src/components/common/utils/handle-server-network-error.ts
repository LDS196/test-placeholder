import axios, { AxiosError } from "axios"

/**
 * Обрабатывает ошибки сети, возникающие при отправке запросов на сервер
 */
export const handleServerNetworkError = (error: unknown, isShowError: boolean = true) => {
    const err = error as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
        return {
            data: err?.response?.data?.error ? err.response.data.error : err.message,
            showGlobalError: isShowError,
        }
    } else {
        return { data: "Some error occurred", showGlobalError: isShowError }
    }
}
