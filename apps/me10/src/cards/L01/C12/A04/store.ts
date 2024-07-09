import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L01C12A04 = atom<{
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [x: string]: IAudioData | null };
    solution?: string;
  };
}>({
  key: 'L01C12A04',
  default: {
    p01: {
      isSubmitted: false,
      audioData: {},
      solution: `I'm Jia. Nice to meet you, too.`,
    },
    p02: {
      isSubmitted: false,
      audioData: {},
      solution: `My favorite movie is Wonder Woman.`,
    },
  },
});
