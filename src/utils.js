function createData(title, overview, genres, rating, release_date, popularity) {
  return { title, overview, genres, rating, release_date, popularity };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


export function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export const parseTableData = (moviesByFilters, genres) => {
  return moviesByFilters.map(movie => {
    const genres1 = movie.genre_ids.map((id, index) => {
      const genreText = genres.find((gen) => gen.id === id)?.name || ""
      return `${genreText}${movie.genre_ids.length - 1 === index ? "" : ","}`
    })
    const { title, overview, vote_average, release_date, popularity } = movie
    return createData(title, overview, genres1, vote_average, release_date, popularity)
  })
}
