import { atom } from 'recoil';
import { IAudioData } from '@maidt-cntn/ui';

export const L02C05A02 = atom<TL02C05A02>({
  key: 'L02C05A02',
  default: {
    p01: {
      answer1: [],
      isSubmitted: false,
    },
    p02: {
      isSubmitted: false,
      answer2: '',
      audioData: {},
    },
  },
});

type TL02C05A02 = {
  [key: string]: {
    answer1?: number[];
    answer2?: string;
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    isRecordDone?: boolean;
  };
};
