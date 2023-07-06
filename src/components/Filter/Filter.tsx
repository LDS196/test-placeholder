import React from "react"
import { Search } from "./Search/Search"
import MultipleSelectCheckmarks from "./MultiSelect/MultipleSelectCheckmarks"
import { BasicTable } from "./Sort/BasicTable"
import s from "./filter.module.scss"
import SelectCountPosts from "./SelectCountPosts/SelectCountPosts"

const Filter = () => {
    return (
        <div className={s.filter}>
            <BasicTable />
            <Search />
            <MultipleSelectCheckmarks />
            <SelectCountPosts />
        </div>
    )
}

export default Filter
