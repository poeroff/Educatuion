import { atom } from 'recoil';

export const L01SP03_1 = atom<TL04C07A04>({
  key: 'L01SP03_1',
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

    p11: {
      clickedChipButtons: [] as number[],
      isError: [false, false, false, false, false] as boolean[],
      isCorrect: false,
      isSubmitted: false,
    },
    p12: {
      clickedChipButtons: [] as number[],
      isError: [false, false, false, false, false] as boolean[],
      isCorrect: false,
      isSubmitted: false,
    },
    p13: {
      clickedChipButtons: [] as number[],
      isError: [false, false, false, false, false] as boolean[],
      isCorrect: false,
      isSubmitted: false,
    },
    p14: {
      clickedChipButtons: [] as number[],
      isError: [false, false, false, false, false] as boolean[],
      isCorrect: false,
      isSubmitted: false,
    },
    p15: {
      selectedIdx: null as number | null,
      isSubmitted: false,
    },
    p16: {
      answer: 0,
      selectedIdx: null as number | null,
      isSubmitted: false,
    },
    p17: {
      answer: 0,
      selectedIdx: null as number | null,
      isSubmitted: false,
    },
  },
});

type TL04C07A04 = {
  [key: string]: any;
};
