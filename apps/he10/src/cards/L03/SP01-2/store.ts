import { atom } from 'recoil';

const L03SP012State = atom<TL04C07A04>({
  key: 'L03SP012State',
  default: {
    p05: {
      answer: '',
      isSubmitted: false,
    },
    p06: {
      answer: '',
      isSubmitted: false,
    },

    p09: {
      answer: '',
      isSubmitted: false,
    },
    p10: {
      answer: '',
      isSubmitted: false,
    },

    p15: {
      inputs: ['', '', ''] as string[],
      isSubmitted: false,
    },
    p16: {
      inputs: ['', '', ''] as string[],
      isSubmitted: false,
    },

    p19: {
      clickedChipButtons: [] as number[],
      isSubmitted: false,
    },
    p20: {
      clickedChipButtons: [] as number[],
      isSubmitted: false,
    },
  },
});

type TL04C07A04 = {
  [key: string]: any;
};

export default L03SP012State;
