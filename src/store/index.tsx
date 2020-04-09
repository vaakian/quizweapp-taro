import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { userInfoReducer, settingReducer, authReducer } from './reducers';
const middlewares = [
  thunkMiddleware,
  createLogger()
]
const rootReducer = combineReducers({ userInfo: userInfoReducer, setting: settingReducer, auth: authReducer });
const rootStore = createStore(rootReducer, applyMiddleware(...middlewares));
console.log(rootStore);
export default rootStore;