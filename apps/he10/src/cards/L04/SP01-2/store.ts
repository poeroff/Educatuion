import { atom } from 'recoil';

const L04SP012State = atom<TL04C07A04>({
  key: 'L04SP012State',
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
  p19: {
    clickedChipButtons: number[];
    isSubmitted: boolean;
  };
  p20: {
    clickedChipButtons: number[];
    isSubmitted: boolean;
  };
};

export default L04SP012State;
