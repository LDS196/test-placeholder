import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useSelector } from "react-redux"
import { selectCountPosts } from "../../../features/posts/posts.selector"
import { useActions } from "../../../hooks/useActions"
import { postsActions } from "../../../features/posts/posts.slice"

export default function SelectCountPosts() {
    const countPosts = useSelector(selectCountPosts)
const {setCountPosts}= useActions(postsActions)


    const handleChange = (event: SelectChangeEvent) => {
        setCountPosts(event.target.value as string);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Count Posts</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={countPosts}
                    label="Count Posts"
                    onChange={handleChange}
                >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={'All'}>All</MenuItem>

                </Select>
            </FormControl>
        </Box>
    );
}