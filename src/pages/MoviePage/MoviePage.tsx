import { RouteComponentProps } from '@reach/router';
import { useNavigate } from '@reach/router';
import { useEffect, useState } from 'react';
import { getMovieInfo } from './moviepage.api';
import { MovieDetails } from '../../components';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import StarIcon from '@material-ui/icons/Star';
import './MoviePage.css';

interface MovieProps extends RouteComponentProps {
  movieId?: string;
}

const MoviePage: React.FC<MovieProps> = ({ movieId }) => {
  const [movie, setMovie] = useState<any | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieInfo = async () => {
      const movieInfo = await getMovieInfo(movieId);
      setMovie(movieInfo);
    };
    fetchMovieInfo();
    return () => {};
  }, []);

  return (
    <>
      {movie != null ? (
        <>
          <div
            className="container__movieInfo__image"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
      url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            }}
          >
            <div className="container__movieInfo__image-content">
              <button
                className="button__movieInfo__back"
                onClick={() => {
                  navigate('/', { replace: true });
                }}
              >
                <ArrowBackIcon />
                Homepage
              </button>
              <h1>{movie.title}</h1>
              <div className="container__movieInfo__rating">
                <StarIcon className="movieInfo__rating-icon" />
                <h2>{movie.vote_average}/10</h2>
              </div>
              <a
                className="btn__movieInfo__book btn-grad"
                href="https://www.cathaycineplexes.com.sg/"
                target="_blank"
                rel="noreferrer"
              >
                Book Now
              </a>
            </div>
          </div>
          <div className="container">
            <MovieDetails
              languages={movie.spoken_languages}
              genres={movie.genres}
              runtime={movie.runtime}
              synopsis={movie.overview}
              tagline={movie.tagline}
            />
          </div>
        </>
      ) : (
        <div>No Movie</div>
      )}
    </>
  );
};

export default MoviePage;
