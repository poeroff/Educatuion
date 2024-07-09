import { atom } from 'recoil';

export const L04C09A03 = atom<TL04C09A03>({
  key: 'L04C09A03',
  default: {
    p01: {
      contents: ['1. What does the graph show?', '2. What takes up the largest portion?'],
      contentsAnswer: ['1) the distribution of energy consumption at home', '2) space heating at 53 percent'],
      answer: ['', ''],
      isSubmitted: false,
    },
    p02: {
      contents: ['3. What has the second largest portion?', '4. What is the third largest contributor?'],
      contentsAnswer: ['3) household appliances at 19 percent', '4) water heating at 16 percent'],
      answer: ['', ''],
      isSubmitted: false,
    },
    p03: {
      contents: ['5. What has the smallest share?', '6. What are two ways to reduce space heating?'],
      contentsAnswer: ['5) lighting at 2 percent', '6) wearing more clothes, putting curtains on the windows'],
      answer: ['', ''],
      isSubmitted: false,
    },
    p04: {
      answer: '',
      isSubmitted: false,
    },
    p05: {
      answer: ['', '', '', ''],
      isSubmitted: false,
    },
  },
});

type TL04C09A03 = {
  p01: {
    contents: string[];
    contentsAnswer: string[];
    answer: (string | undefined)[];
    isSubmitted: boolean;
  };
  p02: {
    contents: string[];
    contentsAnswer: string[];
    answer: (string | undefined)[];
    isSubmitted: boolean;
  };
  p03: {
    contents: string[];
    contentsAnswer: string[];
    answer: (string | undefined)[];
    isSubmitted: boolean;
  };
  p04: {
    answer: string;
    isSubmitted: boolean;
  };
  p05: {
    answer: string[];
    isSubmitted: boolean;
  };
};
