import { atom } from 'recoil';

export type WordSelectQuestionKey = 'p07' | 'p08' | 'p09' | 'p10';

export const HE20DT1 = atom<THE20DT1>({
  key: 'HE20DT1',
  default: {
    p01: {
      answer: '',
      solution: '함께 가다',
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer: '',
      solution: '자선',
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer: '',
      solution: '용돈',
      isCorrect: false,
      isSubmitted: false,
    },
    p04: {
      answer: '',
      solution: '합리적인',
      isCorrect: false,
      isSubmitted: false,
    },
    p05: {
      answer: '',
      solution: 'I’m thinking of watching a baseball game.',
      isCorrect: false,
      isSubmitted: false,
    },
    p06: {
      selectedIdx: null,
      isSubmitted: false,
    },

    p07: {
      answer1: '',
      solution1: 'to work',
      examples: ['The professor encouraged her students', '___', 'as volunteer', 'translators.'],
      options: ['work', 'to work', 'to working'],
      translations: ['그 교수는 그녀의 학생들이 번역 자원봉사자로 활동하도록 장려했다.'],
      isCorrect: false,
      isSubmitted: false,
    },

    p08: {
      answer1: '',
      solution1: 'got',
      examples: ['The school bus had already left when Lisa', '___', 'to the bus stop.'],
      options: ['get', 'gets', 'got'],
      translations: ['Lisa가 버스 정류장에 도착했을 때 학교 버스는 이미 떠났었다.'],
      isCorrect: false,
      isSubmitted: false,
    },

    p09: {
      answer1: '',
      solution1: 'cannot',
      examples: ['Jimmy is in Africa. You', '___', 'have seen him in Korea.'],
      options: ['must', 'cannot', 'should not'],
      translations: ['Jimmy는 아프리카에 있다. 네가 그를 한국에서 봤을 리가 없다.'],
      isCorrect: false,
      isSubmitted: false,
    },

    p10: {
      answer1: '',
      solution1: 'consume',
      examples: ['The expert suggested that people', '___', 'less sugar to keep', 'their teeth healthy.'],
      options: ['consume', 'consumed', 'were consuming'],
      translations: ['그 전문가는 사람들이 그들의 치아를 건강하게 유지하기 위해 설탕을 덜 섭취해야 한다고 제안했다.'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type THE20DT1 = {
  [key: string]: any;
  p01: TOneWordMatchData;
  p02: TOneWordMatchData;
  p03: TOneWordMatchData;
  p04: TOneWordMatchData;
  p05: TOneWordMatchData;
  p06: {
    selectedIdx: number | null;
    isSubmitted: boolean;
  };

  p09: {
    answer1: string;
    solution1: string;
    examples: string[];
    options: string[];
    translations: string[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };

  p10: {
    answer1: string;
    solution1: string;
    examples: string[];
    options: string[];
    translations: string[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};

type TOneWordMatchData = {
  answer: string;
  solution: string;
  isCorrect: boolean;
  isSubmitted: boolean;
};
