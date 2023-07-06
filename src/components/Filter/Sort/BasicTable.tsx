import * as React from "react"
import Table from "@mui/material/Table"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { useSelector } from "react-redux"
import { FC } from "react"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"
import s from "./BasicTable.module.scss"
import { postsActions } from "../../../features/posts/posts.slice"
import { selectSortBy } from "../../../features/posts/posts.selector"
import { useActions } from "../../../hooks/useActions"

type PropsType = {}

export const BasicTable: FC<PropsType> = () => {
    const { sortPacks } = useActions(postsActions)
    const sortBy = useSelector(selectSortBy)

    const sortItems = (name: string) => {
        if (sortBy.sortType === null) {
            sortPacks({ name: name, sortType: -1 })
            return
        }
        if (sortBy.sortType === -1) {
            sortPacks({ name: name, sortType: 1 })
            return
        }
        if (sortBy.sortType === 1) {
            sortPacks({ name: name, sortType: -1 })
            return
        }
    }

    return (
        <Table sx={{ maxWidth: 400 }}>
            <TableHead>
                <TableRow>
                    <TableCell onClick={() => sortItems("title")} style={{ cursor: "pointer" }}>
                        <div className={s.sortBy}>
                            <span>Title</span>
                            {sortBy.name === "title" && sortBy.sortType === -1 && <ArrowDropDownIcon />}
                            {sortBy.name === "title" && sortBy.sortType === 1 && <ArrowDropUpIcon />}
                        </div>
                    </TableCell>
                    <TableCell onClick={() => sortItems("favorites")} style={{ cursor: "pointer" }}>
                        <div className={s.sortBy}>
                            <span>Favorites</span>
                            {sortBy.name === "favorites" && sortBy.sortType === -1 && <ArrowDropDownIcon />}
                            {sortBy.name === "favorites" && sortBy.sortType === 1 && <ArrowDropUpIcon />}
                        </div>
                    </TableCell>
                    <TableCell onClick={() => sortItems("name")} style={{ cursor: "pointer" }}>
                        <div className={s.sortBy}>
                            <span>Name</span>
                            {sortBy.name === "name" && sortBy.sortType === -1 && <ArrowDropDownIcon />}
                            {sortBy.name === "name" && sortBy.sortType === 1 && <ArrowDropUpIcon />}
                        </div>
                    </TableCell>
                </TableRow>
            </TableHead>
        </Table>
    )
}
