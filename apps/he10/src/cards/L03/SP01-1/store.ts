import { atom } from 'recoil';

export const L03SP011State = atom<TL03SP011>({
  key: 'L03SP011',
  default: {
    p01: [
      { id: 1, word: 'notice', meaning: '알아차리다', isMemorized: false },
      { id: 2, word: 'sphere-shaped', meaning: '구 모양의', isMemorized: false },
      { id: 3, word: 'filter', meaning: '거르다', isMemorized: false },
      { id: 4, word: 'signal', meaning: '신호', isMemorized: false },
      { id: 5, word: 'take turns', meaning: '번갈아 하다', pathFileNm: 'take_turns', isMemorized: false },
      { id: 6, word: 'incredible', meaning: '믿을 수 없는', isMemorized: false },
      { id: 7, word: 'story', meaning: '층', isMemorized: false },
      { id: 8, word: 'stunning', meaning: '멋진', isMemorized: false },
      { id: 9, word: 'sticky', meaning: '끈적거리는', isMemorized: false },
      { id: 10, word: 'observation', meaning: '관찰', isMemorized: false },
    ],
    p02: [
      { id: 1, word: 'notice', meaning: '알아차리다', meaningOrder: 6, isCorrect: false },
      { id: 2, word: 'incredible', meaning: '믿을 수 없는', meaningOrder: 4, isCorrect: false },
      { id: 3, word: 'sphere-shaped', meaning: '구 모양의', meaningOrder: 3, isCorrect: false },
      { id: 4, word: 'story', meaning: '층', meaningOrder: 1, isCorrect: false },
      { id: 5, word: 'filter', meaning: '거르다', meaningOrder: 2, isCorrect: false },
      { id: 6, word: 'stunning', meaning: '멋진', meaningOrder: 7, isCorrect: false },
      { id: 7, word: 'signal', meaning: '신호', meaningOrder: 8, isCorrect: false },
      { id: 8, word: 'sticky', meaning: '끈적거리는', meaningOrder: 10, isCorrect: false },
      { id: 9, word: 'take turns', meaning: '번갈아 하다', meaningOrder: 9, isCorrect: false },
      { id: 10, word: 'observation', meaning: '관찰', meaningOrder: 5, isCorrect: false },
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
    p09: {
      inputs: ['', '', ''] as string[],
      isSubmitted: false,
    },
    p10: {
      inputs: ['', '', ''] as string[],
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
      selectedIdx: null as number | null,
      isSubmitted: false,
    },
    p14: {
      selectedIdx: null as number | null,
      isSubmitted: false,
    },
  },
});

type TL03SP011 = {
  p01: TWordMemorizeData[];
  p02: TWordMatchData[];
  [key: string]: any;
};

type TWordData = {
  id: number;
  word: string;
  meaning: string;
  pathFileNm?: string;
};

type TWordMemorizeData = TWordData & {
  isMemorized: boolean;
};

type TWordMatchData = TWordData & {
  meaningOrder: number;
  isCorrect: boolean;
};
