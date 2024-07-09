import { atom } from 'recoil';
import { IAudioData } from '@maidt-cntn/ui';

export const L04C03A03 = atom<TL04C03A03>({
  key: 'L04C03A03',
  default: {
    p01: {
      isSubmitted: false,
      audioData: {
        1: {},
        2: {},
        3: {},
      },
      listeningData: [false, false, false],
    },
    p02: {
      answer: {
        value1: '',
        value2: '',
      },
      audioData: { 1: {} },
      isSubmitted: false,
    },
    p03: {
      answer: {
        value4: '',
        value5: '',
      },
      listeningData: [false, false],
      audioData: { 2: {} },
      isSubmitted: false,
    },
  },
});

type TL04C03A03 = {
  [key: string]: {
    answer?: { [key: string]: string };
    listeningData?: boolean[];
    isSubmitted: boolean;
    audioData?: { [key in number]: IAudioData | null };
  };
};
