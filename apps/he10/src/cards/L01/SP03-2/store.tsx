import { atom } from 'recoil';

export const L01SP03_2 = atom<TL04C07A04>({
  key: 'L01SP03_2',
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
    p07: {
      answer: '',
      isSubmitted: false,
    },
    p08: {
      answer: '',
      isSubmitted: false,
    },
    p09: {
      answer: '',
      isSubmitted: false,
    },
    p10: {
      answer: '',
      isSubmitted: false,
    },

    p15: {
      clickedChipButtons: [] as number[],
      isError: [false, false, false, false, false] as boolean[],
      isCorrect: false,
      isSubmitted: false,
    },
    p16: {
      clickedChipButtons: [] as number[],
      isError: [false, false, false, false, false] as boolean[],
      isCorrect: false,
      isSubmitted: false,
    },
    p17: {
      clickedChipButtons: [] as number[],
      isError: [false, false, false, false, false] as boolean[],
      isCorrect: false,
      isSubmitted: false,
    },
    p18: {
      clickedChipButtons: [] as number[],
      isError: [false, false, false, false, false] as boolean[],
      isCorrect: false,
      isSubmitted: false,
    },
    p19: {
      clickedChipButtons: [] as number[],
      isError: [false, false, false, false, false] as boolean[],
      isCorrect: false,
      isSubmitted: false,
    },
    p20: {
      clickedChipButtons: [] as number[],
      isError: [false, false, false, false, false] as boolean[],
      isCorrect: false,
      isSubmitted: false,
    },
    p21: {
      clickedChipButtons: [] as number[],
      isError: [false, false, false, false, false] as boolean[],
      isCorrect: false,
      isSubmitted: false,
    },
    p22: {
      clickedChipButtons: [] as number[],
      isError: [false, false, false, false, false] as boolean[],
      isCorrect: false,
      isSubmitted: false,
    },
    p23: {
      selectedIdx: null as number | null,
      isSubmitted: false,
    },
    p24: {
      answer: 0,
      selectedIdx: null as number | null,
      isSubmitted: false,
    },
    p25: {
      answer: 0,
      selectedIdx: null as number | null,
      isSubmitted: false,
    },
  },
});

type TL04C07A04 = {
  [key: string]: any;
};
