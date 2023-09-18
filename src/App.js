import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MoviesList from "./components/MoviesList";
import { getGenreList } from "./App.service";
import Filters from "./components/Filters";

function App() {
  const [genres, setGenres] = useState([])
  const [isGenreLoading, setIsGenreLoading] = useState(true);
  const [rating, setRating] = useState("All");
  const [year, setYear] = useState("All");
  const [multiGenre, setMultiGenre] = useState([-1]);

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleGenreChange = (event) => {
    const {
      target: { value },
    } = event;
    setMultiGenre(value)
  };

  useEffect(async () => {
    setIsGenreLoading(true)
    const response = await getGenreList();
    setGenres(response?.genres)
    setIsGenreLoading(false)
  }, [])

  return (
    <div>
      <h1>Movie Browser</h1>
      <Filters rating={rating} year={year} multiGenre={multiGenre}
        handleRatingChange={handleRatingChange}
        handleYearChange={handleYearChange} 
        handleGenreChange={handleGenreChange}
        genres={genres}/>
      {!isGenreLoading && <MoviesList genres={genres} rating={rating} year={year} multiGenre={multiGenre} />}
    </div>
  );
}

export default App;
