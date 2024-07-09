import { atom } from 'recoil';

export const B02_0005_30 = atom<TB02000530>({
  key: 'B02000530',
  default: {
    P01: {
      answer: {
        value1: '',
        value2: '',
      },
      solution: { value1: ['ㄱㅁㄴ', 'ㄴㅁㄱ'], value2: ['ㄷㅁㄹ', 'ㄹㅁㄷ'] },
      commentary: '삼각자의 직각 부분을 이용하여 직각을 찾습니다.',
      isCorrect: false,
      isSubmitted: false,
    },
    P02: {
      answer: ['', '', '', ''],
      solution: ['', 'O', '', 'O'],
      commentary: `시계의 긴바늘과 짧은바늘이 이루는 작은 쪽의 각이 직각인 시각은 3시와 9 시입니다.`,
      isCorrect: false,
      isSubmitted: false,
    },
    P03: {
      answer: ['', '', '', '', ''],
      solution: ['O', '', '', 'O', ''],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TB02000530 = {
  P01: {
    answer: { [key: string]: string };
    solution: { [key: string]: string[] };
    commentary: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  P02: {
    answer: string[];
    solution: string[];
    commentary: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  P03: {
    answer: string[];
    solution: string[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
