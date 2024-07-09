import { atom } from 'recoil';

export const A05_0001_03 = atom({
  key: 'A05000103',
  default: {
    p01: {
      data: [
        {
          contents: '길이 단위 1 mm와 1 km를 알고, 길이를 재고 어림할 수 있어요.',
          userAnswer: false,
        },
        {
          contents: '1  cm와 1 mm, 1 km와 1 m의 관계를 이해하고 다양하게  표현할 수 있어요.',
          userAnswer: false,
        },
        {
          contents: '1분과 1초의 관계를 이해하고 초 단위까지 시각을 읽을 수 있어요.',
          userAnswer: false,
        },
        {
          contents: '시간의 덧셈과 뺄셈을 할 수 있어요.',
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
