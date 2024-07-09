import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L03C02A04 = atom<{
  [key: string]: {
    isSubmitted: boolean;
    audioData?: Record<string, IAudioData | null>;
    answers?: string[];
  };
}>({
  key: 'L03C02A04',
  default: {
    p01: {
      isSubmitted: false,
      audioData: { 1: null, 2: null, 3: null, 4: null },
    },
    p02: {
      isSubmitted: false,
      answers: ['', '', ''],
      audioData: { 4: null },
    },
  },
});
