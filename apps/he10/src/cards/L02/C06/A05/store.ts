import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L02C06A05 = atom<TCardType>({
  key: 'L02C06A05',
  default: {
    p02: {
      answer: ['', ''],
      isSubmitted: false,
    },
  },
});

type TCardType = {
  [key: string]: {
    isSubmitted: boolean;
    audioData?: (IAudioData | null)[];
    answer?: string[];
    contents?: string[];
  };
};
