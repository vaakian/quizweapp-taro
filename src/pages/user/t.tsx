import Taro, { useContext, Config, useState } from '@tarojs/taro'
import './index.scss'
import { View, Text, Input, Button } from '@tarojs/components';
import { useSelector } from '@tarojs/redux';
import { AtAvatar } from 'taro-ui';


const Test: Taro.FC = () => {
  const [styles, setSetlyes] = useState<Array<any>>([]);
  const handleChoose = (activeIndex) => {
    let newStyle = ['', '', '', ''];
    // let newStyle = new Array(4); //问题出在这里
    newStyle[activeIndex] = 'active';
    setSetlyes(newStyle);
  }
  return (

    <View>
      {['A', 'B', 'C', 'D'].map((v, i) =>
        <Button onClick={() => handleChoose(i)}>{v}</Button>
      )}
      <View>真实数组：{styles.toString()}</View>
      <View>手动遍历：{styles.map((style, index) => <View>{index} {style}</View>)}</View>
      <View>
        手动访问：
        <View>0 {styles[0]}</View>
        <View>1 {styles[1]}</View>
        <View>2 {styles[2]}</View>
        <View>3 {styles[3]}</View>
      </View>
    </View>
  )
}
User.config = {
  navigationBarTitleText: '用户中心'
}

export default User;