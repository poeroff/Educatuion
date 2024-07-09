import { atom } from 'recoil';

export const A01_0003_05 = atom<TA01000305>({
  key: 'A01000305',
  default: {
    p01: {
      answer: ['', '', ''],
      solution: ['3', '4', '2'],
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      solution: ['일의 자리끼리, 십의 자리끼리, 백의 자리끼리 더합니다.', '각 자리의 합이 두 자리 수이면 윗자리 계산에 1을 더합니다.'],
      canvasDataURL: '',
      isSubmitted: false,
    },
  },
});

type TA01000305 = {
  p01: {
    answer: string[];
    solution: string[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p02: {
    solution: string[];
    canvasDataURL: string;
    isSubmitted: boolean;
  };
};
