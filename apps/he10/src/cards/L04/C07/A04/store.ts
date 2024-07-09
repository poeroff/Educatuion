import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

const L04C07A04State = atom<TL04C07A04>({
  key: 'L04C07A04State',
  default: {
    p02: {
      answer: '',
      audioData: {},
      isSubmitted: false,
    },
    p03: {
      value1: undefined,
      value2: undefined,
      isSubmitted: false,
    },
  },
});

type TL04C07A04 = {
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    answer?: string;
    value1?: string;
    value2?: string;
  };
};

export default L04C07A04State;
