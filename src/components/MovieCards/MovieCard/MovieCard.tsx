import { useNavigate } from "@reach/router";
import "./MovieCard.css";
import noPosterImage from "../../../assets/images/NoPosterImage.png";
import StarIcon from "@material-ui/icons/Star";

interface Props {
  id: number;
  title: string;
  popularity: number;
  rating: number;
  image: string;
  releaseDate: string;
}

const MovieCard: React.FC<Props> = ({
  id,
  title,
  popularity,
  rating,
  image,
  releaseDate,
}) => {
  const navigate = useNavigate();
  const posterImage = () => {
    if (image === "" || image === "https://image.tmdb.org/t/p/originalnull") {
      return noPosterImage;
    } else {
      return image;
    }
  };

  const getReadableDate = (dateInput: string): string => {
    let d = new Date(dateInput);
    return d.toDateString().slice(4);
  };

  return (
    <>
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
            <StarIcon style={{ color: "#a8a032" }} />
            <p>{rating}</p>
          </div>
          <p>{getReadableDate(releaseDate)}</p>
        </div>
      </div>

      <br />
    </>
  );
};

export default MovieCard;
