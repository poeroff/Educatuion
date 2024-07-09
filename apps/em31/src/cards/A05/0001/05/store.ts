import { atom } from 'recoil';

export const A05_0001_05 = atom({
  key: 'A05000105',
  default: {
    p02: {
      answer1: '',
      answer2: '',
      answer3: '',
      solution1: '9',
      solution2: '1',
      solution3: '60',
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer1: ['', '', ''],
      answer2: ['', '', ''],
      solution1: ['3', '11', '8'],
      solution2: ['35', '27', '5'],
      isCorrect: [false, false, false, false, false],
      isAllCorrect: false,
      isSubmitted: false,
    },
    p04: {
      answer1: '',
      answer2: '',
      answer3: '',
      solution1: '60',
      solution2: '2',
      solution3: '30',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
