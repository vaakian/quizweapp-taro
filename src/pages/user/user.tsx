import Taro, { useContext, Config, useState } from '@tarojs/taro'
import './index.scss'
import { View, Text, Input, Button } from '@tarojs/components';
import { useSelector } from '@tarojs/redux';
import { AtAvatar } from 'taro-ui';


const User: Taro.FC = () => {

  const { userInfo } = useSelector(state => state);
  return (
    <View className='at-row at-row--wrap at-row__justify--center'>
      <AtAvatar
        circle
        size='large'
        className='at-col'
        openData={{ type: 'userAvatarUrl' }}>
      </AtAvatar>
      <View style='text-align: center' className='at-row at-row__justify--center'>
        <Text className='at-col'>{userInfo.nickName}</Text>
      </View>
    </View>

  )
}
User.config = {
  navigationBarTitleText: '用户中心'
}

export default User;