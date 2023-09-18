
import { SET_MOVIES_YEARS_OPTIONS } from "./actions";

const initialState = {
  years: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIES_YEARS_OPTIONS:
      const years = action.payload.map((movie) => new Date(movie.release_date).getFullYear());
      const uniqueYears = [...new Set(years)]
      return {
        ...state,
        years: uniqueYears,
      };

    default:
      return state;
  }
};

export default rootReducer;
