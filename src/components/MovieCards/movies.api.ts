import Api from '../../common/api';
import { MoviesResponse } from '../../common/types';
// import { useAxiosFetch } from '../../hooks/useAxiosFetch';

const getMoviesList = async () => {
  const response = await Api.get<MoviesResponse>(
    '/3/discover/movie?api_key=328c283cd27bd1877d9080ccb1604c91&primary_release_date.lte=2016-12-31&sort_by=release_date.desc&page=1'
  );
  return response.data;
};

export { getMoviesList };
