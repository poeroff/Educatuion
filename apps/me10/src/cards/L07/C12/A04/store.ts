import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L07C12A04 = atom<{
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [x: string]: IAudioData | null };
    solution?: string;
  };
}>({
  key: 'L07C12A04',
  default: {
    p01: {
      isSubmitted: false,
      audioData: {},
      solution: `I don’t know much about it.`,
    },
    p02: {
      isSubmitted: false,
      audioData: {},
      solution: `It’s a cold desert.`,
    },
  },
});
