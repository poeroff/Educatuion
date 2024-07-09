import { atom } from 'recoil';

export const L03C08A05a = atom<{
  [key: string]: {
    answer: string;
    solution: string;
    isSubmitted: boolean;
  };
}>({
  key: 'L01C03A05a',
  default: {
    p01: {
      answer: '',
      solution: 'for us to feel the popularity of Korean food around the world',
      isSubmitted: false,
    },
    p02: {
      answer: '',
      solution: 'for individuals to be aware of the impact of misinformation on public opinion',
      isSubmitted: false,
    },
    p03: {
      answer: '',
      solution: 'for teenagers to learn how to apologize properly when they do something wrong',
      isSubmitted: false,
    },
  },
});
