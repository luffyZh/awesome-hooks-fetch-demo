import fetch from 'isomorphic-unfetch';
import qs from 'query-string';
import { message } from 'antd';
import { filterObject } from './methods';

export enum EHttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

type ICustomRequestError = {
  status: number;
  statusText: string;
  url: string;
}

/**
 * 错误处理
 * @param err 
 * @param abortController 
 */
function dealErrToast(err: Error & ICustomRequestError, abortController?: AbortController) {
  switch(err.status) {
    case 408: {
      abortController && abortController.abort();
      (typeof window !== 'undefined') && message.error(err.statusText);
      break;
    }
    default: {
      console.log(err);
      break;
    }
  }
}

/**
 * @description: 声明请求头header的类型
 */
interface IHeaderConfig {
  Accept?: string;
  'Content-Type': string;
  [propName: string]: any;
}

export interface IResponseData {
  code: number;
  data: any;
  message: string;
}

interface IAnyMap { 
  [propName: string]: any;
}

export interface IRequestOptions {
  headers?: IHeaderConfig;
  signal?: AbortSignal;
  method?: EHttpMethods;
  query?: IAnyMap;
  params?: IAnyMap;
  data?: IAnyMap;
  body?: string;
  timeout?: number;
  credentials?: 'include' | 'same-origin';
  mode?: 'cors' | 'same-origin';
  cache?: 'no-cache' | 'default' | 'force-cache';
}

/**
  * Http request
  * @param url request URL
  * @param options request options
  */
interface IHttpInterface {
  request<T = IResponseData>(url: string, options?: IRequestOptions): Promise<T>;
}

const CAN_SEND_METHOD = ['POST', 'PUT', 'PATCH', 'DELETE'];

class Http implements IHttpInterface {
  public async request<T>(url: string, options?: IRequestOptions, abortController?: AbortController): Promise<T> {
    const opts: IRequestOptions = Object.assign({
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json'
      },
      credentials: 'include',
      timeout: 10000,
      mode: 'cors',
      cache: 'no-cache'
    }, options);

    abortController && (opts.signal = abortController.signal);

    if (opts && opts.query) {
      url += `${url.includes('?') ? '&' : '?'}${qs.stringify(
        filterObject(opts.query, Boolean),
      )}`;
    }

    const canSend = opts && opts.method && CAN_SEND_METHOD.includes(opts.method);

    if (canSend && opts.data) {
      opts.body = JSON.stringify(filterObject(opts.data, Boolean));
      opts.headers && Reflect.set(opts.headers, 'Content-Type', 'application/json');
    }

    console.log('Request Opts: ', opts);

    try {
      const res = await Promise.race([
        fetch(url, opts),
        new Promise<any>((_, reject) => {
          setTimeout(() => {
            return reject({ status: 408, statusText: '请求超时，请稍后重试', url });
          }, opts.timeout);
        }),
      ]);
      const result = await res.json();
      return result;
    } catch (e) {
      dealErrToast(e, abortController);
      return e;
    }
  }
}

const { request } = new Http();

export { request as default };