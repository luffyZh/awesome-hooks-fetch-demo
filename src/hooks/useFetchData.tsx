/**
 * /hooks/useFetchData.tsx
 */
import { useState, useEffect, useRef, MutableRefObject } from 'react';
import { nanoid } from 'nanoid';
import request, { IRequestOptions, IResponseData } from '../utils/request';

interface IFetchResData<T> {
  data: T | undefined;
  loading: boolean;
  error: any;
  ref: MutableRefObject<any>;
}

function useFetchData<T = any>(url: string, options?: IRequestOptions): IFetchResData<T> {
  // 如果是一个通用的 fetchData，那么使用any是没办法的，如果只是针对list，any可以替换为 IUserListResStruct
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [reload, setReload] = useState<string>('');
  const ref = useRef<any>({});
  /**
   * 超时或者页面销毁/路由跳转，取消请求
   */
  const abortControllerRef = useRef<AbortController>();

  function destory() {
    setData(undefined);
    setLoading(false);
    setError(null);
    abortControllerRef.current && abortControllerRef.current.abort();
  }

  useEffect(() => {
    ref.current.reload = function() {
      ref.current.hash = nanoid();
      setReload(ref.current.hash);
      console.log('数据更新了，参数：', JSON.stringify(options));
    }
    setLoading(true);
    abortControllerRef.current = new AbortController();
    request(url, options || {}, abortControllerRef.current).then(res => {
      const { code, message, data } = res as IResponseData;
      if (code !== 0) {
        console.log('Error Msg: ', message);
        throw new Error(message);
      }
      setData(data);
    }).catch(err => {
      setError(err);
    }).finally(() => {
      setLoading(false);
    });

    return () => destory();
  }, [url, JSON.stringify(options), reload]);

  return { loading, data, error, ref };
}
 
export default useFetchData;
