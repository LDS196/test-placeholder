import React, { ChangeEvent, FC, useEffect, useState } from "react"
import { InputAdornment, TextField, Typography } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { useActions } from "../../../hooks/useActions"
import { postsActions } from "../../../features/posts/posts.slice"
import { selectSearchValue } from "../../../features/posts/posts.selector"
import { useSelector } from "react-redux"

export const Search = () => {
    const searchValue = useSelector(selectSearchValue)
    const { setSearchValue } = useActions(postsActions)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value)
    }

    return (
        <div>
            {/*<Typography component="p" sx={{ fontSize: "18px" }}>*/}
            {/*    Search*/}
            {/*</Typography>*/}
            <TextField
                onChange={handleChange}
                value={searchValue}
                sx={{ minWidth: "250px" }}
                // size={"small"}
                id="search"
                name="search"
                placeholder={"Provide your text"}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    )
}
