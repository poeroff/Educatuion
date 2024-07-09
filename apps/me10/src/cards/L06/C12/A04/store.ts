import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L06C12A04 = atom<{
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [x: string]: IAudioData | null };
    solution?: string;
  };
}>({
  key: 'L06C12A04',
  default: {
    p01: {
      isSubmitted: false,
      audioData: {},
      solution: `I want to go to an amusement park with my cousins.`,
    },
    p02: {
      isSubmitted: false,
      audioData: {},
      solution: `I’m interested in trees and flowers.`,
    },
  },
});
