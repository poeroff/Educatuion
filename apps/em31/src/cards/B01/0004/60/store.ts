import { atom } from 'recoil';

export const C01_0004_60 = atom<TB01000460>({
  key: 'C01_0004_60',
  default: {
    p01: {
      input1: ['', '', ''],
      input2: ['', '', '', ''],
      input3: [''],
      input4: [''],
      isSubmitted: false,
    },
    p02: {
      input1: [''],
      isSubmitted: false,
    },
    P03: {
      answer: [
        {
          aSideId: '',
          bSideId: '',
          isCorrect: false,
        },
        {
          aSideId: '',
          bSideId: '',
          isCorrect: false,
        },
      ],
      isSubmitted: false,
      isCorrect: false,
      solution: [
        {
          aSideId: 'aItem1',
          bSideId: 'bItem1',
        },
        {
          aSideId: 'aItem2',
          bSideId: 'bItem2',
        },
      ],
    },
  },
});

type TB01000460 = {
  p01: {
    input1: string[];
    input2: string[];
    input3: string[];
    input4: string[];
    isSubmitted: boolean;
  };
  p02: {
    input1: string[];
    isSubmitted: boolean;
  };
  P03: {
    answer: {
      aSideId: string;
      bSideId: string;
      isCorrect?: boolean;
    }[];
    isSubmitted: boolean;
    isCorrect: boolean;
    solution: { aSideId: string; bSideId: string }[];
  };
};
