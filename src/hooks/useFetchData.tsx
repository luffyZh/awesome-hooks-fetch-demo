import { useState, useEffect, useRef } from 'react';
import request, { IRequestOptions, IResponseData } from '../utils/request';

interface IFetchResData {
  data: any;
  loading: boolean;
  error: any;
}

function useFetchData(url: string, options?: IRequestOptions): IFetchResData {
  // 如果是一个通用的 fetchData，那么使用any是没办法的，如果只是针对list，any可以替换为 IUserListResStruct
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  /**
   * 如果请求失败了，自动 fallback 上一次成功的结果，避免出现空列表
   * 针对分页类列表的优化
   */
  const [fallback, setFallback] = useState<any>(null);
  /**
   * 超时或者页面销毁/路由跳转，取消请求
   */
  const abortControlerRef = useRef<AbortController>();

  function destory() {
    setData(null);
    setLoading(false);
    setError(null);
    setFallback(null);
    abortControlerRef.current && abortControlerRef.current.abort();
  }

  useEffect(() => {
    setLoading(true);
    abortControlerRef.current = new AbortController();
    request(url, options || {}, abortControlerRef.current).then(res => {
      const { success, message, data } = res as IResponseData;
      if (!success) {
        console.log('Error Msg: ', message);
        throw new Error(message);
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

  return { loading, data, error };
}
 
export default useFetchData;
