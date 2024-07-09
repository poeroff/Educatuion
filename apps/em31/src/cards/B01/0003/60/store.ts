import { atom } from 'recoil';
// export const B01000360 = atom<TB01000360>({
export const B01000360 = atom({
  key: 'B01000360',
  default: {
    p01: {
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      answer5: '',
      answer6: '',
      answer7: '',
      answer8: '',
      solution1: '4',
      solution2: '4',
      solution3: '2',
      solution4: '6',
      solution5: '7',
      solution6: '6',
      solution7: '729',
      solution8: '893',
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer1: '',
      solution1: '858',
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer1: '',
      answer2: '',
      solution1: '453+107=560',
      solution2: '560',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});


