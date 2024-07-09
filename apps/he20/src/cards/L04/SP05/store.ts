import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L04SP05 = atom<{
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    answer1: string;
  };
}>({
  key: 'L04SP05',
  default: {
    p01: {
      isSubmitted: false,
      answer1: '',
      audioData: {},
    },
    p02: {
      isSubmitted: false,
      answer1: '',
      audioData: {},
    },
  },
});
