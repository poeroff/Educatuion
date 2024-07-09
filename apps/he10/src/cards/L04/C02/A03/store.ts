import { userSubmissionType } from '@maidt-cntn/api';
import { EChipButtonType } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L04C02A03 = atom({
  key: 'L04C02A03',
  default: {
    p01: {
      data: [
        { userAnswer: '', isCorrect: false, solution: 'May' },
        { userAnswer: '', isCorrect: false, solution: 'ecosystem' },
        { userAnswer: '', isCorrect: false, solution: 'food' },
      ],
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      data: [
        { contents: '(1) The sea level is increasing on the whole.', userAnswer: EChipButtonType.EMPTY },
        { contents: '(2) Tuvalu’s land may disappear into the ocean within fifty years.', userAnswer: EChipButtonType.EMPTY },
        { contents: '(3) The sea level problem can affect people’s culture.', userAnswer: EChipButtonType.EMPTY },
      ],
      solution: [EChipButtonType.TRUE, EChipButtonType.FALSE, EChipButtonType.TRUE],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

export const getUserSubmissionStore01 = (values: string[], isCorrect = [false, false, false]): userSubmissionType[] => {
  return [
    {
      mainKey: 1,
      inputData: values.map((value, index) => ({
        subKey: index + 1,
        type: 'TEXT',
        value: value,
        isAnswer: true,
        isCorrect: isCorrect[index],
      })),
      isCorrect: isCorrect.every(data => data === true),
    },
  ];
};

export const getUserSubmissionStoreP03 = (values: IP03Submission[], isCorrect: boolean): userSubmissionType[] => {
  return [
    {
      mainKey: 1,
      inputData: values.map((value, index = 1) => ({
        subKey: index + 1,
        type: 'TEXT',
        value: value.userAnswer,
        isAnswer: true,
        isCorrect: value.isCorrect,
      })),
      isCorrect: isCorrect,
    },
  ];
};

interface IP03Submission {
  userAnswer: EChipButtonType;
  isCorrect: boolean;
}
