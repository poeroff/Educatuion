import { atom } from 'recoil';

export const L01SP03_1 = atom<TL01SP0301>({
  key: 'L01SP03_1',
  default: {
    p01: [
      { id: 1, word: 'survival kit', meaning: '생존 키트', isMemorized: false },
      { id: 2, word: 'nervous', meaning: '불안해하는', isMemorized: false },
      { id: 3, word: 'sticky note', meaning: '접착식 메모지', isMemorized: false },
      { id: 4, word: 'remember', meaning: '기억하다', isMemorized: false },
      { id: 5, word: 'smile', meaning: '미소, 웃음', isMemorized: false },
      { id: 6, word: 'mirror', meaning: '거울', isMemorized: false },
      { id: 7, word: 'tightly', meaning: '꽉, 단단히', isMemorized: false },
      { id: 8, word: 'go away', meaning: '사라지다', isMemorized: false },
      { id: 9, word: 'erase', meaning: '지우다', isMemorized: false },
      { id: 10, word: 'mistake', meaning: '실수', isMemorized: false },
      { id: 11, word: 'Band-Aid', meaning: '반창고', isMemorized: false },
      { id: 12, word: 'get hurt', meaning: '상처받다', isMemorized: false },
      { id: 13, word: 'welcome', meaning: '환영하다', isMemorized: false },
      { id: 14, word: 'use', meaning: '사용하다', isMemorized: false },
      { id: 15, word: 'sweet', meaning: '달콤한', isMemorized: false },
      { id: 16, word: 'write', meaning: '쓰다, 적다', isMemorized: false },
      { id: 17, word: 'hold', meaning: '쥐다, 잡다', isMemorized: false },
      { id: 18, word: 'start', meaning: '시작하다', isMemorized: false },
      { id: 19, word: 'need', meaning: '필요하다', isMemorized: false },
      { id: 20, word: 'sometimes', meaning: '때때로', isMemorized: false },
    ],
    p02: [
      { id: 1, word: 'nervous', meaning: '불안해하는', meaningOrder: 6, isCorrect: false },
      { id: 2, word: 'remember', meaning: '기억하다', meaningOrder: 2, isCorrect: false },
      { id: 3, word: 'mirror', meaning: '거울', meaningOrder: 1, isCorrect: false },
      { id: 4, word: 'go away', meaning: '사라지다', meaningOrder: 3, isCorrect: false },
      { id: 5, word: 'get hurt', meaning: '상처받다', meaningOrder: 5, isCorrect: false },
      { id: 6, word: 'mistake', meaning: '실수', meaningOrder: 4, isCorrect: false },
      { id: 7, word: 'hold', meaning: '쥐다, 잡다', meaningOrder: 8, isCorrect: false },
      { id: 8, word: 'sweet', meaning: '달콤한', meaningOrder: 7, isCorrect: false },
      { id: 9, word: 'sometimes', meaning: '때때로', meaningOrder: 9, isCorrect: false },
      { id: 10, word: 'need', meaning: '필요하다', meaningOrder: 10, isCorrect: false },
    ],
    p03: {
      answer: '',
      solution: '환영하다',
      isCorrect: false,
      isSubmitted: false,
    },
    p04: {
      answer: '',
      solution: '사용하다',
      isCorrect: false,
      isSubmitted: false,
    },
    p05: {
      answer: '',
      solution: 'start',
      isCorrect: false,
      isSubmitted: false,
    },
    p06: {
      answer: '',
      solution: 'tightly',
      isCorrect: false,
      isSubmitted: false,
    },
    p10: {
      chipButtonInfo: [
        {
          text: '키트예요.',
        },
        {
          text: '학교',
        },
        {
          text: '저의',
        },
        {
          text: '이 상자는',
        },
        {
          text: '생존',
        },
      ],
      answer: [
        {
          text: '이 상자는',
        },
        {
          text: '저의',
        },
        {
          text: '학교',
        },
        {
          text: '생존',
        },
        {
          text: '키트예요.',
        },
      ],
      clickedChipButtons: [] as number[],
      isSubmitted: false,
      isCorrect: false,
    },
    p11: {
      chipButtonInfo: [
        {
          text: '합시다!',
        },
        {
          text: '좋은',
        },
        {
          text: '보내도록',
        },
        {
          text: '한 해를',
        },
      ],
      answer: [
        {
          text: '좋은',
        },
        {
          text: '한 해를',
        },
        {
          text: '보내도록',
        },
        {
          text: '합시다!',
        },
      ],
      clickedChipButtons: [] as number[],
      isSubmitted: false,
      isCorrect: false,
    },
    p12: {
      chipButtonInfo: [
        {
          text: 'okay',
        },
        {
          text: 'with',
        },
        {
          text: 'feel',
        },
        {
          text: 'this box.',
        },
        {
          text: `I'm also nervous, but I`,
        },
      ],
      answer: [
        {
          text: `I'm also nervous, but I`,
        },
        {
          text: 'feel',
        },
        {
          text: 'okay',
        },
        {
          text: 'with',
        },
        {
          text: 'this box.',
        },
      ],
      clickedChipButtons: [] as number[],
      isSubmitted: false,
      isCorrect: false,
    },
    p13: {
      chipButtonInfo: [
        {
          text: 'the first',
        },
        {
          text: 'Today',
        },
        {
          text: 'of',
        },
        {
          text: 'is',
        },
        {
          text: 'day',
        },
        {
          text: 'middle school.',
        },
      ],
      answer: [
        {
          text: 'Today',
        },
        {
          text: 'is',
        },
        {
          text: 'the first',
        },
        {
          text: 'day',
        },
        {
          text: 'of',
        },
        {
          text: 'middle school.',
        },
      ],
      clickedChipButtons: [] as number[],
      isSubmitted: false,
      isCorrect: false,
    },
    p14: {
      answer: -1,
      solution: 3,
      isCorrect: false,
      isSubmitted: false,
    },
    p15: {
      answer: -1,
      solution: 4,
      isCorrect: false,
      isSubmitted: false,
    },
    p16: {
      answer: -1,
      solution: 5,
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL01SP0301 = {
  p01: TWordMemorizeData[];
  p02: TWordMatchData[];
  p03: TOneWordMatchData;
  p04: TOneWordMatchData;
  p05: TOneWordMatchData;
  p06: TOneWordMatchData;
  p10: TChipData;
  p11: TChipData;
  p12: TChipData;
  p13: TChipData;
  p14: TRadioSelect;
  p15: TRadioSelect;
  p16: TRadioSelect;
};

type TWordData = {
  id: number;
  word: string;
  meaning: string;
};

type TWordMemorizeData = TWordData & {
  isMemorized: boolean;
};

type TWordMatchData = TWordData & {
  meaningOrder: number;
  isCorrect: boolean;
};

type TChipData = {
  chipButtonInfo: TWord[];
  answer: TWord[];
  clickedChipButtons: number[];
  isSubmitted: boolean;
  isCorrect: boolean;
};

type TWord = {
  text: string;
};

type TOneWordMatchData = {
  answer: string;
  solution: string;
  isCorrect: boolean;
  isSubmitted: boolean;
};

type TRadioSelect = {
  answer: number;
  solution: number;
  isCorrect: boolean;
  isSubmitted: boolean;
};
