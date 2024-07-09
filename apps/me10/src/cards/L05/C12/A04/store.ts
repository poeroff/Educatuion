import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L05C12A04 = atom<{
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [x: string]: IAudioData | null };
    solution?: string;
  };
}>({
  key: 'L05C12A04',
  default: {
    p01: {
      isSubmitted: false,
      audioData: {},
      solution: `I’m going to play soccer.`,
    },
    p02: {
      isSubmitted: false,
      audioData: {},
      solution: `Why don’t you go see a doctor?`,
    },
  },
});
