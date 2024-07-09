import { atom } from 'recoil';

export const A03000804 = atom({
  key: 'A03000804',
  default: {
    p01: {
      number: 1,
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      number: 2,
      answer: ['', '', '', '', '', '', '', ''],
      solution: ['4', '32', '8', '32', '32', '4', '32', '8'],
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      number: 3,
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      solution1: '2',
      solution2: '9',
      solution3: '9',
      solution4: '7',
      isCorrect: false,
      isSubmitted: false,
    },
    p04: {
      number: 4,
      answer1: ['', '', '', ''],
      answer2: ['', '', '', ''],
      solution1: ['4', '9', '36', '9'],
      solution2: ['6', '8', '48', '8'],
      isCorrect: false,
      isSubmitted: false,
    },
    p05: {
      number: 5,
      isCorrect: false,
      isSubmitted: false,
    },
    P06: {
      number: 6,
      questionText: '나눗셈의 몫이 큰 것부터 차례로 기호를 써 보세요.',
      answer1: '',
      answer2: '',
      answer3: '',
      solution1: 'ㄴ',
      solution2: 'ㄱ',
      solution3: 'ㄷ',
      commentary: '2÷9=6, 27÷3=9, 30÷6=5 ➡ 9>6>5이므로 차례로 기호를 쓰면 ㉡, ㉠, ㉢입니다.',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
