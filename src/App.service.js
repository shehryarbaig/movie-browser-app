import axios from "axios"

export const getGenreList = async () => {
    try {
        const { data } = await axios.get(
          "https://api.themoviedb.org/3/genre/movie/list",
          {
            params: {
              api_key: "e0667f190f96e02c5d50724410e38a6f",
            },
          }
        );
        return data;
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
}
