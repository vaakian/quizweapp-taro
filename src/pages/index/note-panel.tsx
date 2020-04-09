import Taro, { useState } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtFloatLayout, AtTextarea } from 'taro-ui';
import { Question } from 'src/types';


interface OwnProps {
  isOpened: boolean,
  onClose: () => void,
  question: Question
}

const NotePanel: Taro.FC<OwnProps> = (props: OwnProps) => {
  const [note, setNote] = useState<string>('');
  return (
    <View>
      <AtFloatLayout
        scrollTop={100}
        title='添加笔记'
        isOpened={props.isOpened}
        onClose={props.onClose}>
        <AtTextarea
          fixed
          value={note}
          onChange={(event) => setNote(event.detail.value)}
          height={300}
          placeholder='点击输入笔记'
        >

        </AtTextarea>
      </AtFloatLayout>
    </View>
  );
}


export default NotePanel;