import './index.scss';
import Taro, { useState, useReachBottom, useReducer, useEffect } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { AtSearchBar, AtCard } from 'taro-ui';
import { Question } from '../../types';
import * as services from '../../services';
import QCard from './q-card';
interface SearchOption {
  kw: string,
  limit, currentPage: number
}
const constants = {
  SET_RESULT: 'SET_RESULT',
  APPEND_RESULT: 'APPEND_RESULT',
  SET_KW: 'SET_KW',
  SET_PAGE: 'SET_PAGE'
}
const Search: Taro.FC = () => {
  const { option, result, onSearch, onNextPage, state, dispatch } = useSearch();
  const handleKwChange = value => {
    dispatch({ type: constants.SET_KW, payload: value })
  }
  const handleActionClick = () => {
    onSearch(1, true)
    dispatch({ type: constants.SET_PAGE, payload: 1 })
  }

  return (
    <View>
      {/* 搜索输入框、按钮 */}
      <AtSearchBar
        placeholder='输入试题关键字'
        value={option.kw}
        onChange={handleKwChange}
        onConfirm={handleActionClick}
        onActionClick={handleActionClick} />
      <View>
        {/* 搜索结果 */}
        {result.map((question, index) => <QCard question={question} />)}
        {/* 加载更多按钮 */}
        {result.length >= 15 && <Button onClick={onNextPage}>加载更多{option.currentPage}</Button>}
      </View>
    </View>
  )
}
function useSearch() {
  const [kwChangeFlag, setKwChangeFlag] = useState<Boolean>(false)
  function searchReducer(state: { option: SearchOption, result: Array<Question> }, action: { payload?: any, type: string }) {
    switch (action.type) {
      case constants.SET_KW:
        return {
          ...state,
          option: {
            ...state.option,
            kw: action.payload
          }
        }
      case constants.SET_PAGE:
        return {
          ...state,
          option: {
            ...state.option,
            currentPage: state.option.kw === '' ? 1 : action.payload
          }
        }
      case constants.SET_RESULT:
        return {
          ...state,
          result: action.payload
        }
      case constants.APPEND_RESULT:
        return {
          ...state,
          result: [...state.result, ...action.payload]
        }
      default:
        return state
    }
  }
  const [state, dispatch] = useReducer(searchReducer,
    { option: { kw: '', currentPage: 1, limit: 15 }, result: [] })
  const { option, result } = state
  const onSearch = (page: number, from: boolean = false) => {
    const { kw, limit } = option
    option.kw && services.searchQuestion({ kw, limit, page })
      .then(({ statusCode, data }) => {
        if (statusCode === 200) {
          dispatch({
            // kw更改 or 点击搜索按钮
            type: kwChangeFlag || from ? constants.SET_RESULT : constants.APPEND_RESULT,
            payload: data
          })
          if (data.length === 0) {
            dispatch({ type: constants.SET_PAGE, payload: option.currentPage })
            Taro.showToast({
              title: '没有更多结果了',
              icon: 'none',
              duration: 1200
            });
          }
          setKwChangeFlag(false)
        }
      });
  }
  // A: kw变，
  const onNextPage = () => {
    onSearch(option.currentPage + 1)
    dispatch(({ type: constants.SET_PAGE, payload: option.currentPage + 1 }))
  }

  useEffect(() => {
    dispatch({ type: constants.SET_PAGE, payload: 0 })
    setKwChangeFlag(true)
  }, [option.kw]);
  return {
    option,
    result,
    onSearch,
    onNextPage,
    state,
    dispatch
  }
}
Search.config = {
  navigationBarTitleText: '试题搜索'
}
export default Search;