import { atom } from 'recoil';

export const B02_0004_30 = atom<TB02000430>({
  key: 'B02000430',
  default: {
    P01: {
      answer: {
        value1: '',
        value2: '',
      },
      solution: { value1: ['ㄱ', '㉠'], value2: ['ㄷ', '㉢'] },
      commentary: '각 ㄷㅁㄹ은 점 ᄆ, 각 ㅁㄷㄹ은 점 ㄷ이 각의 꼭짓점인 것을 찾습니다. ㉡은 각 ㅁㄹㄷ 또는 각 ㄷㄹㅁ입니다.',
      isCorrect: false,
      isSubmitted: false,
    },
    P02: {
      answer: {
        value1: '',
        value2: '',
        value3: '',
      },
      solution: {
        value1: '가',
        value2: '다',
        value3: '나',
      },
      commentary: `가: 4개, 나: 0개, 다: 3개
      따라서 각의 수가 가장 많은 도형부터 차례로 쓰면 가, 다, 나입니다.`,
      isCorrect: false,
      isSubmitted: false,
    },
    P03: {
      answer: {
        value1: '',
      },
      solution: {
        value1: '6',
      },
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TB02000430 = {
  P01: {
    answer: { [key: string]: string };
    solution: { [key: string]: string[] };
    commentary: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  P02: {
    answer: { [key: string]: string };
    solution: { [key: string]: string };
    commentary: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  P03: {
    answer: { [key: string]: string };
    solution: { [key: string]: string };
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
