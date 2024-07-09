import { atom } from 'recoil';

type answerdType2 = {
  answer: number[];
  solution: number[],
  isCorrect: boolean;
  isSubmitted: boolean;
  answerKor?: string;
};
type answerdType3 = {
  answer: number;
  solution: number;
  isCorrect: boolean;
  isSubmitted: boolean;
  answerKor?: string;
};

interface IL03SP04_2 {
  p07: answerdType3;
  p08: answerdType3;
  p11: answerdType2;
  p12: answerdType2;
}

export const L03SP04_2 = atom<IL03SP04_2>({
  key: 'L03SP04-2',
  default: {
    p07: {
      answer: 0,
      solution: 1,
      isCorrect: false,
      isSubmitted: false,
      answerKor: '그녀의 끝없는 노력에도 불구하고, 그는 지금까지 그녀와 대화하고 싶어 하지 않는다.'
    },
    p08: {
      answer: 0,
      solution: 3,
      isCorrect: false,
      isSubmitted: false,
      answerKor: 'Sarah는 그녀의 사진들로 개인전을 열었는데, 이는 그녀의 꿈이었다.'
    },
    p11: {
      answer: [] as number[],
      solution: [2, 3, 0, 5, 1, 4],
      isCorrect: false,
      isSubmitted: false,
    },
    p12: {
      answer: [] as number[],
      solution: [2, 0, 3, 4, 1],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});