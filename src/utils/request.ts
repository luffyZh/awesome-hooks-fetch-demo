import fetch from 'isomorphic-unfetch';
import qs from 'query-string';
import { message } from 'antd';
import { filterObject } from './methods';

enum EHttpMethods {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  patch = 'PATCH',
  delete = 'DELETE'
}

type ICustomRequestError = {
  status: number;
  statusText: string;
  url: string;
}

function dealErrToast(err: Error & ICustomRequestError) {
  switch(err.status) {
    case 408: {
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
  data: any;
  message: string;
  success: boolean;
}

export interface IRequestOptions {
  headers?: IHeaderConfig;
  signal?: any;
  method?: EHttpMethods;
  query?: Record<string, any>;
  data?: Record<string, any>;
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
  request<R>(url: string, options?: IRequestOptions): Promise<R>;
}

const CAN_SEND_METHOD = ['POST', 'PUT', 'PATCH', 'DELETE'];

class Http implements IHttpInterface {
  public request<IResponseData>(url: string, options?: IRequestOptions, abortControler?: AbortController): Promise<IResponseData> {
    const opts: IRequestOptions = Object.assign({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json'
      },
      credentials: 'include',
      timeout: 5000,
      mode: 'cors',
      cache: 'no-cache'
    }, options);

    abortControler && (opts.signal = abortControler.signal);

    if (opts && opts.query) {
      url += `${url.includes('?') ? '&' : '?'}${qs.stringify(
        filterObject(opts.query, Boolean),
      )}`;
    }

    const canSend = opts && opts.method && CAN_SEND_METHOD.includes(opts.method);

    if (canSend && opts.data) {
      opts.body = qs.stringify(filterObject(opts.data, Boolean));
      opts.headers && Reflect.set(opts.headers, 'Content-Type', 'application/json');
    }

    console.log('Request Opts: ', opts);

    return Promise.race([
      fetch(url, opts),
      new Promise<any>((_, reject) => {
        setTimeout(() => {
          abortControler && abortControler.abort();
          return reject({ status: 408, statusText: '请求超时，请稍后重试', url })
        }, opts.timeout);
      }),
    ]).then<IResponseData>(res => res.json())
      .catch(e => {
        dealErrToast(e);
        return e;
      });
  }
}

const { request } = new Http();

export { request as default };