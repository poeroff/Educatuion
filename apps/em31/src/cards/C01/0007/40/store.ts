import { atom } from 'recoil';

export const C01_0007_40 = atom({
  key: 'C01_0007_40',
  default: {
    P01: {
      answer: ['', ''],
      solution: ['360-175=185', '185'],
      isCorrectInput: [false, false],
      isCorrect: false,
      isSubmitted: false,
      commentary: '(전체 쪽수)-(읽은 쪽수)=360-175=185(쪽)',
    },
  },
});
