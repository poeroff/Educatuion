import { atom } from 'recoil';
import { IAudioData } from '@maidt-cntn/ui';

export const L03C05A02 = atom<TL03C05A02>({
  key: 'L03C05A02',
  default: {
    p03: {
      isSubmitted: false,
      answer: '',
      audioData: {},
    },
  },
});

type TL03C05A02 = {
  [key: string]: {
    answer?: string;
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
  };
};
