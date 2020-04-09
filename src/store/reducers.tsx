import * as types from './constants';
import * as services from '../services';
import { UserInfo } from '../types';

interface GeneralAction {
  payload: any,
  type: string
}
const initialUserInfo: UserInfo = {
  openid: '',
  avatarUrl: '',
  gender: NaN,
  nickname: '',
  token: ''
}
export const userInfoReducer = (state: UserInfo = initialUserInfo, action: GeneralAction) => {
  switch (action.type) {
    case types.UPDATE_USERINFO:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
}

const initialSettingOption: services.QuestionOptions = {
  limit: 15,
  mark: 0
}


export const settingReducer = (state: services.QuestionOptions = initialSettingOption, action: GeneralAction) => {
  switch (action.type) {
    case types.UPDATE_SETTING:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
}

export const authReducer = (state = { status: 'pending' }, action: GeneralAction) => {
  console.log({ action });
  switch (action.type) {
    case types.UPDATE_AUTH_STATUS:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
}