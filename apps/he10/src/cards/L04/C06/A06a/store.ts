import { atom } from 'recoil';

export const L04C06A06a = atom<TL04C06A06a>({
  key: 'L04C06A06a',
  default: {
    P02: {
      answer: '',
      isSubmitted: false,
      commentary: 'Food items such as rice chips and dried sweet potatoes are made.',
    },
  },
});

type TL04C06A06a = {
  P02: {
    answer: string;
    isSubmitted: boolean;
    commentary: string;
  };
};
