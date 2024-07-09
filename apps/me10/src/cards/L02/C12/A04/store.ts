import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L02C12A04 = atom<{
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [x: string]: IAudioData | null };
    solution?: string;
  };
}>({
  key: 'L02C12A04',
  default: {
    p01: {
      isSubmitted: false,
      audioData: {},
      solution: `It’s sunny.`,
    },
    p02: {
      isSubmitted: false,
      audioData: {},
      solution: `She’s writing notes.`,
    },
  },
});
