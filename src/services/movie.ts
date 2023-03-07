import { IMovie } from "../components/Movie/Movie";
import { get } from "./api";

export interface IMovieService {
  getLastMovie: () => Promise<IMovie>;
}

interface MovieResponse {
  original_title: string;
  overview: string;
}

async function getLastMovie() {
  const data = await get<MovieResponse>("movie/latest");

  return {
    title: data?.original_title,
    overview: data?.overview,
  };
}

export const MovieService: IMovieService = {
  getLastMovie,
};
