import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L01C03A03 = atom<{
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    answer1?: string;
  };
}>({
  key: 'L01C03A03',
  default: {
    p01: {
      isSubmitted: false,
      audioData: {
        1: {},
        2: {},
        3: {},
        4: {},
      },
    },
    p02: {
      answer1: '',
      isSubmitted: false,
      audioData: {
        2: {},
      },
    },
    p03: {
      answer1: '',
      isSubmitted: false,
      audioData: {
        2: {},
        3: {},
      },
    },
  },
});
