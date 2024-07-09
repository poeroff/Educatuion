import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L04C03A03 = atom<TL04C03A03>({
  key: 'L04C03A03',
  default: {
    p01: {
      audioData: {},
      isSubmitted: false,
      isRecordDone: [false, false, false, false],
      isListenDone: [false, false, false, false],
    },
    p02: {
      answer: ['', '', ''],
      audioData: {},
      isSubmitted: false,
      isRecordDone: [false],
    },
    p03: {
      answer: ['', ''],
      audioData: {},
      isRecordDone: [false, false, false, false],
      isSubmitted: false,
    },
  },
});

type TL04C03A03 = {
  [key: string]: {
    answer?: string[];
    audioData?: { [key in string]: IAudioData | null };
    isListenDone?: boolean[];
    isRecordDone?: boolean[];
    isSubmitted: boolean;
  };
};
