import React from 'react';
import { useSelector } from 'react-redux';
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import "./Filters.style.css";

const Filters = props => {

    const { rating, year, multiGenre, genres, handleRatingChange, handleYearChange, handleGenreChange } = props
    const ratingOptions = ["All", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    const years = useSelector(state => state.years)

    return (
        <div className='filter-container'>

            <div className='filter-item'>
                <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-label">Genres</InputLabel>
                    <Select
                        multiple
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={multiGenre}
                        label="Genre"
                        onChange={handleGenreChange}
                    >
                        <MenuItem value={-1}>All</MenuItem>
                        {genres.map(genre => {
                            return <MenuItem value={genre.id}>{genre.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </div>
            <div className='filter-item'>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Rating</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={rating}
                        label="Rating"
                        onChange={handleRatingChange}
                    >
                        {ratingOptions.map(rating => {
                            return <MenuItem value={rating}>{rating}{rating != "All" && "+"}</MenuItem>
                        })}
                    </Select>
                </FormControl>

            </div>
            <div className='filter-item'>

                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Years</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={year}
                        label="Rating"
                        onChange={handleYearChange}
                    >
                        <MenuItem value={"All"}>All</MenuItem>
                        {years.map(year => {
                            return <MenuItem value={year}>{year}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </div>
        </div>
    );
};

export default Filters;
