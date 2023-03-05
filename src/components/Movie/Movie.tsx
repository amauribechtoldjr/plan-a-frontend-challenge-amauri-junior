import { useEffect, useState } from "react";
import { MovieService } from "../../services/movie";
import s from "./Movie.module.scss";

export interface IMovie {
  title: string;
  overview: string;
}

const Movie = () => {
  const [movie, setMovie] = useState<IMovie>();

  useEffect(() => {
    MovieService.getLastMovie().then((movie) => {
      setMovie(movie);
    });
  }, []);

  return (
    <section className={s["container"]}>
      {!movie && <span>Loading...</span>}
      {movie && (
        <div className={s["movie-container"]}>
          <div className={s["info-container"]}>
            <span className={s["movie-label"]}>Title</span>
            <span className={s["movie-value"]}>{movie?.title}</span>
          </div>
          <div className={s["info-container"]}>
            <span className={s["movie-label"]}>Overview</span>
            <span className={s["movie-value"]}>{movie?.overview}</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default Movie;
