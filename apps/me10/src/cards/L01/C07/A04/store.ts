import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L01C07A04 = atom<{
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    answer1?: string;
  };
}>({
  key: 'L01C07A04',
  default: {
    p02: {
      answer1: '',
      audioData: {},
      isSubmitted: false,
    },
  },
});
