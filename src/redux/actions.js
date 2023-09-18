export const FETCH_MOVIES_SUCCESS = "FETCH_MOVIES_SUCCESS";
export const SET_MOVIES_YEARS_OPTIONS = "SET_MOVIES_YEARS_OPTIONS";

export const setMoviesYearOption = (movies) => ({
  type: SET_MOVIES_YEARS_OPTIONS,
  payload: movies,
});
