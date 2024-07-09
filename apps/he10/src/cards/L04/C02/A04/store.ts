import { atom } from 'recoil';
import { IAudioData } from '@maidt-cntn/ui';

export const L04C02A04 = atom<TL04C02A04>({
  key: 'L04C02A04',
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
  },
});

type TL04C02A04 = {
  [key: string]: {
    answer?: { [key: string]: string };
    listeningData?: boolean[];
    isSubmitted: boolean;
    audioData?: { [key in number]: IAudioData | null };
  };
};
