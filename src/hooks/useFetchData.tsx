import { useState, useEffect } from 'react';
import request, { IRequestOptions, IResponseData } from '../utils/request';

interface IFetchResData {
  data: any;
  loading: boolean;
  error: any;
  fallback?: any;
}

function useFetchData(url: string, options?: IRequestOptions, useFallback?: boolean): IFetchResData {
  // 如果是一个通用的 fetchData，那么使用any是没办法的，如果只是针对list，any可以替换为 IUserListResStruct
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  /**
   * 如果请求失败了，自动fallback上一次成功的结果，避免出现空列表
   * 针对分页类列表的优化
   */
  const [fallback, setFallback] = useState<any>(null);

  function destory() {
    setData(null);
    setLoading(false);
    setError(null);
    setFallback(null);
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
      // 如果有数据
      if (data && useFallback) {
        setFallback(res);
      }
    }).catch(err => {
      setError(err);
    }).finally(() => {
      setLoading(false);
    });

    return () => destory();
  }, [url, JSON.stringify(options)]);

  return { loading, data, error, fallback }
}
 
export default useFetchData;
