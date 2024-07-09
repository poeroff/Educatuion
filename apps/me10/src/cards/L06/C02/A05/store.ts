import { atom } from 'recoil';

export const L06C02A05 = atom<TL06C02A05>({
  key: 'L06C02A05',
  default: {
    p01: {
      answer: [],
      solution: [
        ['Jiwoo', 'dancing'],
        ['Eric', 'making webtoons'],
      ],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

export type TConnection = [string, string];

type TL06C02A05 = {
  p01: {
    answer: TConnection[];
    solution: TConnection[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
