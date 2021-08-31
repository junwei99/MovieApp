import { useNavigate } from '@reach/router';
import './MovieCard.css';
import noPosterImage from '../../../assets/images/NoPosterImage.png';
import StarIcon from '@material-ui/icons/Star';

interface Props {
  id: number;
  title: string;
  popularity: number;
  rating: number;
  image: string;
}

const MovieCard: React.FC<Props> = ({
  id,
  title,
  popularity,
  rating,
  image,
}) => {
  const navigate = useNavigate();
  const posterImage = () => {
    if (image === '' || image === 'https://image.tmdb.org/t/p/originalnull') {
      return noPosterImage;
    } else {
      return image;
    }
  };

  return (
    <>
      {/* <div
        className="card__movie"
        style={{
          backgroundImage: `linear-gradient(
          to bottom,
          rgba(245, 246, 252, 0.1),
          rgba(43, 7, 34, 0.85) 60%
        ),
        
        url(${image} )`,
        }}
      >
        <h2>{title}</h2>
        <p>Popularity : {popularity}</p>
      </div> */}
      <div
        className="card__movie"
        onClick={() => {
          navigate(`/movie/${id}`, { replace: true });
        }}
      >
        <div className="container__card__poster">
          <img
            className="image__card__poster"
            src={posterImage()}
            alt="movie"
          ></img>
        </div>
        <div className="container__card__info">
          <h3>{title}</h3>
          <div className="container__card__info-line">
            <StarIcon style={{ color: 'var(--paragraph-content)' }} />
            <p>{rating}/10</p>
          </div>
          <p>
            <span>Popularity: </span> {popularity}
          </p>
        </div>
      </div>

      <br />
    </>
  );
};

export default MovieCard;
