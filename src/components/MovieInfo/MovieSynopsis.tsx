interface MovieSynopsisProps {
  synopsis: string;
  tagline: string;
}

const MovieSynopsis: React.FC<MovieSynopsisProps> = ({ synopsis, tagline }) => {
  return (
    <>
      <h3>Synopsis</h3>
      {tagline !== '' ? <h4>"{tagline}"</h4> : ''}
      <p>{synopsis}</p>
    </>
  );
};

export default MovieSynopsis;
