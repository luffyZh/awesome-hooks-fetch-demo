
import fetch from 'isomorphic-unfetch';
import qs from 'query-string';
import { filterObject } from './methods';

enum EHttpMethods {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  patch = 'PATCH',
  delete = 'DELETE'
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
  method?: EHttpMethods; 
  query?: Record<string, any>;
  data?: Record<string, any>;
  body?: string;
  headers?: IHeaderConfig;
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
  public request<IResponseData>(url: string, options?: IRequestOptions): Promise<IResponseData> {
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

    console.log('Request Opts: ', opts);

    if (opts && opts.query) {
      url += `${url.includes('?') ? '&' : '?'}${qs.stringify(
        filterObject(opts.query, Boolean),
      )}`;
    }

    const canSend = opts && opts.method && CAN_SEND_METHOD.includes(opts.method);

    if (canSend && opts.data) {
      opts.body = qs.stringify(filterObject(opts.data, Boolean));
    }

    return fetch(url, opts)
      .then<IResponseData>((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }
}

export default (new Http()).request;