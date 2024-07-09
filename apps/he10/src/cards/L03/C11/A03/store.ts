import { atom } from 'recoil';
import { IAudioData } from '@maidt-cntn/ui';

export const L03C11A03 = atom<TL03C11A03>({
  key: 'L03C11A03',
  default: {
    p01: {
      audioData: {},
      isSubmitted: false,
    },
    p02: {
      isSubmitted: false,
      audioData: {},
      isAudioPlayed: [false, false, false, false, false, false],
    },
  },
});

type TL03C11A03 = {
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    isAudioPlayed?: boolean[];
  };
};
