import { atom } from 'recoil';

export const L04C06A07b = atom<TL04C06A07b>({
  key: 'L04C06A07b',
  default: {
    p02: {
      list: [{ contents: 'Fabrics made from used coffee grounds absorb sweat and dry quickly.', value: undefined }],
      isCorrect: false,
      isSubmitted: false,
      solution: [true],
    },
  },
});

type TL04C06A07b = {
  p02: {
    list: Array<Idata>;
    isCorrect: boolean;
    isSubmitted: boolean;
    solution: Array<Boolean>;
  };
};

export type Idata = {
  contents: string;
  value: boolean | undefined;
};
