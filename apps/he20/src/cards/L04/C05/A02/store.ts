import { atom } from 'recoil';
import { IAudioData } from '@maidt-cntn/ui';

export const L04C05A02 = atom<TL04C05A02>({
  key: 'L04C05A02',
  default: {
    p02: {
      isSubmitted: false,
      answer: '',
      audioData: {},
    },
  },
});

type TL04C05A02 = {
  [key: string]: {
    answer?: string;
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
  };
};
