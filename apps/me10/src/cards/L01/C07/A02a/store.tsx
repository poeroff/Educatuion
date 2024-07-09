import { userSubmissionType } from '@maidt-cntn/api';
import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import { atom } from 'recoil';

export { getDialogText } from '../A02/store';

export const L01C07A02a = atom({
  key: 'L01C07A02a',
  default: {
    p01: {
      answer: ['', ''],
      solution: ['a stress ball', 'a Band-Aid'],
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer: ['', ''],
      solution: ['an eraser', 'a mirror'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

export const HeaderInfo: TMainHeaderInfoTypes = {
  headerPattern: 'icon',
  iconType:'readAndWrite'
};

export const getQuestionInfo = (isSubmitted: boolean, isCorrect: boolean): IQuestionProps => {
  return {
    type: 'text',
    text: '본문을 읽고, 선생님의 질문에 각 학생의 대답을 써 봅시다.',
    mark: getMarking(isSubmitted, isCorrect),
  };
};

export const getUserSubmissionStore = (value: string[], isCorrect?: boolean): userSubmissionType[] => {
  return [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: value,
          isAnswer: true,
          isCorrect: isCorrect,
        },
      ],
    },
  ];
};
