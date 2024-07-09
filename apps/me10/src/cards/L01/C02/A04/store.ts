import { atom } from 'recoil';
import { IAudioData } from '@maidt-cntn/ui';

export const L01C02A04 = atom<TL01C02A04>({
  key: 'L01C02A04',
  default: {
    p01: {
      isSubmitted: false,
      audioData: {
        1: {},
        2: {},
      },
    },
    p02: {
      isSubmitted: false,
      answer: '',
      audioData: {
        2: {},
      },
      isRecordDone: false,
    },
    p03: {
      isSubmitted: false,
      answer: '',
      audioData: {
        2: {},
      },
      isRecordDone: false,
    },
  },
});

type TL01C02A04 = {
  [key: string]: {
    answer?: string;
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    isRecordDone?: boolean;
  };
};
