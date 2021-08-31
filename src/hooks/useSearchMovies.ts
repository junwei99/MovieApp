import { useState, useEffect } from 'react';
import axios from 'axios';
import Api from '../common/api';

const useSearchMovies = (query: string, pageNumber: number) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState<any>([]);
  const [hasMore, setHasMore] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    setMovies([]);
  }, [query]);

  useEffect(() => {
    if (query === '' || query === null) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(false);
    let cancel: any;
    axios({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/search/movie?api_key=328c283cd27bd1877d9080ccb1604c91&language=en-US&include_adult=false',
      params: { query: query, page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setMovies((prevMovies: any) => {
          return Array.from(new Set([...prevMovies, ...res.data.results]));
        });
        setHasMore(res.data.results.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [query, pageNumber, firstLoad]);
  return { loading, error, movies, hasMore };
};

export default useSearchMovies;
