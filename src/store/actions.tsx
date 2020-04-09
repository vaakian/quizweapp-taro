import * as types from '../types';
import * as constants from './constants';
import * as services from '../services';

export const updateUserInfo = (userInfo: types.UserInfo) => {
  return {
    type: constants.UPDATE_USERINFO,
    payload: userInfo
  }
}

export const updateSetting = (setting: services.QuestionOptions) => {
  return {
    type: constants.UPDATE_SETTING,
    payload: setting
  }
}

export const updateAuthStatus = (status: 'pending' | 'success' | 'fail') => {
  return {
    type: constants.UPDATE_AUTH_STATUS,
    payload: { status }
  }
}