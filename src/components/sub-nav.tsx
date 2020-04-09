import Taro, { useContext } from '@tarojs/taro'
import { UserContext } from '../store';
import { View, Text } from '@tarojs/components';



const SubNav = () => {
  const appName = useContext(UserContext);
  return (
    <View>
      <Text>{'appName'}</Text>
      <Text>asdasd</Text>
    </View>
  )
}

export default SubNav;