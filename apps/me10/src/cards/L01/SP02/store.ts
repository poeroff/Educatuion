import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L01SP02 = atom<{
  [key: string]: {
    isSubmitted: boolean;
    audioData?: Record<string, IAudioData | null>;
    answer?: string;
    select?: number;
    solution?: string;
    isCorrect?: boolean;
    initWordList?: {
      id: number;
      word: string;
      meaning: string;
      meaningOrder?: number;
      isCorrect?: boolean;
      isMemorized?: boolean;
    }[];
  };
}>({
  key: 'L01SP02',
  default: {
    p01: {
      initWordList: [
        { id: 1, word: 'angry', meaning: '화난', isMemorized: false },
        { id: 2, word: 'favorite', meaning: '가장 좋아하는', isMemorized: false },
        { id: 3, word: 'same', meaning: '같은', isMemorized: false },
        { id: 4, word: 'subject', meaning: '과목', isMemorized: false },
        { id: 5, word: 'twin', meaning: '쌍둥이의', isMemorized: false },
        { id: 6, word: 'hit', meaning: '때리다, 누르다', isMemorized: false },
        { id: 7, word: 'meet', meaning: '만나다', isMemorized: false },
      ],
      isSubmitted: false,
    },
    p02: {
      initWordList: [
        { id: 1, word: 'angry', meaning: '화난', meaningOrder: 6, isCorrect: false },
        { id: 2, word: 'favorite', meaning: '가장 좋아하는', meaningOrder: 2, isCorrect: false },
        { id: 3, word: 'same', meaning: '같은', meaningOrder: 3, isCorrect: false },
        { id: 4, word: 'subject', meaning: '과목', meaningOrder: 4, isCorrect: false },
        { id: 5, word: 'twin', meaning: '쌍둥이의', meaningOrder: 5, isCorrect: false },
        { id: 6, word: 'hit', meaning: '때리다, 누르다', meaningOrder: 1, isCorrect: false },
        { id: 7, word: 'meet', meaning: '만나다', meaningOrder: 7, isCorrect: false },
      ],
      isSubmitted: false,
    },
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
    p09: {
      isSubmitted: false,
      audioData: { 1: null, 2: null },
    },
    p10: {
      isSubmitted: false,
      audioData: { 1: null, 2: null },
    },
    p11: {
      audioData: { 1: null },
      solution: 'I like action movies.',
      isSubmitted: false,
    },
    p12: {
      audioData: { 1: null },
      solution: 'Nice to meet you, too. My name is Max.',
      isSubmitted: false,
    },
    p13: {
      select: 0,
      solution: '4',
      isSubmitted: false,
      isCorrect: false,
    },
  },
});
