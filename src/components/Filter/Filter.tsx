import React from "react"
import { Search } from "./Search/Search"
import MultipleSelectCheckmarks from "./MultiSelect/MultipleSelectCheckmarks"

const Filter = () => {
    return (
        <div style={{ display: "flex" }}>
            <Search />
            <MultipleSelectCheckmarks />
        </div>
    )
}

export default Filter
