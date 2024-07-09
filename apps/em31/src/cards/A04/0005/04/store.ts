import { atom } from 'recoil';

export const A04_0005_04 = atom({
  key: 'A04000504',
  default: {
    P01: {
      answer: '',
      solution: ['17×4', '4×17', '17×4=68', '4×17=67'],
      isCorrect: false,
      isSubmitted: false,
    },
    P02: {
      answer: '',
      solution: [''],
      isCorrect: false,
      isSubmitted: false,
    },
    P03: {
      answer1: {
        value: '',
        isCorrect: false,
      },
      answer2: {
        value: '',
        isCorrect: false,
      },
      answer3: {
        // 첫번째 줄 1의 자리
        value: '',
        isCorrect: false,
      },
      answer4: {
        // 첫번째 줄 10의 자리
        value: '',
        isCorrect: false,
      },
      answer5: {
        // 첫번째 줄 100의 자리
        value: '',
        isCorrect: false,
      },
      answer6: {
        // 두번째 줄 1의 자리
        value: '',
        isCorrect: false,
      },
      solution3: '0', // 첫번째 줄 1의 자리
      solution4: '4', // 첫번째 줄 10의 자리
      solution5: '8', // 두번째 줄 1의 자리
      solution6: '6', // 두번째 줄 10의 자리
      isCorrect: false,
      isSubmitted: false,
      isBlueClick: false,
    },
    P04: {
      answer1: '',
      answer2: '',
      answer3: '',
      solution1: ['17', '4'],
      solution2: ['4', '17'],
      solution3: '68',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
