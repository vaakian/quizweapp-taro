import Taro from '@tarojs/taro';
import { Question } from '../../types';
import { View } from '@tarojs/components';
import './question-card.scss';
interface OwnProps {
  question: Question,
  optionStyles: Array<any>,
  handleChoose: Function
}
// ownprops给父组件提供提示
const QuestionCard: Taro.FC<OwnProps> = (props: OwnProps) => {
  const { optionStyles, question, handleChoose } = props;
  console.log({ optionStyles })
  return (
    <View className="self_q-card">
      {/* 题目展示 */}
      <View>
        <View className="self_title">{question.title}</View>
        {['A', 'B', 'C', 'D'].map((option, index) =>
          <View
            onClick={() => handleChoose(option)}
            className={`self_option self_${(optionStyles[index] || '')}`}>
            {question[option]}
          </View>
        )}
      </View>
    </View>
  )
}
QuestionCard.defaultProps = {
  question: { title: '', A: '', B: '', C: '', D: '', answer: '', qid: 0 }
}

export default QuestionCard;