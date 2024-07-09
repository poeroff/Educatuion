import { atom } from 'recoil';

const L04SP032State = atom<TL04SP032>({
  key: 'L04SP032State',
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
    p21: {
      clickedChipButtons: [] as number[],
      isSubmitted: false,
    },
    p22: {
      clickedChipButtons: [] as number[],
      isSubmitted: false,
    },
    p23: {
      clickedChipButtons: [] as number[],
      isSubmitted: false,
    },
    p24: {
      clickedChipButtons: [] as number[],
      isSubmitted: false,
    },
  },
});

type TL04SP032 = {
  [key: string]: any;
  p05: {
    answer: string;
    isSubmitted: boolean;
  };
  p06: {
    answer: string;
    isSubmitted: boolean;
  };
  p09: {
    answer: string;
    isSubmitted: boolean;
  };
  p10: {
    answer: string;
    isSubmitted: boolean;
  };
  p21: {
    clickedChipButtons: number[];
    isSubmitted: boolean;
  };
  p22: {
    clickedChipButtons: number[];
    isSubmitted: boolean;
  };
  p23: {
    clickedChipButtons: number[];
    isSubmitted: boolean;
  };
  p24: {
    clickedChipButtons: number[];
    isSubmitted: boolean;
  };
};

export default L04SP032State;
