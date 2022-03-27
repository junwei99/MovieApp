import { useState, useEffect, useRef, useCallback } from "react";
import { RouteComponentProps } from "@reach/router";
import { MovieCard, SortNavbar } from "../../components";
import useFetchMovies from "../../hooks/useFetchMovies";
import { useNavigate } from "@reach/router";
import HomepageLayout from "../MoviePage/layouts/HomepageLayout";
import { CircularProgress } from "@material-ui/core";
import "./Homepage.css";

interface HomeProps extends RouteComponentProps {
  url: string;
}

const Homepage: React.FC<HomeProps> = ({ url }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, error, loading, hasMore } = useFetchMovies(url, pageNumber);
  const observer = useRef<any>();
  const lastMovieElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber: number) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  const navigate = useNavigate();

  useEffect(() => {
    setPageNumber(1);
  }, [url]);

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
    <div className="container__homepage_movies">
      {data.length > 0 &&
        data.map((movie: any, index: number) => {
          if (data.length === index + 1) {
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
                      ? "https://image.tmdb.org/t/p/original" +
                        movie.poster_path
                      : "https://image.tmdb.org/t/p/original" +
                        movie.backdrop_path
                  }
                  releaseDate={movie.release_date}
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
                    ? "https://image.tmdb.org/t/p/original" + movie.poster_path
                    : "https://image.tmdb.org/t/p/original" +
                      movie.backdrop_path
                }
                releaseDate={movie.release_date}
              />
            </div>
          );
        })}
      {data.length === 0 && loading !== true && (
        <div className="container__msg">No Movies found</div>
      )}
      {loading && (
        <div className="container__msg">
          <CircularProgress className="circular-progress" />
        </div>
      )}
      {error && <div className="container__msg">Error...</div>}
    </div>
  );
};

export default Homepage;
