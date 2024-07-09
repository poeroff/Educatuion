import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L04C02A04 = atom<TL04C02A04>({
  key: 'L04C02A04',
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

type TL04C02A04 = {
  [key: string]: {
    answer?: string[];
    audioData?: Record<string, IAudioData | null>;
    isRecordDone?: boolean[];
    isSubmitted: boolean;
  };
};
