import { atom } from 'recoil';

export const L01SCP0101 = atom<TL01SCP0101>({
  key: 'L01SCP0101',
  default: {
    p01: [
      { id: 1, word: 'angry', meaning: '화난', isMemorized: false },
      { id: 2, word: 'favorite', meaning: '가장 좋아하는', isMemorized: false },
      { id: 3, word: 'same', meaning: '같은', isMemorized: false },
      { id: 4, word: 'subject', meaning: '과목', isMemorized: false },
      { id: 5, word: 'twin', meaning: '쌍둥이의', isMemorized: false },
      { id: 6, word: 'hit', meaning: '때리다, 누르다', isMemorized: false },
      { id: 7, word: 'meet', meaning: '만나다', isMemorized: false },
    ],
    p02: [
      { id: 1, word: 'angry', meaning: '화난', meaningOrder: 6, isCorrect: false },
      { id: 2, word: 'favorite', meaning: '가장 좋아하는', meaningOrder: 2, isCorrect: false },
      { id: 3, word: 'same', meaning: '같은', meaningOrder: 3, isCorrect: false },
      { id: 4, word: 'subject', meaning: '과목', meaningOrder: 4, isCorrect: false },
      { id: 5, word: 'twin', meaning: '쌍둥이의', meaningOrder: 5, isCorrect: false },
      { id: 6, word: 'hit', meaning: '때리다, 누르다', meaningOrder: 1, isCorrect: false },
      { id: 7, word: 'meet', meaning: '만나다', meaningOrder: 7, isCorrect: false },
    ],
    p03: {
      answer: '',
      solution: '화난',
      isCorrect: false,
      isSubmitted: false,
    },
    p04: {
      answer: '',
      solution: '과목',
      isCorrect: false,
      isSubmitted: false,
    },
    p05: {
      answer: '',
      solution: 'favorite',
      isCorrect: false,
      isSubmitted: false,
    },
    p06: {
      answer: '',
      solution: 'hit',
      isCorrect: false,
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
      inputs: ['favorite', 'like', 'love'] as string[],
      answer: '',
      solution: 'favorite',
      isSubmitted: false,
      isCorrect: false,
    },
    p10: {
      inputs: ['meet', 'watch', 'look'] as string[],
      answer: '',
      solution: 'meet',
      isSubmitted: false,
      isCorrect: false,
    },
    p11: {
      chipButtonInfo: [
        {
          text: 'to',
        },
        {
          text: 'meet',
        },
        {
          text: 'Nice',
        },
        {
          text: 'you',
        },
      ],
      answer: [
        {
          text: 'Nice',
        },
        {
          text: 'to',
        },
        {
          text: 'meet',
        },
        {
          text: 'you',
        },
      ],
      clickedChipButtons: [] as number[],
      isSubmitted: false,
      isCorrect: false,
    },
    p12: {
      chipButtonInfo: [
        {
          text: 'your',
        },
        {
          text: 'favorite',
        },
        {
          text: "What's",
        },
        {
          text: 'food',
        },
        {
          text: '?',
        },
      ],
      answer: [
        {
          text: "What's",
        },
        {
          text: 'your',
        },
        {
          text: 'favorite',
        },
        {
          text: 'food',
        },
        {
          text: '?',
        },
      ],
      clickedChipButtons: [] as number[],
      isSubmitted: false,
      isCorrect: false,
    },
    p13: {
      selectedIdx: null as number | null,
      isSubmitted: false,
    },
    p14: {
      selectedIdx: null as number | null,
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

type TL01SCP0101 = {
  [key: string]: any;
};
