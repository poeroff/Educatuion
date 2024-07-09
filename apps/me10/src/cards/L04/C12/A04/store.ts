import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L04C12A04 = atom<{
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [x: string]: IAudioData | null };
    solution?: string;
  };
}>({
  key: 'L04C12A04',
  default: {
    p01: {
      isSubmitted: false,
      audioData: {},
      solution: `I’m so excited`,
    },
    p02: {
      isSubmitted: false,
      audioData: {},
      solution: `How can I get there? 또는 Where is it?`,
    },
  },
});
