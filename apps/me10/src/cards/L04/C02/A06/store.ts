import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L04C02A06 = atom<TL04C02A06>({
  key: 'L04C02A06',
  default: {
    P01: {
      audioData: { 1: {}, 2: {} },
      listenComplete: { 1: false, 2: false },
      isSubmitted: false,
    },
    P02: {
      audioData: { 1: {} },
      listenComplete: { 1: false },
      isSubmitted: false,
      answer: '',
    },
    P03: {
      audioData: { 1: {} },
      listenComplete: { 1: false },
      isSubmitted: false,
      answer: '',
    },
  },
});

export type TL04C02A06 = {
  [key in string]: {
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    listenComplete?: { [key in string]: boolean | undefined };
    answer?: string;
  };
};
