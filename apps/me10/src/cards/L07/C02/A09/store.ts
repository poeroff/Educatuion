import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L07C02A09 = atom<TL07C02A09>({
  key: 'ME10L07C02A09',
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
      answer1: '',
      answer2: '',
      answer3: '',
    },
    p03: {
      isSubmitted: false,
      audioData: { 1: {}, 2: {} },
      isAudioPlayed: [false],
      answer1: '',
      answer2: '',
      answer3: '',
    },
    p04: {
      isSubmitted: false,
      audioData: { 1: {}, 2: {} },
      isAudioPlayed: [false],
      answer1: '',
      answer2: '',
      answer3: '',
    },
  },
});

type TL07C02A09 = {
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    isAudioPlayed?: boolean[];
    answer1?: string;
    answer2?: string;
    answer3?: string;
  };
};
