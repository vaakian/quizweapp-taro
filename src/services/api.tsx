import Taro, { interceptors } from '@tarojs/taro';
const defualtOptions = {
  method: 'GET',
  header: {
    'content-type': 'application/json',
  }
}

const BASE_URI = 'http://tenss.cn:8989/';
interface Option {
  data: object,
  url: string
}
type ApiMethod = (options: Option) => Taro.request.requestTask<any>;

// 生成一个请求器,带token
const GenRequester = (method: string) => {
  return (options) => {
    let token = Taro.getStorageSync('token');
    return Taro.request({
      ...defualtOptions,
      ...options,
      method,
      header: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }
}

// 拦截器

const interceptor = function (chain) {
  // 请求前
  const requestParams = chain.requestParams
  // const { method, data, url } = requestParams
  // console.log(`http ${method || 'GET'} --> ${url} data: `, data)
  Taro.showToast({
    title: '数据加载中',
    icon: 'loading',
    duration: 20000,
    mask: true,
    
  });
  return chain.proceed(requestParams)
    .then(res => {
      // 请求成功后
      // console.log(`http <-- ${url} result:`, res)
      Taro.hideToast();
      return res
    }).catch(err => {
      console.log({err});
      Taro.hideToast();
    })
}
Taro.addInterceptor(interceptor);
export const get: ApiMethod = GenRequester('GET');
export const put: ApiMethod = GenRequester('PUT');
export const del: ApiMethod = GenRequester('DELETE');
export const post: ApiMethod = GenRequester('POST');

export const URLS = {
  LOGIN: BASE_URI + 'login',
  QUESTION: BASE_URI + 'question',
  MARK: BASE_URI + 'mark',
  EXCLUDE: BASE_URI + 'exclude',
  NOTE: BASE_URI + 'note',
  COMMENT: BASE_URI + 'comment',
  SCHOOL: BASE_URI + 'school',
  SEARCH: BASE_URI + 'search'
}