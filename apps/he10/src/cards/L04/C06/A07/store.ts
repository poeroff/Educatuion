import { atom } from 'recoil';

export const L04C06A07 = atom<TL04C06A07>({
  key: 'L04C06A07',
  default: {
    p02: {
      list: [{ contents: 'Clothes made from used coffee grounds dry slowly as people sweat.', value: undefined }],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL04C06A07 = {
  p02: {
    list: Array<TData>;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};

export type TData = {
  contents: string;
  value: boolean | undefined;
};
