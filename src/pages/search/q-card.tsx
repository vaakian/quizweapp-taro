import Taro, { useState } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { AtSearchBar, AtCard } from 'taro-ui';
import * as services from '../../services';
import { Question } from '../../types';

const QCard: Taro.FC<{ question: Question }> = (props: { question: Question }) => {
  const hadleAddMark = qid => {
    return () => services.addMark({ qid })
  }
  const { question } = props;
  return (
    <View>
      <View>{question.title}</View>
      <View>{question.A}</View>
      <View>{question.B}</View>
      <View>{question.C}</View>
      <View>{question.D}</View>
      <View onClick={hadleAddMark(question.qid)}>{question.answer}</View>
    </View>
  )
}

QCard.defaultProps = {
  question: { title: '', A: '', B: '', C: '', D: '', answer: '', qid: 0 }
}

export default QCard;