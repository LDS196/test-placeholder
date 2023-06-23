import React, { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import s from "./app.module.css"
import Header from "../components/Header/Header"
import { ErrorSnackbar } from "../components/ErrorSnackbar/ErrorSnackbar"
import { Posts } from "../features/posts/Posts"

function App() {
    return (
        <>
            <Header />
            <div className={s.app}>
                <ErrorSnackbar />
                <Routes>
                    <Route path={"/posts"} element={<Posts />} />
                    <Route path={"/albums"} element={<div>al</div>} />
                    <Route path={"/todos"} element={<div>todos</div>} />
                </Routes>
            </div>
        </>
    )
}

export default App
