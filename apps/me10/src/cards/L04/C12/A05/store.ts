import { atom } from 'recoil';
import { userSubmissionType } from '@maidt-cntn/api';
export const L04C12A05 = atom<TL04C12A05>({
  key: 'L04C12A05',
  default: {
    p01: {
      answer: -1,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer: '',
      solution: `We bought a cake, a
      birthday hat, and nice
      presents for him.`,
      isSubmitted: false,
    },
  },
});

type TL04C12A05 = {
  p01: {
    answer: number;
    solution: number;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p02: {
    answer: string;
    solution: string;
    isSubmitted: boolean;
  };
};

export const getUserSubmissionStore = (value: number | string, isCorrect: boolean): userSubmissionType[] => {
  return [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: typeof value === 'number' ? 'NUMBER' : 'TEXT',
          value: value,
          isAnswer: true,
          isCorrect: isCorrect,
        },
      ],
    },
  ];
};
