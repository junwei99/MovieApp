import { RouteComponentProps } from '@reach/router';
import { MovieCards, SortNavbar } from '../../components';
import useFetchMovies from '../../hooks/useFetchMovies';
import { useNavigate } from '@reach/router';

interface HomeProps extends RouteComponentProps {
  url: string;
}

const Homepage: React.FC<HomeProps> = ({ url }) => {
  const { data, error, loading } = useFetchMovies(url);
  const navigate = useNavigate();

  return (
    <>
      <div className="container">
        <h1>Movie App</h1>
        <br />
        <div className="search-bar">
          <input
            type="text"
            onFocus={() => navigate('/searchmovies', { replace: true })}
            placeholder="Search for movies"
          />
        </div>
        <SortNavbar />
        <br />
        {data != null && (
          <MovieCards
            moviesData={data.results}
            error={error}
            loading={loading}
          />
        )}
      </div>
    </>
  );
};

export default Homepage;
