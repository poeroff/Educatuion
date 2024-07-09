import { atom } from 'recoil';

export const A04000103_store = atom({
  key: 'A04000103',
  default: {
    p01: {
      data: [
        {
          contents: '(몇십)×(몇)의 계산 원리와 계산 방법을 이해하고 계산할 수 있어요.',
          userAnswer: false,
        },
        {
          contents: '(두 자리 수)×(한 자리 수)의 계산 원리와 계산 방법을 이해하고 계산할 수 있어요.',
          userAnswer: false,
        },
        {
          contents: '(두 자리 수)×(한 자리 수)를 어림하고 계산 결과와 비교할 수 있어요.',
          userAnswer: false,
        },
        {
          contents: '(두 자리 수)×(한 자리 수)를 활용한 문제를 해결할 수 있어요.',
          userAnswer: false,
        },
      ],
      isSubmitted: false,
    },
    p02: {
      data: [
        {
          contents: '수학 공부를 열심히 할 거예요.',
          inputStatus: false,
          userAnswer: 0,
        },
        {
          contents: '수업 시간에 발표를 많이 할 거예요.',
          inputStatus: false,
          userAnswer: 0,
        },
        {
          contents: '친구의 이야기를 잘 들어 줄 거예요.',
          inputStatus: false,
          userAnswer: 0,
        },
        {
          contents: '',
          inputStatus: false,
          userAnswer: 0,
        },
      ],
      isSubmitted: false,
    },
  },
});
