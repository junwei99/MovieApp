// import { useEffect, useState } from 'react';
import MovieCard from "./MovieCard/MovieCard";

interface MovieCardsProps {
  moviesData: any;
  error: string | null;
  loading: boolean;
}

const MovieCards: React.FC<MovieCardsProps> = ({
  moviesData,
  error,
  loading,
}) => {
  const getImage = (posterPath: string): boolean => {
    let posterExist: boolean = true;

    if ((posterPath = "")) {
      posterExist = false;
    } else {
      posterExist = true;
    }

    return posterExist;
  };

  return (
    <>
      <div className="container__movies">
        {moviesData != null && moviesData.length > 0 ? (
          moviesData.map((movie: any) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              popularity={movie.popularity}
              rating={movie.vote_average}
              image={
                getImage(movie.poster_path)
                  ? "https://image.tmdb.org/t/p/original" + movie.poster_path
                  : "https://image.tmdb.org/t/p/original" + movie.backdrop_path
              }
              releaseDate={movie.release_date}
            />
          ))
        ) : (
          <h1>{error}</h1>
        )}
      </div>
      {/* <div>{JSON.stringify(movies)}</div> */}
    </>
  );
};

export default MovieCards;
