import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L07C02A04 = atom<{
  [key: string]: {
    isSubmitted: boolean;
    answer?: string;
    listeningData?: boolean;
    audioData?: { [key in string]: IAudioData | null };
  };
}>({
  key: 'L07C02A04',
  default: {
    p01: {
      isSubmitted: false,
      audioData: {
        1: {},
        2: {},
      },
    },
    p02: {
      isSubmitted: false,
      answer: '',
      listeningData: false,
      audioData: {
        3: {},
      },
    },
    p03: {
      isSubmitted: false,
      answer: '',
      listeningData: false,
      audioData: {
        3: {},
      },
    },
  },
});
