import { atom } from 'recoil';

export const C01_0006_10 = atom({
  key: 'C01_0006_10',
  default: {
    p01: {
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: -1,
      solution1: '1',
      solution2: '3',
      solution3: '3',
      solution4: 0,
      isCorrect: false,
      isSubmitted: false,
    },
    P02: {
      answer: ['', ''],
      solution: ['834-652=182', '182'],
      isCorrectInput: [false, false],
      commentary: `(집에서 소방서까지의 거리)-(집에서 도서관까지의 거리) 
      =834-652=182 (m)`,
      isCorrect: false,
      isSubmitted: false,
    },
    P03: {
      answers: {
        value1: '',
      },
      solutions: [{ value1: '152' }],
      commentary: '(어떤 수)+329=481 → (어떤 수)=481-329=152',
      isCorrect: false,
      isCorrectArr: { value1: false, value2: false, value3: false },
      isSubmitted: false,
    },
  },
});
