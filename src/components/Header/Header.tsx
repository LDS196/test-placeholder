import React from "react"
import s from "./Header.module.scss"
import { NavLink } from "react-router-dom"
import { LinearProgress } from "@mui/material"
import { useSelector } from "react-redux"
import { selectIsLoading } from "../../app/app.select"

const Header = () => {
    const isLoading = useSelector(selectIsLoading)
    const menu = [
        { path: "/", title: "posts" },
        { path: "/albums", title: "albums" },
        { path: "/todos", title: "todos" },
    ]
    const activeLink = ({ isActive }: { isActive: boolean }) => (isActive ? s.active : "")
    return (
        <>
            <div className={s.container}>
                <nav className={s.nav}>
                    <ul>
                        {menu.map((el) => (
                            <li key={el.title}>
                                <NavLink className={activeLink} to={el.path}>
                                    {el.title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div style={{ height: "10px" }}>{isLoading && <LinearProgress />}</div>
        </>
    )
}

export default Header
