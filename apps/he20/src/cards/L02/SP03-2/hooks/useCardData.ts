import { userSubmissionType, inputDatasType, inputDataType } from '@maidt-cntn/api';
import { useRecoilState } from 'recoil';
import { L02Sp03_2 } from '../store';

export default (pageNum: string) => {
  const [cardDatas, setCardDatas] = useRecoilState(L02Sp03_2);

  const changeCardData = (value: string | string[] | number | number[], isSubmitted?: boolean, isCorrect?: boolean) => {
    setCardDatas(prev => ({
      ...prev,
      [pageNum]: {
        ...prev[pageNum],
        userAnswer: value,
        isSubmitted: isSubmitted || false,
        isAllCollect: isCorrect || false,
      },
    }));
  };

  const getDefaultSubmission = (): userSubmissionType[] => {
    const userAnswer = cardDatas[pageNum].userAnswer;
    let answerType: inputDataType;
    switch (typeof userAnswer) {
      case 'string':
        answerType = 'TEXT';
        break;
      case 'number':
        answerType = 'NUMBER';
        break;
      default:
        answerType = 'TEXT_LIST';
        break;
    }
    return [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: answerType,
            value: userAnswer,
          },
        ],
      },
    ];
  };

  const makeUserSubmission = (value: string | string[] | number | number[], isCorrect?: boolean) => {
    let answerType: inputDataType;
    switch (typeof value) {
      case 'string':
        answerType = 'TEXT';
        break;
      case 'number':
        answerType = 'NUMBER';
        break;
      default:
        answerType = 'TEXT_LIST';
        break;
    }

    const inputData: inputDatasType[] = [
      {
        subKey: 1,
        type: answerType,
        value: value,
        isCorrect: isCorrect || false,
      },
    ];
    return [
      {
        mainKey: 1,
        inputData: inputData,
        isSubmitted: true,
      },
    ];
  };

  const cardData = cardDatas[pageNum];

  return { cardData, changeCardData, getDefaultSubmission, makeUserSubmission };
};
