import { atom } from 'recoil';

export const A04_0003_04 = atom({
  key: 'A04000304',
  default: {
    p01: {
      answer: '',
      solution: ['12+12+12+12', '12+12+12+12=48', '12×4', '4×12', '12×4=48', '4×12=48'],
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer1: {
        // 첫번째 답안
        value: '',
        isCorrect: false,
      },
      answer2: {
        // 첫번째 줄 1의 자리
        value: '',
        isCorrect: false,
      },
      answer3: {
        // 첫번째 줄 10의 자리
        value: '',
        isCorrect: false,
      },
      answer4: {
        // 두번째 줄 1의 자리
        value: '',
        isCorrect: false,
      },
      answer5: {
        // 두번째 줄 10의 자리
        value: '',
        isCorrect: false,
      },
      solution2: '0', // 첫번째 줄 1의 자리
      solution3: '4', // 첫번째 줄 10의 자리
      solution4: '8', // 두번째 줄 1의 자리
      solution5: '4', // 두번째 줄 10의 자리
      isCorrect: false,
      isSubmitted: false,
      isBlueClick: false,
    },
    p03: {
      answer1: '',
      answer2: '',
      answer3: '',
      solution1: ['12', '4'],
      solution2: ['4', '12'],
      solution3: '48',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
