import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L07C04A02 = atom<TL07C04A02>({
  key: 'ME10L07C04A02',
  default: {
    p02: {
      isSubmitted: false,
      answer: ['', '', ''],
      canvasDataURL: '',
    },
    p03: {
      answer: ['', '', '', '', '', ''],
      isSubmitted: false,
      audioData: {},
    },
    p04: {
      answer: ['', ''],
      isSubmitted: false,
    },
  },
});

type TL07C04A02 = {
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    answer?: string[];
    canvasDataURL?: string;
  };
};
