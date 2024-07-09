import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L02C02A09 = atom<TL02C02A09>({
  key: 'ME10L02C02A09',
  default: {
    p01: {
      isSubmitted: false,
      audioData: { 1: {}, 2: {}, 3: {}, 4: {} },
      isAudioPlayed: [false, false, false, false],
    },
    p02: {
      isSubmitted: false,
      audioData: { 1: {}, 2: {} },
      isAudioPlayed: [false, false],
      answer1: '',
      answer2: '',
    },
    p03: {
      isSubmitted: false,
      audioData: { 1: {}, 2: {} },
      isAudioPlayed: [false, false],
      answer1: '',
      answer2: '',
    },
    p04: {
      isSubmitted: false,
      audioData: { 1: {}, 2: {} },
      isAudioPlayed: [false, false],
      answer1: '',
      answer2: '',
    },
  },
});

type TL02C02A09 = {
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    isAudioPlayed?: boolean[];
    answer1?: string;
    answer2?: string;
  };
};
