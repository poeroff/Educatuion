import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L03C08A07 = atom<TL03C08A07>({
  key: 'L03C08A07',
  default: {
    p01: {
      isSubmitted: false,
      answer1: '',
    },
    p02: {
      isSubmitted: false,
      answer1: '',
      audioData: {},
    },
  },
});

type TL03C08A07 = {
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    answer1?: string;
  };
};

