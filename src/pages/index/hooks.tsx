import { useState, useEffect } from "@tarojs/taro";
import { UPDATE_USERINFO } from '../../store/constants';
import { useDispatch } from "@tarojs/redux";
import * as services from '../../services';
import { Question } from '../../types';
export const useLogin = () => {
  const dispatch = useDispatch();
  return new Promise((resolve, reject) => {
    useEffect(() => {
      services.login()
        .then(loginRes => {
          services.updateUserInfo()
            .then(userInfo => {
              dispatch({ type: UPDATE_USERINFO, payload: userInfo });
              resolve(loginRes);
            }).catch(loginErr => {
              reject(loginErr);
            })
        })
    }, []);
  })
}

export const useQuestion = () => {
  const [questions, setQuestions] = useState<Array<Question>>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [optionStyles, setOptionStyles] = useState<Array<string>>([]);
  const [userAnswers, setUserAnswers] = useState<Array<string>>([]);
  const rand = (options: services.QuestionOptions) => {
    // 清空选项颜色

    
    // 初始化索引

    services.randQuestion(options)
      .then(({ statusCode, data }) => {
        if (statusCode === 200) {
          if (data.length !== 0) { // 抽到题了
            setQuestions(data);
            setUserAnswers(new Array(data.length));
            setOptionStyles([]);
            setCurrentIndex(0);
          } else {
            Taro.showToast({ title: '您好像没有收藏该类题目，一题都没有抽到哦！', duration: 1300, icon: 'none' });
          }
        }
      });
  }
  const handleChoose = (activeOption: string) => {
    // 切换题目， 且没有答案
    if (!activeOption) {
      setOptionStyles([]);
      return;
    }
    // 保存答案
    let tempUserAnswer = userAnswers;
    tempUserAnswer[currentIndex] = activeOption;
    setUserAnswers(tempUserAnswer);

    // 设置style
    let styles = ['', '', '', ''];
    const alpArr = ['A', 'B', 'C', 'D'];
    styles[alpArr.indexOf(activeOption)] = (activeOption === questions[currentIndex].answer ? 'right' : 'wrong');
    setOptionStyles(styles);
  }
  // currentIndex 题目切换的时候，检查一次用户答案，设置style
  useEffect(() => {
    handleChoose(userAnswers[currentIndex]);
  }, [currentIndex]);

  return {
    current: questions[currentIndex],
    optionStyles,
    progressPercent: Math.floor((currentIndex + 1) / questions.length * 100),
    rand,
    next: () => {
      if (currentIndex < questions.length - 1) {

        setCurrentIndex(currentIndex + 1);
      }
    },
    last: () => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    },
    handleAddMark: () => {
      if (questions.length === 0) return;
      const { qid } = questions[currentIndex];
      services.addMark({ qid });
    },
    handleAddExclude: () => {
      if (questions.length === 0) return;
      const { qid } = questions[currentIndex];
      services.addExclude({ qid });
    },
    // score: {
    //   rate: 
    // }
    handleChoose
  };
}