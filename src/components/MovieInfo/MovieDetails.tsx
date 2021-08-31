import './MovieDetails.css';

interface MovieDetailsProps {
  languages: object[];
  genres: object[];
  runtime: number;
  synopsis: string;
  tagline: string;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({
  languages,
  genres,
  runtime,
  synopsis,
  tagline,
}) => {
  const convertMinToHrAndMin = (time: number): string => {
    const Hours = Math.floor(time / 60);
    const minutes = time % 60;
    return `${Hours}h ${minutes}m`;
  };

  return (
    <div className="container__movieInfo__details">
      <div className="container__movieInfo__details-top">
        <div className="container__movieInfo__details-item">
          <p>
            <strong>{convertMinToHrAndMin(runtime)}</strong>
          </p>
          <br />
          <br />
          <div className="movieInfo__details-item__text">
            {genres.length > 0 ? (
              genres.map((genre: any) => {
                return (
                  <div className="movieInfo__details-item__genre">
                    <p>{genre.name}</p>
                  </div>
                );
              })
            ) : (
              <p>Not Stated</p>
            )}{' '}
          </div>
          <h3>Synopsis</h3>
          {tagline !== '' ? <h4>"{tagline}"</h4> : ''}
          <p>{synopsis}</p>
        </div>
      </div>
      <br />
      <div className="container__movieInfo__details-bottom">
        <div className="container__movieInfo__details-item">
          <h3>Languages</h3>
          <div className="movieInfo__details-item__text">
            {languages.length > 0 ? (
              languages.map((lang: any) => {
                return (
                  <div className="movieInfo__details-item__lang">
                    <p>{lang.english_name}</p>
                  </div>
                );
              })
            ) : (
              <p>Not Stated</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
