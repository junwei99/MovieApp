import { useEffect, useState } from 'react';
import MovieCard from './MovieCard/MovieCard';

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
  const [movies, setMovies] = useState<any | null>(null);

  useEffect(() => {
    const fetchMoviesList = () => {
      if (moviesData !== null) {
        setMovies(moviesData);
      }
    };
    fetchMoviesList();

    return () => {};
  }, [moviesData]);

  const getImage = (posterPath: string): boolean => {
    let posterExist: boolean = true;

    if ((posterPath = '')) {
      posterExist = false;
    } else {
      posterExist = true;
    }

    return posterExist;
  };

  return (
    <>
      <div className="container__movies">
        {movies != null && movies.length > 0 ? (
          movies.map((movie: any) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              popularity={movie.popularity}
              rating={movie.vote_average}
              image={
                getImage(movie.poster_path)
                  ? 'https://image.tmdb.org/t/p/original' + movie.poster_path
                  : 'https://image.tmdb.org/t/p/original' + movie.backdrop_path
              }
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
