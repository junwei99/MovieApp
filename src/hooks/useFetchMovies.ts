import { useState, useEffect } from 'react';
import axios from 'axios';
import Api from '../common/api';
import { MoviesResponse } from '../common/types';

const useFetchMovies = (dataUrl: string, pageNumber: number) => {
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  // useEffect(() => {
  //   let isMounted = true;
  //   const source = axios.CancelToken.source();

  //   const fetchData = async (url: string) => {
  //     setLoading(true);
  //     try {
  //       const response = await Api.get<MoviesResponse>(url);
  //       if (isMounted) {
  //         setData(response.data);
  //         setError(null);
  //       }
  //     } catch (err) {
  //       if (isMounted) {
  //         setError(err.message);
  //         console.log(err.message);
  //         setData([]);
  //       }
  //     } finally {
  //       isMounted && setLoading(false);
  //     }
  //   };

  //   fetchData(dataUrl);

  //   const cleanUp = () => {
  //     isMounted = false;
  //     source.cancel();
  //   };

  //   return cleanUp;
  // }, [dataUrl]);
  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel: any;
    axios({
      method: 'GET',
      url: dataUrl,
      params: { page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setData((prevMovies: any) => {
          return Array.from(new Set([...prevMovies, ...res.data.results]));
        });
        setHasMore(res.data.results.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
        console.log(e.message);
      });
    return () => cancel();
  }, [pageNumber, dataUrl]);

  return { data, error, loading, hasMore };
};

export default useFetchMovies;
