import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { setMoviesYearOption } from '../../redux/actions';
import { getMoviesList } from './MoviesList.service';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';
import { stableSort, getComparator, parseTableData } from '../../utils';
import "./MovieList.style.css";


const headCells = [
    {
        id: 'title',
        numeric: false,
        disablePadding: true,
        label: 'Title',
    },
    {
        id: 'overview',
        numeric: false,
        disablePadding: false,
        label: 'Overview',
    },
    {
        id: 'genre',
        numeric: false,
        disablePadding: false,
        label: 'Genre',
    },
    {
        id: 'rating',
        numeric: true,
        disablePadding: false,
        label: 'Rating',
    },
    {
        id: 'popularity',
        numeric: false,
        disablePadding: false,
        label: 'Popularity',
    },
    {
        id: 'release_date',
        numeric: false,
        disablePadding: false,
        label: 'Release Date',
    },
];


const MoviesList = (props) => {
    const { genres, rating, year, multiGenre } = props
    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const [rowData, setRowData] = useState([])
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('rating');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const createSortHandler = (property) => (event) => {
        handleRequestSort(event, property);
    };

    const visibleRows = React.useMemo(
        () =>
            stableSort(rowData, getComparator(order, orderBy)),
        [order, orderBy, rowData],
    );


    useEffect(async () => {
        setIsLoading(true)
        const response = await getMoviesList();
        setMovies(response?.results)
        dispatch(setMoviesYearOption(response?.results || []))
        const tableData = parseTableData(response?.results, genres)
        setRowData(tableData)
        setIsLoading(false)
    }, [])

    useEffect(() => {
        if (movies.length > 0) {

            const moviesByFilters = movies.filter(movie => {
                if (rating === "All" || movie.vote_average > rating) {
                    if (year === "All" || new Date(movie.release_date).getFullYear() === year) {
                        if (multiGenre.includes(-1) || multiGenre.every((genreId) => movie.genre_ids.includes(genreId))) {

                            return true;
                        }
                    }
                }
                return false;
            })
            const tableData = parseTableData(moviesByFilters, genres)
            setRowData(tableData)

        }
    }, [rating, year, multiGenre])

    return (
        <div className='table-container'>
            {isLoading ?
                <div>Loading ...</div> :
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {headCells.map((headCell) => (
                                    <TableCell
                                        key={headCell.id}
                                        align={headCell.numeric ? 'right' : 'left'}
                                        padding={headCell.disablePadding ? 'none' : 'normal'}
                                        sortDirection={orderBy === headCell.id ? order : false}
                                    >
                                        <TableSortLabel
                                            active={orderBy === headCell.id}
                                            direction={orderBy === headCell.id ? order : 'asc'}
                                            onClick={createSortHandler(headCell.id)}
                                        >
                                            {headCell.label}
                                            {orderBy === headCell.id ? (
                                                <Box component="span" sx={visuallyHidden}>
                                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                </Box>
                                            ) : null}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {visibleRows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >

                                    <TableCell align="left">{row.title}</TableCell>
                                    <TableCell align="left">{row.overview}</TableCell>
                                    <TableCell align="left">{row.genres}</TableCell>
                                    <TableCell align="left">{row.rating}</TableCell>
                                    <TableCell align="left">{row.popularity}</TableCell>
                                    <TableCell align="left">{row.release_date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }

        </div>
    );
};

export default MoviesList;
