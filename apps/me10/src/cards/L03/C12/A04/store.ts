import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L03C12A04 = atom<{
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [x: string]: IAudioData | null };
    solution?: string;
  };
}>({
  key: 'L03C12A04',
  default: {
    p01: {
      isSubmitted: false,
      audioData: {},
      solution: `Of course.`,
    },
    p02: {
      isSubmitted: false,
      audioData: {},
      solution: `I hurt my arm.`,
    },
  },
});
