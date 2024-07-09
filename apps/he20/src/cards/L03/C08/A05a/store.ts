import { atom } from 'recoil';

export const L03C08A05a = atom<TL03C08A05a>({
  key: 'L03C08A05a',
  default: {
    P01: {
      answer: '',
      solution: 'whom he deeply trusts',
      no: '1.',
      text1: 'Jack은 그의 가장 가까운 친구 Lisa에게 종종 조언을 구하는데, 그는 그녀를 깊이 신뢰한다.',
      text2: 'Jack often seeks advice from his closet friend Lisa,',
      keyword: 'deeply trust',
      isSubmitted: false,
      isCorrect: false,
    },
    P02: {
      answer: '',
      solution: 'which was her childhood dream',
      no: '2.',
      text1: 'Sarah는 그녀의 사진들로 개인전을 열었는데, 이는 그녀의 어린 시절 꿈이었다.',
      text2: 'Sarah hosted a personal gallery with her photographs,',
      keyword: 'childhood dream',
      isSubmitted: false,
      isCorrect: false,
    },
    P03: {
      answer: '',
      solution: 'when he set a new world record',
      no: '3.',
      text1: '그 운동선수는 지난 올림픽 게임을 회상했는데, 이때 그는 세계 신기록을 세웠다',
      text2: 'The athlete recalled the last Olympic games,',
      keyword: 'set a new world record',
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

type TL03C08A05a = {
  [key: string]: PageData;
};

type PageData = {
  answer: string;
  solution: string;
  no: string;
  text1: string;
  text2: string;
  keyword: string;
  isSubmitted: boolean;
  isCorrect?: boolean;
  commentary?: string;
};
