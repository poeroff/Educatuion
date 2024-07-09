import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L04C08A07 = atom<{
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    answer1?: string;
  };
}>({
  key: 'L04C08A07',
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
