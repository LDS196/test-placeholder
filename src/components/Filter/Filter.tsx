import React, { useState } from "react"
import { Search } from "./Search/Search"
import MultipleSelectCheckmarks from "./MultiSelect/MultipleSelectCheckmarks"
import { BasicTable } from "./Sort/BasicTable"
import s from "./filter.module.scss"
import SelectCountPosts from "./SelectCountPosts/SelectCountPosts"
import { Button } from "@mui/material"
import NewPostForm from "../NewPost/NewPostForm"

const Filter = () => {
    const [showModalWindow, setShowModalWindow] = useState(false)
    const hideModal = () => setShowModalWindow(false)

    return (
        <div className={s.filter}>
            <BasicTable />
            <Search />
            <MultipleSelectCheckmarks />
            <SelectCountPosts />
            <Button variant={"contained"} onClick={() => setShowModalWindow(true)}>
                Add new post
            </Button>
            {showModalWindow && <NewPostForm hideModal={hideModal} />}
        </div>
    )
}

export default Filter
