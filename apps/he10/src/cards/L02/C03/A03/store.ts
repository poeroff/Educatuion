import { atom } from 'recoil';
import { IAudioData } from '@maidt-cntn/ui';

export const L02C03A03 = atom<TL02C03A03>({
  key: 'L02C03A03',
  default: {
    p01: {
      isSubmitted: false,
      audioData: {
        1: {},
        2: {},
        3: {},
        4: {},
      },
      listeningData: [false, false, false, false],
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
        value5: '',
        value6: '',
      },
      listeningData: [false, false],
      audioData: { 2: {}, 4: {} },
      isSubmitted: false,
    },
  },
});

type TL02C03A03 = {
  [key: string]: {
    answer?: { [key: string]: string };
    listeningData?: boolean[];
    isSubmitted: boolean;
    audioData?: { [key in number]: IAudioData | null };
  };
};
