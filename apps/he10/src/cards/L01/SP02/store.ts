import { atom } from 'recoil';

const L01SP02State = atom<TL04C07A04>({
  key: 'L01SP02State',
  default: {
    p03: {
      answer: '',
      isSubmitted: false,
    },
    p04: {
      answer: '',
      isSubmitted: false,
    },
    p05: {
      answer: '',
      isSubmitted: false,
    },
    p06: {
      answer: '',
      isSubmitted: false,
    },
    p09: {
      audioData: {},
      isSubmitted: false,
    },
    p10: {
      audioData: {},
      isSubmitted: false,
    },
    p11: {
      audioData: {},
      isSubmitted: false,
    },
    p12: {
      audioData: {},
      isSubmitted: false,
    },
    p13: {
      selectedIdx: null as number | null,
      isSubmitted: false,
    },
  },
});

type TL04C07A04 = {
  p01?: {
    id: number;
    word: string;
    meaning: string;
    isMemorized: boolean;
  }[];
  p02?: {
    id: number;
    word: string;
    meaning: string;
    meaningOrder: number;
    isCorrect: boolean;
  }[];
  [key: string]: any;
};

export default L01SP02State;
