import { atom } from 'recoil';
import { IAudioData } from '@maidt-cntn/ui';

export const L02SP02 = atom<TL02SP02>({
  key: 'L02SP02',
  default: {
    p09: {
      audioData: {},
      isSubmitted: false,
    },
    p10: {
      audioData: {},
      isSubmitted: false,
    },
    p11: {
      audioData: {},
      isSubmitted: false,
    },
    p12: {
      audioData: {},
      isSubmitted: false,
    },
    p13: {
      answer: undefined,
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL02SP02 = {
  p09: {
    audioData: { [key: string]: IAudioData | null };
    isSubmitted: boolean;
  };
  p10: {
    audioData: { [key: string]: IAudioData | null };
    isSubmitted: boolean;
  };
  p11: {
    audioData: { [key: string]: IAudioData | null };
    isSubmitted: boolean;
  };
  p12: {
    audioData: { [key: string]: IAudioData | null };
    isSubmitted: boolean;
  };
  p13: {
    answer: number | undefined;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
