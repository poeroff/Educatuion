import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L04C07A04 = atom<{
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    answer1?: string;
    answer?: string[];
  };
}>({
  key: 'L04C07A04',
  default: {
    p02: {
      isSubmitted: false,
      answer1: '',
      audioData: {},
    },
    p03: {
      answer: ['', ''],
      isSubmitted: false,
    },
  },
});
