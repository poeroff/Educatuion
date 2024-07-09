import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L02C07A04 = atom<TCardType>({
  key: 'L02C07A04',
  default: {
    p02: {
      answer1: '',
      isSubmitted: false,
      audioData: {},
    },
    p03: {
      answer: ['', ''],
      isSubmitted: false,
    },
  },
});

type TCardType = {
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    answer1?: string;
    answer?: string[];
    contents?: string[];
  };
};
