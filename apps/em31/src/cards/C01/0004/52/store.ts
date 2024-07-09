import { atom } from 'recoil';

export const C01_0004_52 = atom<TC01000452>({
  key: 'C01_0004_52',
  default: {
    p01: {
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

type TC01000452 = {
  p01: {
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
