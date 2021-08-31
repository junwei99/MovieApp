import { useState, useRef, useCallback } from 'react';
import { RouteComponentProps } from '@reach/router';
import useSearchMovies from '../../hooks/useSearchMovies';
import { MovieCard } from '../../components';
import { useNavigate } from '@reach/router';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './SearchMovies.css';

interface SearchMoviesProps extends RouteComponentProps {}

const SearchMovies: React.FC<SearchMoviesProps> = () => {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const { loading, error, movies, hasMore } = useSearchMovies(
    query,
    pageNumber
  );
  const navigate = useNavigate();

  const observer = useRef<any>();
  const lastMovieElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  function handleSearch(e: any) {
    setQuery(e.target.value);
    setPageNumber(1);
  }

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
      {/* <input type="text" value={query} onChange={handleSearch}></input>
      <div className="container__movies__search">
        {movies.map((movie: any, index: number) => {
          if (movies.length === index + 1) {
            return (
              <div ref={lastMovieElementRef} key={movie.id}>
                {movie.title}
              </div>
            );
          }
          return <div key={movie.id}>{movie.title}</div>;
        })}
      </div>

      <div>{loading && 'loading'}</div>
      <div>{error && 'Error...'}</div> */}
      <div className="container">
        <div className="container__search__movies__title">
          <button
            className="button__movieInfo__back"
            style={{ color: 'black' }}
            onClick={() => {
              navigate('/', { replace: true });
            }}
          >
            <ArrowBackIcon />
          </button>
          <h1>Search</h1>
        </div>

        <br />
        <div className="search-bar">
          <input
            type="text"
            value={query}
            autoFocus
            onChange={handleSearch}
            placeholder="Search for movies"
          />
        </div>
        <div className="container__movies__search">
          {movies.length > 0 &&
            movies.map((movie: any, index: number) => {
              if (movies.length === index + 1) {
                return (
                  <div ref={lastMovieElementRef}>
                    <MovieCard
                      key={movie.id}
                      id={movie.id}
                      title={movie.title}
                      popularity={movie.popularity}
                      rating={movie.vote_average}
                      image={
                        getImage(movie.poster_path)
                          ? 'https://image.tmdb.org/t/p/original' +
                            movie.poster_path
                          : 'https://image.tmdb.org/t/p/original' +
                            movie.backdrop_path
                      }
                    />
                  </div>
                );
              }
              return (
                <div>
                  <MovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    popularity={movie.popularity}
                    rating={movie.vote_average}
                    image={
                      getImage(movie.poster_path)
                        ? 'https://image.tmdb.org/t/p/original' +
                          movie.poster_path
                        : 'https://image.tmdb.org/t/p/original' +
                          movie.backdrop_path
                    }
                  />
                </div>
              );
            })}
          {movies.length === 0 && loading !== true && (
            <div className="container__msg">No Movies found</div>
          )}
        </div>

        <div className="container__msg">{loading && 'LOADING ... '}</div>

        <div className="container__msg">{error && 'Error...'}</div>
        <br />
      </div>
    </>
  );
};

export default SearchMovies;
