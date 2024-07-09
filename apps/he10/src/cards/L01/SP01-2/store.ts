import { atom } from 'recoil';

const L01SP012State = atom<TL04C07A04>({
  key: 'L01SP012State',
  default: {
    p01: [
      { id: 1, word: 'announcement', meaning: '발표', isMemorized: false },
      { id: 2, word: 'complete', meaning: '완료하다', isMemorized: false },
      { id: 3, word: 'remarkable', meaning: '놀라운', isMemorized: false },
      { id: 4, word: 'improvement', meaning: '개선', isMemorized: false },
      { id: 5, word: 'virtual', meaning: '가상의', isMemorized: false },
      { id: 6, word: 'up to date', meaning: '현대식의', isMemorized: false },
      { id: 7, word: 'hand in', meaning: '제출하다', isMemorized: false },
      { id: 8, word: 'deserve', meaning: '~을 받을 만하다', isMemorized: false },
      { id: 9, word: 'demanding', meaning: '힘든', isMemorized: false },
      { id: 10, word: 'rewarding', meaning: '보람 있는', isMemorized: false },
    ],
    p02: [
      { id: 1, word: 'announcement', meaning: '발표', meaningOrder: 6, isCorrect: false },
      { id: 2, word: 'complete', meaning: '완료하다', meaningOrder: 7, isCorrect: false },
      { id: 3, word: 'remarkable', meaning: '놀라운', meaningOrder: 2, isCorrect: false },
      { id: 4, word: 'improvement', meaning: '개선', meaningOrder: 1, isCorrect: false },
      { id: 5, word: 'virtual', meaning: '가상의', meaningOrder: 4, isCorrect: false },
      { id: 6, word: 'up to date', meaning: '현대식의', meaningOrder: 3, isCorrect: false },
      { id: 7, word: 'hand in', meaning: '제출하다', meaningOrder: 5, isCorrect: false },
      { id: 8, word: 'deserve', meaning: '~을 받을 만하다', meaningOrder: 10, isCorrect: false },
      { id: 9, word: 'demanding', meaning: '힘든', meaningOrder: 9, isCorrect: false },
      { id: 10, word: 'rewarding', meaning: '보람 있는', meaningOrder: 8, isCorrect: false },
    ],
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
    p11: {
      clickedChipButtons: [] as number[],
      isSubmitted: false,
    },
    p12: {
      clickedChipButtons: [] as number[],
      isSubmitted: false,
    },
    p13: {
      inputs: ['', '', ''] as string[],
      isSubmitted: false,
    },
    p14: {
      inputs: ['', '', ''] as string[],
      isSubmitted: false,
    },
    p15: {
      inputs: ['', '', ''] as string[],
      isSubmitted: false,
    },
    p16: {
      inputs: ['', '', ''] as string[],
      isSubmitted: false,
    },
    p17: {
      clickedChipButtons: [] as number[],
      isSubmitted: false,
    },
    p18: {
      clickedChipButtons: [] as number[],
      isSubmitted: false,
    },
    p19: {
      clickedChipButtons: [] as number[],
      isSubmitted: false,
    },
    p20: {
      clickedChipButtons: [] as number[],
      isSubmitted: false,
    },
    p21: {
      selectedIdx: null as number | null,
      isSubmitted: false,
    },
    p22: {
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

export default L01SP012State;
