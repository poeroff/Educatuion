import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L03C03A03 = atom<TL03C03A03>({
  key: 'L03C03A03',
  default: {
    p01: {
      isSubmitted: false,
      audioData: {},
      listeningData: [false, false, false, false],
    },
    p02: {
      answer: '',
      audioData: {},
      isSubmitted: false,
    },
    p03: {
      answer: '',
      audioData: {},
      isRecordDone: [true, false, false, false],
      isSubmitted: false,
    },
  },
});

type TL03C03A03 = {
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    answer?: string;
    isRecordDone?: boolean[];
    listeningData?: boolean[];
  };
};
