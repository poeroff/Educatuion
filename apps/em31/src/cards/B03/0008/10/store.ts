import { atom } from 'recoil';

export const B03000810Atom = atom({
  key: 'B03000810',
  default: {
    p02: {
      answer: '',
      solution: 'frequency',
      isCorrect: false,
      isSubmitted: false,
      isInit: false,
    },
    p03: {
      answer: '',
      solution: '6',
      isCorrect: false,
      isSubmitted: false,
    },
    p04: {
      answer: '',
      solution: 'quotient',
      isCorrect: false,
      isSubmitted: false,
      isInit: false,
    },
    p05: {
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      answer5: '',
      answer6: '',
      solution1: '6',
      solution2: '6',
      solution3: '4',
      solution4: '8',
      solution5: '8',
      solution6: '3',
      isCorrect: false,
      isSubmitted: false,
    },
    p06: {
      answer: '',
      solution: 'decrease',
      isCorrect: false,
      isSubmitted: false,
      isInit: false,
    },
    p07: {
      answer: [
        { group1ItemId: '', group2ItemId: '' },
        { group1ItemId: '', group2ItemId: '' },
        { group1ItemId: '', group2ItemId: '' },
      ],
      solution: [
        { group1ItemId: 'time_period', group2ItemId: 'dividend' },
        { group1ItemId: 'interval', group2ItemId: 'divisor' },
        { group1ItemId: 'meal_frequency', group2ItemId: 'quotient' },
      ],
      isCorrect: false,
      isSubmitted: false,
    },
    p08: {
      answer: '',
      solution: 'decrease',
      isCorrect: false,
      isSubmitted: false,
      isInit: false,
    },
    p09: {
      canvasDataURL: '',
      isSubmitted: false,
    },
  },
});
