import { atom } from 'recoil';

export const C01_0007_10 = atom<TC01000710>({
  key: 'C01_0007_10',
  default: {
    P01: {
      answer: ['', ''],
      solution: ['963-294=669', '669'],
      isCorrectInput: [false, false],
      isCorrect: false,
      isSubmitted: false,
      commentary: '(학교 도서관에 있는 동화책 수)-(버리거나 무료로 나눠 준 동화책 수)=963-294=669(권)',
    },
    P02: {
      answer: [
        {
          aSideId: '',
          bSideId: '',
          isCorrect: false,
        },
        {
          aSideId: '',
          bSideId: '',
          isCorrect: false,
        },
      ],
      isSubmitted: false,
      isCorrect: false,
      solution: [
        {
          aSideId: 'aItem1',
          bSideId: 'bItem3',
        },
        {
          aSideId: 'aItem2',
          bSideId: 'bItem1',
        },
      ],
    },
    P03: {
      value1: '',
      value2: '',
      answer1: ['803-467=336', '803-467'],
      answer2: '336',
      isCorrect1: false,
      isCorrect2: false,
      isSubmitted: false,
      isCorrect: false,
      commentary:
        '차가 가장 큰 뺄셈식을 만들려면 가장 큰 수에서 가장 작은 수를 빼야 합니다. 가장 큰 수는 803이고 가장 작은 수는 467이므로 803-467=336입니다.',
    },
  },
});

type TC01000710 = {
  P01: {
    answer: string[];
    solution: string[];
    isCorrectInput: boolean[];
    isCorrect: boolean;
    isSubmitted: boolean;
    commentary: string;
  };
  P02: {
    answer: {
      aSideId: string;
      bSideId: string;
      isCorrect?: boolean;
    }[];
    isSubmitted: boolean;
    isCorrect: boolean;
    solution: { aSideId: string; bSideId: string }[];
  };
  P03: {
    value1: string;
    value2: string;
    answer1: string[];
    answer2: string;
    isCorrect1: boolean;
    isCorrect2: boolean;
    isSubmitted: boolean;
    isCorrect: boolean;
    commentary: string;
  };
};
