import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L02C11A03 = atom<TL02C11A03>({
  key: 'L02C11A03',
  default: {
    P01: {
      isSubmitted: false,
      audioData: {},
    },
    P02: {
      isSubmitted: false,
      audioData: {},
      isAudioPlayed: [false, false, false, false, false, false, false, false],
    },
  },
});

type TL02C11A03 = {
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    isAudioPlayed?: boolean[];
  };
};
