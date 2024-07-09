import { userSubmissionType } from '@maidt-cntn/api';
import { EChipButtonType, IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L03C05A02 = atom<ICardType>({
  key: 'L03C05A02',
  default: {
    p01: {
      data: [
        { contents: '(1) Sound always moves in a direct line.', userAnswer: EChipButtonType.EMPTY },
        { contents: '(2) Sound waves travel through the air.', userAnswer: EChipButtonType.EMPTY },
        { contents: '(3) Sound waves do not affect each other when they overlap.', userAnswer: EChipButtonType.EMPTY },
        { contents: '(4) We can make sounds louder by adding certain sounds.', userAnswer: EChipButtonType.EMPTY },
      ],
      solution: [EChipButtonType.FALSE, EChipButtonType.TRUE, EChipButtonType.FALSE, EChipButtonType.TRUE],
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer: '',
      isSubmitted: false,
      audioData: {},
    },
  },
});

export const getUserSubmissionStoreP01 = (values: IP01Submission[], isCorrect: boolean): userSubmissionType[] => {
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

export const getUserSubmissionStoreP02 = (value: string): userSubmissionType[] => {
  return [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: value,
        },
        {
          subKey: 2,
          type: 'AUDIO',
          value: {},
        },
      ],
    },
  ];
};

interface ICardType {
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    answer?: string;
    data?: Array<IP01Data>;
    solution?: Array<EChipButtonType>;
    isCorrect?: boolean;
  };
}

interface IP01Submission {
  userAnswer: EChipButtonType;
  isCorrect: boolean;
}

interface IP01Data {
  contents: string;
  userAnswer: EChipButtonType;
}
