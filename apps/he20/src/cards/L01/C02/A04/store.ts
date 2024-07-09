import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L01C02A04 = atom<TL01C02A04>({
  key: 'L01C02A04',
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

type TL01C02A04 = {
  [key: string]: {
    answer?: string[];
    audioData?: Record<string, IAudioData | null>;
    isRecordDone?: boolean[];
    isSubmitted: boolean;
  };
};
