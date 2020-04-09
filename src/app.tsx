import Taro, { Component, Config } from '@tarojs/taro'
import Index from './pages/index'
import './app.scss'
import { Provider } from '@tarojs/redux';
import rootStore from './store';
import * as services from './services';
import { updateUserInfo, updateAuthStatus } from './store/actions';

class App extends Component {
  state: { loginStatus: 'success' | 'pending' | 'fail' }
  constructor() {
    super();
    this.state = {
      loginStatus: 'pending'
    }
  }
  componentDidMount() {
    // Taro.checkSession()
    Taro.$store = rootStore;
    services.login()
      .then(loginRes => {
        console.log({ loginRes });
        if (loginRes.errMsg === 'login:ok') {
          services.updateUserInfo()
            .then(userInfo => {
              // login就已经有openid了，此处获取更详细的信息，如果没有就请求用户授权
              rootStore.dispatch(updateUserInfo(userInfo));
              rootStore.dispatch(updateAuthStatus('success'));
            }).catch(loginErr => {
              // getUserInfo:fail scope unauthorized 授权失败
              rootStore.dispatch(updateAuthStatus('fail'));
              console.log({ loginErr });
            })
        }
      })
  }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={rootStore}>
        <Index />
      </Provider>
    )
  }
  config: Config = {
    pages: [
      'pages/search/search',
      'pages/index/index',
      'pages/user/user',
      'pages/bill/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#333',
      selectedColor: '#1296db',
      backgroundColor: '#f8f8f8',
      borderStyle: 'black',
      list: [
        {
          pagePath: 'pages/index/index',
          iconPath: 'assets/home.png',
          selectedIconPath: 'assets/active-home.png',
          text: '首页'
        },
        {
          pagePath: 'pages/search/search',
          iconPath: 'assets/user.png',
          selectedIconPath: 'assets/active-user.png',
          text: '试题搜索'
        },
        {
          pagePath: 'pages/bill/index',
          iconPath: 'assets/order.png',
          selectedIconPath: 'assets/active-order.png',
          text: '高考信息'
        },
        {
          pagePath: 'pages/user/user',
          iconPath: 'assets/user.png',
          selectedIconPath: 'assets/active-user.png',
          text: '个人中心'
        }
      ]
    }
  }
}

Taro.render(<App />, document.getElementById('app'))
