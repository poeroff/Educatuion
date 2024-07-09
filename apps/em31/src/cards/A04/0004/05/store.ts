import { atom } from 'recoil';

export const A04_0004_05 = atom({
  key: 'A04000405',
  default: {
    p01: {
      answer1: {
        value: '',
        isCorrect: false,
      },
      answer2: {
        // 첫번째 줄 10의 자리
        value: '',
        isCorrect: false,
      },
      answer3: {
        // 첫번째 줄 100의 자리
        value: '',
        isCorrect: false,
      },
      solution2: '1', // 100의 자리
      solution3: '2', // 10의 자리
      isCorrect: false,
      isSubmitted: false,
      isBlueClick: false,
    },
    p02: {
      canvasDataURL: '',
      isSubmitted: false,
    },
  },
});
