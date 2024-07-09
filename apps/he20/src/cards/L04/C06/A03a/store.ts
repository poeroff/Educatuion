import { atom } from 'recoil';

export const L04C06A03a = atom<TL04C06A03a>({
  key: 'L04C06A03a',
  default: {
    p02: {
      answer: '',
      solution: 'They can be inserted in the nervous system, including the brain and spinal cord.',
      isSubmitted: false,
    },
  },
});

export type TL04C06A03a = {
  p02: {
    answer: string;
    solution: string;
    isSubmitted: boolean;
  };
};
