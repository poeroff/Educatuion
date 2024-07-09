import { atom } from 'recoil';

export const L01C02A08 = atom<TL01C02A08>({
  key: 'L01C02A08',
  default: {
    p01: {
      answer: [-1, -1],
      solution: [0, 1],
      isCorrectInput: [false, false],
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer: [
        {
          peapleId: '',
          valueId: '',
        },
        {
          peapleId: '',
          valueId: '',
        },
      ],
      solution: [
        { peapleId: 'Dylan', valueId: 'comedies' },
        { peapleId: 'Yuna', valueId: 'actionMovies' },
      ],
      isCorrectInput: [false, false],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL01C02A08 = {
  p01: {
    answer: number[];
    solution: number[];
    isCorrectInput: boolean[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p02: {
    answer: { [key: string]: string }[];
    solution: { [key: string]: string }[];
    isCorrectInput: boolean[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
