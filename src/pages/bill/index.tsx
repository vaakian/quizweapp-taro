import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components';
import './index.scss'
import { AtAvatar } from 'taro-ui';

const Bill: Taro.FC = () => {
  return (
    <View>
      <View
        style={{
          backgroundColor: '#f8f8f8'
        }}
        className='at-row at-row__justify--center'
      >
        <AtAvatar
          circle
          openData={{ type: 'userAvatarUrl' }}
        />
      </View>
    </View>
  )
}

Bill.config = {
  navigationBarTitleText: '高考资讯',
  navigationBarBackgroundColor: '#f8f8f8'
}

export default Bill;