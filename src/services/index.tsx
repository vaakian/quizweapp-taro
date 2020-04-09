import * as API from './api';
import Taro from '@tarojs/taro';
// const parseParams = (obj: object )=> {
//   let keys = Object.keys(obj);
//   keys.map(key => obj[key])
// }


export const login = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    Taro.login()
      .then(wxRes => {
        // 从微信拿到code
        if (wxRes.code) {
          // 使用code请求服务器api，若成功得到token则缓存到本地
          API.get({
            data: { code: wxRes.code },
            url: API.URLS.LOGIN
          })
            .then(apiRes => {
              // 获取到token
              apiRes.statusCode === 200 && apiRes.data.token && Taro.setStorageSync('token', apiRes.data.token);
              resolve(wxRes);
            })
            .catch(err => reject(err));
        } else {
          // 没拿到code
          reject('微信鉴权失败');
        }
      })
  });
}

export const updateUserInfo = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    Taro.getUserInfo()
      .then(wxRes => {
        API.put({
          data: { encryptedData: wxRes.encryptedData, iv: wxRes.iv },
          url: API.URLS.LOGIN
        })
          .then(apiRes => {
            // 返回微信的userInfo
            resolve(wxRes.userInfo);
          })
          .catch(err => {
            reject(err);
          })
      })
      .catch(err => reject(err));
  })
}
export interface QuestionOptions {
  limit: number,
  mark: number,
  type?: number,
}
export const randQuestion = ({ limit, type, mark }: QuestionOptions) => {
  return API.get({
    url: API.URLS.QUESTION,
    data: type ? { limit, type, mark } : { limit, mark }
  });
}

export const addMark = ({ qid }: { qid: string | number }) => {
  return API.put({
    url: API.URLS.MARK + `/${qid}`,
    data: {},
  }).then(res => {
    let msg =
      res.statusCode === 201 ? '已收藏' : `错误${res.statusCode}`;
    Taro.showToast({
      title: msg,
      icon: 'none'
    });

  })
    .catch(err => {
      Taro.showToast({
        title: '发生错误',
        icon: 'none'
      });
      console.log(err);
    });
}

export const addExclude = ({ qid }: { qid: string | number }) => {
  return API.put({
    url: API.URLS.EXCLUDE + `/${qid}`,
    data: {},
  }).then(res => {
    let msg =
      res.statusCode === 201 ? '已屏蔽，下次抽题将不再出现。' : `错误${res.statusCode}`;
    Taro.showToast({
      title: msg,
      icon: 'none'
    });

  })
    .catch(err => {
      Taro.showToast({
        title: '发生错误',
        icon: 'none'
      });
      console.log(err);
    });
}
export const addNote = ({ qid, note }: { qid: string | number, note: string }) => {
  return API.put({
    url: API.URLS.NOTE + `/${qid}`,
    data: { note },
  }).then(res => {
    let msg =
      res.statusCode === 201 ? '笔记添加成功' : `错误${res.statusCode}`;
    Taro.showToast({
      title: msg,
      icon: 'none'
    });

  })
    .catch(err => {
      Taro.showToast({
        title: '发生错误',
        icon: 'none'
      });
      console.log(err);
    });
}
export const searchQuestion = option => {
  return API.get({
    url: API.URLS.SEARCH,
    data: option
  });
}