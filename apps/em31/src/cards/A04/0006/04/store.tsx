import { atom } from 'recoil';

export const A04000604_Atom = atom({
  key: 'A04000604',
  default: {
    p03: {
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
      solution3: '2', // 두번째 줄 1의 자리
      solution4: '9', // 두번째 줄 10의 자리
      solution5: '1', // 두번째 줄 100의 자리
      isCorrect: false,
      isSubmitted: false,
      isBlueClick: false,
    },
  },
});
