import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L05C02A09 = atom<TL05C02A09>({
  key: 'ME10L05C02A09',
  default: {
    p01: {
      isSubmitted: false,
      audioData: { 1: {}, 2: {}, 3: {} },
      isAudioPlayed: [false, false, false],
    },
    p02: {
      isSubmitted: false,
      audioData: { 1: {}, 2: {} },
      isAudioPlayed: [false],
      answer: '',
    },
    p03: {
      isSubmitted: false,
      audioData: { 1: {} },
      isAudioPlayed: [false, false],
      answer: '',
    },
  },
});

type TL05C02A09 = {
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    isAudioPlayed?: boolean[];
    answer?: string;
  };
};
