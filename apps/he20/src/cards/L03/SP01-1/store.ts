import { atom } from 'recoil';

export const L03SP011State = atom<TL03SP011>({
  key: 'L03SP011',
  default: {
    p01: [
      { id: 1, word: 'impress', meaning: '깊은 인상을 주다', isMemorized: false },
      { id: 2, word: 'performance', meaning: '연기, 공연', isMemorized: false },
      { id: 3, word: 'captivate', meaning: '~의 마음을 사로잡다', isMemorized: false },
      { id: 4, word: 'combination', meaning: '조합', isMemorized: false },
      { id: 5, word: 'remind of', meaning: '~을 생각나게 하다', pathFileNm: 'remind_of', isMemorized: false },
      { id: 6, word: 'rain poncho', meaning: '우비', pathFileNm: 'rain_poncho', isMemorized: false },
      { id: 7, word: 'silence', meaning: '조용하게 하다', isMemorized: false },
      { id: 8, word: 'distract', meaning: '산만하게 하다', isMemorized: false },
      { id: 9, word: 'heritage', meaning: '(국가, 사회의) 유산', isMemorized: false },
      { id: 10, word: 'magnificent', meaning: '웅장한', isMemorized: false },
    ],
    p02: [
      { id: 1, word: 'impress', meaning: '깊은 인상을 주다', meaningOrder: 4, isCorrect: false },
      { id: 2, word: 'rain poncho', meaning: '우비', meaningOrder: 2, isCorrect: false },
      { id: 3, word: 'performance', meaning: '연기, 공연', meaningOrder: 10, isCorrect: false },
      { id: 4, word: 'silence', meaning: '조용하게 하다', meaningOrder: 5, isCorrect: false },
      { id: 5, word: 'captivate', meaning: '~의 마음을 사로잡다', meaningOrder: 6, isCorrect: false },
      { id: 6, word: 'distract', meaning: '산만하게 하다', meaningOrder: 7, isCorrect: false },
      { id: 7, word: 'combination', meaning: '조합', meaningOrder: 1, isCorrect: false },
      { id: 8, word: 'heritage', meaning: '(국가, 사회의) 유산', meaningOrder: 3, isCorrect: false },
      { id: 9, word: 'remind of', meaning: '~을 생각나게 하다', meaningOrder: 8, isCorrect: false },
      { id: 10, word: 'magnificent', meaning: '웅장한', meaningOrder: 9, isCorrect: false },
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
