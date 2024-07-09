import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L02C02A04 = atom<TL02C02A04>({
  key: 'L02C02A04',
  default: {
    p01: {
      audioData: {},
      isSubmitted: false,
    },
    p02: {
      answer: ['', ''],
      audioData: {},
      isSubmitted: false,
    },
  },
});

type TL02C02A04 = {
  [key: string]: {
    answer?: string[];
    audioData?: Record<string, IAudioData | null>;
    isRecordDone?: boolean[];
    isSubmitted: boolean;
  };
};
