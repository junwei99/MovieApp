import { useState, useEffect } from 'react';
import axios from 'axios';
import Api from '../common/api';
import { MoviesResponse } from '../common/types';

const useFetchMovies = (dataUrl: string) => {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    const fetchData = async (url: string) => {
      setLoading(true);
      try {
        const response = await Api.get<MoviesResponse>(url);
        if (isMounted) {
          setData(response.data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          console.log(err.message);
          setData([]);
        }
      } finally {
        isMounted && setLoading(false);
      }
    };

    fetchData(dataUrl);

    const cleanUp = () => {
      isMounted = false;
      source.cancel();
    };

    return cleanUp;
  }, [dataUrl]);

  return { data, error, loading };
};

export default useFetchMovies;
