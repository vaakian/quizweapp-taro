import Taro, { useState } from '@tarojs/taro';
import { View, Picker } from '@tarojs/components';
import * as services from '../../services';
import { useSelector, useDispatch } from '@tarojs/redux';
import { AtFloatLayout, AtSlider, AtSwitch, AtButton, AtDivider } from 'taro-ui';
// import '../../node_modules/taro-ui/dist/style/index.scss'; 
import '../../../node_modules/taro-ui/dist/style/components/flex.scss'
import { updateSetting } from '../../store/actions';
interface OwnProps {
  rand: (rand: services.QuestionOptions) => void,
  isOpened: boolean,
  onClose: any
}
const Setting: Taro.FC<OwnProps> = (props: OwnProps) => {
  const { setting } = useSelector(state => state);
  const [limit, setLimit] = useState<number>(setting.limit);
  const [mark, setMark] = useState<number>(setting.mark);
  const [type, setType] = useState<number>(setting.type || 0);
  // const { auth } = useSelector(state => state);
  // 页面控制逻辑

  const questionTypes = ['全部随机', '计算机网络', '计算机硬件', '程序设计', '进制转换', '信息安全'];
  const dispatch = useDispatch();
  // 点击关闭、取消：未保存，恢复状态
  const handleCancel = () => {
    props.onClose();
    setLimit(setting.limit);
    setMark(setting.mark);
    setType(setting.type || 0);
  }
  const handleApply = () => {
    props.onClose();
    const payload = { limit, mark, type };
    dispatch(updateSetting(setting));
    props.rand(payload);
  }
  return (
    <View>
      <AtFloatLayout
        isOpened={props.isOpened}
        title='抽题设置'
        onClose={props.onClose}
      >

        {/* 抽题类型 */}
        <AtDivider fontColor='#ccc' content={'选择题型'} />
        <Picker mode='selector' range={questionTypes} onChange={(event) => setType(event.detail.value)}>
          <View className='picker'>
            <AtButton type='secondary'>当前选择:{questionTypes[type]}</AtButton>
          </View>
        </Picker>
        {/* 抽题数量 */}
        <AtDivider fontColor='#ccc' content={`设置题量 [${limit}]`} />
        <AtSlider
          value={limit}
          step={5}
          min={15}
          max={100}
          onChange={event => setLimit(event.value)}
          onChanging={event => Taro.showToast({ title: `${event.value}`, icon: 'none', duration: 300 })} />
        {/* 抽收藏 */}
        <AtDivider fontColor='#ccc' content={'其它选项'} />
        <AtSwitch
          title='只从收藏抽题'
          checked={mark === 1}
          onChange={value => setMark(value ? 1 : 0)} />
        {/* 考试模式 */}
        {/* <AtSwitch
          title='考试模式(开发中'
          border={false}
          disabled
          onChange={value => null} /> */}
        {/* 取消 - 确定 - 如果 */}
        <View className='at-row at-row__justify--around'>
          <View className='at-col at-col-5'>
            <AtButton onClick={handleCancel} type='primary'>取消</AtButton>
          </View>
          <View className='at-col at-col-5'>
            <AtButton onClick={handleApply} type='primary'>确定</AtButton>
          </View>
        </View>
      </AtFloatLayout>
    </View>
  )
}


export default Setting;