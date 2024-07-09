import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L01C02A06 = atom<{
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    answer1?: string;
    isRecordDone?: boolean[];
  };
}>({
  key: 'L01C02A06',
  default: {
    p01: {
      isSubmitted: false,
      audioData: {},
    },
    p02: {
      answer1: '',
      isSubmitted: false,
      audioData: {},
      isRecordDone: [true, false, false],
    },
    p03: {
      answer1: '',
      isSubmitted: false,
      audioData: {},
      isRecordDone: [true, false, false],
    },
  },
});
