import { atom } from 'recoil';

export const L03C04A02 = atom({
  key: 'L03C04A02',
  default: {
    p02: {
      answer1: '',
      answer2: '',
      answer3: '',
      solution1: 'seeds',
      solution2: 'leaves',
      solution3: 'water',
      isSubmitted: false,
    },
    p03: {
      answer: '' as unknown as number,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
