import { IMovie } from "../components/Movie/Movie";

export interface IMovieService {
  getLastMovie: () => Promise<IMovie>;
}

async function getLastMovie() {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/latest?api_key=8a732f489f66fcfb6feee9839dc02d76"
  );

  if (response.ok) {
    const data = await response.json();

    return {
      title: data.original_title,
      overview: data.overview,
    };
  }

  throw Error("Request token api offline.");
}

export const MovieService: IMovieService = {
  getLastMovie,
};
