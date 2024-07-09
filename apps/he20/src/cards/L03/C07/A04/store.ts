import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L03C07A04 = atom<TCardType>({
  key: 'L03C07A04',
  default: {
    p02: {
      answer: '',
      isSubmitted: false,
      audioData: {},
    },
    p03: {
      contents: ['', ''],
      isSubmitted: false,
    },
  },
});

type TCardType = {
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    answer?: string;
    contents?: string[];
  };
};
