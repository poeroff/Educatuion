import { userSubmissionType } from '@maidt-cntn/api';
import { EChipButtonType } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L01C02A03 = atom({
  key: 'L01C02A03',
  default: {
    p03: {
      data: [
        { contents: '(1) The boy has decided what to bring to the charity market.', userAnswer: EChipButtonType.EMPTY },
        { contents: '(2) The girl will likely bake cookies to sell at the charity market.', userAnswer: EChipButtonType.EMPTY },
        { contents: '(3) The money raised will be donated to a children’s hospital.', userAnswer: EChipButtonType.EMPTY },
      ],
      solution: [EChipButtonType.FALSE, EChipButtonType.TRUE, EChipButtonType.TRUE],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

export const getUserSubmissionStore = (values: IP01Submission[], isCorrect: boolean): userSubmissionType[] => {
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

interface IP01Submission {
  userAnswer: EChipButtonType;
  isCorrect: boolean;
}
