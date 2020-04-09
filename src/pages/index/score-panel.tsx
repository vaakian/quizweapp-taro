import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtFloatLayout } from 'taro-ui';


interface OwnProps {
  isOpened: boolean,
  onClose: () => void
}

const ScorePanel: Taro.FC<OwnProps> = (props: OwnProps) => {

  return (
    <View>
      <AtFloatLayout
        title='答题成绩'
        isOpened={props.isOpened}
        onClose={props.onClose}>
        ScorePanel.
      </AtFloatLayout>
    </View>
  );
}


export default ScorePanel;