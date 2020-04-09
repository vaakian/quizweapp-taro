import Taro, { useState, useEffect } from '@tarojs/taro';
import { useSelector, useDispatch } from '@tarojs/redux';
import { View, Text, Button } from '@tarojs/components';
import QuestionCard from './question-card';
import ScorePanel from './score-panel';
import Setting from './setting-panel';
import { AtButton, AtProgress, AtFab, AtModal, AtModalContent, AtModalHeader, AtModalAction } from 'taro-ui';
import { useQuestion } from './hooks';
import { updateAuthStatus } from '../../store/actions';
import './index.scss';
import NotePanel from './note-panel';
const Index: Taro.FC = () => {
  const dispatch = useDispatch();
  const question = useQuestion();
  const { optionStyles, handleChoose, current, rand, last, next, handleAddMark, handleAddExclude } = question;
  const { userInfo, setting, auth } = useSelector(state => state);
  const [showSetting, setShowSetting] = useState<boolean>(false);
  const [showScorePanel, setShowScorePanel] = useState<boolean>(false);
  const [showNotePanel, setShowNotePanel] = useState<boolean>(true);
  const handleGetUserInfo = (event) => {
    if (event.detail.errMsg === 'getUserInfo:ok') {
      // 重新渲染
      dispatch(updateAuthStatus('success'));
      Taro.showToast({ title: '登录成功', duration: 3000 });
    } else {
      dispatch(updateAuthStatus('fail'));
      Taro.showToast({ title: '用户授权失败', duration: 3000, icon: 'none' });
    }
  }
  // 根据auth状态 进行动作
  useEffect(() => {
    if (auth.status === 'success') rand(setting);
  }, [auth.status])

  // 操作图标
  const ToolsIcons = (
    <View className='at-row at-row__justify--center'>
      <View className='margin-5'>
        <AtFab size='small' onClick={handleAddMark}>
          <Text className='at-fab__icon at-icon at-icon-star-2'></Text>
        </AtFab>
      </View>
      <View className='margin-5'>
        <AtFab size='small' onClick={handleAddExclude}>
          <Text className='at-fab__icon at-icon at-icon-blocked'></Text>
        </AtFab>
      </View>
      <View className='margin-5'>
        <AtFab size='small' onClick={() => setShowNotePanel(true)}>
          <Text className='at-fab__icon at-icon at-icon-edit'></Text>
        </AtFab>
      </View>
      <View className='margin-5'>
        <AtFab size='small' onClick={() => setShowSetting(true)}>
          <Text className='at-fab__icon at-icon at-icon-settings'></Text>
        </AtFab>
      </View>
    </View>
  );
  // 切换题操作按钮 
  const SwitchQuestion = (
    <View className='operat-panel at-row at-row--wrap at-row__justify--center at-row__align--center'>
      <View className='at-col-6'>
        <AtButton className='half--circle' type='primary' onClick={last}>上一题</AtButton>
      </View>
      <View className='at-col-6'>
        <AtButton className='half--circle' type='primary' onClick={next}>下一题</AtButton>
      </View>
    </View>
  );
  // 最后一题提示框
  const [showEnding, setShowEnding] = useState<boolean>(false);
  const Ending = (
    <AtModal isOpened={showEnding}>
      <AtModalHeader>答题完毕</AtModalHeader>
      <AtModalContent>
        做题完毕，本次得分99
      </AtModalContent>
      <AtModalAction>
        <Button>返回查看</Button>
        <Button>重新抽题</Button>
      </AtModalAction>
    </AtModal>
  )
  //首屏加载
  if (auth.status === 'pending') return (
    <View>
      <View>初始化中……</View>
      {/* {SwitchQuestion} */}
    </View>

  );
  // 授权失败、拒绝
  if (auth.status === 'fail') return (
    <View>
      <View>请授权登录后使用本小程序</View>
      <AtButton
        type='primary'
        onGetUserInfo={handleGetUserInfo}
        openType='getUserInfo'>
        授权登录
      </AtButton>
    </View>
  );

  // 授权成功
  return (
    <View>
      {/* 答题进度 */}
      <AtProgress percent={question.progressPercent} />
      {/* 答题卡片 */}
      {current &&
        <QuestionCard
          question={current}
          optionStyles={optionStyles}
          handleChoose={handleChoose} />}

      {/* 工具图标 */ ToolsIcons}

      {/* 切题按钮 */ SwitchQuestion}

      {/* 抽题设置 */}
      <Setting rand={rand} isOpened={showSetting} onClose={() => setShowSetting(false)} />
      {/* 成绩面板 */}
      <ScorePanel isOpened={showScorePanel} onClose={() => setShowScorePanel(false)} />
      {/* 添加笔记 */}
      <NotePanel isOpened={showNotePanel} onClose={() => setShowNotePanel(false)} />
      {/* 最后一题提示框 */ Ending}
    </View>
  )
}

Index.config = {
  navigationBarTitleText: '首页'
}
export default Index;