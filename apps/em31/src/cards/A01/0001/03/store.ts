import { atom } from 'recoil';

export const A01_0001_03 = atom<TA01000103>({
  key: 'A01_0001_03',
  default: {
    p01: {
      data: [
        {
          contents: '세 자리 수의 덧셈과 뺄셈을 할 수 있어요.',
          userAnswer: false,
        },
        {
          contents: '실생활 상황에서 세 자리 수의 덧셈, 뺄셈의 어림셈을 할 수 있어요.',
          userAnswer: false,
        },
      ],
      isSubmitted: false,
    },
    p02: {
      data: [
        {
          contents: '교사의 지문 등이 들어갑니다.',
          inputStatus: false,
          userAnswer: 0,
        },
        {
          contents: '수업시간에 발표를 많이 할 거예요.',
          inputStatus: false,
          userAnswer: 0,
        },
        {
          contents: '친구들의 이야기를 잘 들어 줄 거예요.',
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

type TA01000103 = {
  p01: {
    data: {
      contents: string;
      userAnswer: boolean;
    }[];
    isSubmitted: boolean;
  };
  p02: {
    data: {
      contents: string;
      inputStatus: boolean;
      userAnswer: number;
    }[];
    isSubmitted: boolean;
  };
};
