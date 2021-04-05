import { useState, useEffect } from 'react';
import request, { IRequestOptions, IResponseData } from '../utils/request';

interface IFetchResData {
  data: any;
  loading: boolean;
  error: any;
}

function useFetchData(url: string, options?: IRequestOptions): IFetchResData {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  function destory() {
    setData(null);
    setLoading(false);
    setError(null);
  }

  useEffect(() => {
    setLoading(true);
    request(url, options).then(res => {
      const { success, message, data } = res as IResponseData;
      if (!success) {
        console.log('Error Msg: ', message);
      }
      setData(data);
      setLoading(false);
    }).catch(err => {
      setError(err);
    }).finally(() => {
      setLoading(false);
    });

    return () => destory();
  }, [url, JSON.stringify(options)]);

  return { loading, data, error }
}
 
export default useFetchData;
