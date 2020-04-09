import { Config } from '@tarojs/taro'

const config: Config = {
  pages: [
    'pages/index/index',
    'pages/user/index',
    'pages/bill/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    custom: true,
    color: '#333',
    selectedColor: '#f03d37',
    backgroundColor: '#fff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页'
      },
      {
        pagePath: 'pages/bill/index',
        text: '订单'
      },
      {
        pagePath: 'pages/user/index',
        text: '用户'
      },
    ]
  }
}

export default config;