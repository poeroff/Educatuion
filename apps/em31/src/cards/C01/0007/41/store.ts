import { atom } from 'recoil';

export const C01_0007_41 = atom<TC01000741>({
  key: 'C01_0007_41',
  default: {
    P01: {
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
          bSideId: 'bItem2',
        },
        {
          aSideId: 'aItem2',
          bSideId: 'bItem1',
        },
      ],
    },
  },
});

type TC01000741 = {
  P01: {
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
