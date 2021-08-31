import Api from '../../common/api';

const getMovieInfo = async (movieId: string | undefined) => {
  const response = await Api.get<any>(
    `/3/movie/${movieId}?api_key=328c283cd27bd1877d9080ccb1604c91`
  );
  return response.data;
};

export { getMovieInfo };
