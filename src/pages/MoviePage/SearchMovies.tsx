import { useState, useRef, useCallback } from 'react';
import { RouteComponentProps } from '@reach/router';
import useSearchMovies from '../../hooks/useSearchMovies';
import { MovieCards } from '../../components';
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
          {movies.map((movie: any, index: number) => {
            if (movies.length === index + 1) {
              return (
                // <div ref={lastMovieElementRef} key={movie.id}>
                //   {movie.title}
                // </div>
                <div ref={lastMovieElementRef}>
                  <MovieCards
                    moviesData={movies}
                    error={null}
                    loading={loading}
                  />
                </div>
              );
            }
            return (
              <div>
                <MovieCards
                  moviesData={movies}
                  error={null}
                  loading={loading}
                />
              </div>
            );
          })}
        </div>

        <div>{loading && 'loading'}</div>
        <div>{error && 'Error...'}</div>
        <br />
      </div>
    </>
  );
};

export default SearchMovies;
