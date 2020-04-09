import Taro, { useState, useEffect, Component } from '@tarojs/taro';
import { AtTabBar } from 'taro-ui';
import './index.scss';

export default class CustomTabBar extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      activeTabBar: 0
    };
  }
  tabList = [
    { title: '首页', iconType: 'home', url: '/pages/index/index' },
    { title: '订单', iconType: 'shopping-cart', url: '/pages/bill/index' },
    { title: '我的', iconType: 'user', url: '/pages/user/index' },
  ];
  handleClick = index => {
    let that = this;
    Taro.switchTab({
      url: this.tabList[index].url,
      complete() {
        that.setState({
          activeTabBar: index
        });
      }
    });
  }
  render() {
    return (
      <view>
        <AtTabBar
          tabList={this.tabList}
          current={this.state.activeTabBar}
          onClick={this.handleClick}
          fixed
        />
      </view >
    )
  }


}