import { atom } from 'recoil';

export const C01_0007_42 = atom({
  key: 'C01_0007_42',
  default: {
    P01: {
      value1: '',
      value2: '',
      answer1: '712-197=515',
      answer2: '515',
      isCorrect1: false,
      isCorrect2: false,
      isSubmitted: false,
      isCorrect: false,
      commentary:
        '차가 가장 큰 뺄셈식을 만들려면 가장 큰 수에서 가장 작은 수를 빼야 합니다. 가장 큰 수는 712이고 가장 작은 수는 197이므로 712-197=515입니다.',
    },
  },
});
