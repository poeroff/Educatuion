import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L02C04A03 = atom<TCardType>({
  key: 'L02C04A03',
  default: {
    p01: {
      answer: ['', '', ''],
      questions: [
        'What do you want to sell?',
        'Which feature would you like to emphasize in the advertisement?',
        'What kind of promotion can you offer for the product?',
      ],
      isSubmitted: false,
    },
    p03: {
      answer: ['', '', '', ''],
      audioData: {},
      isSubmitted: false,
    },
    p05: {
      answer: ['', '', '', '', ''],
      isSubmitted: false,
    },
  },
});

type TCardType = {
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    answer?: string[];
    questions?: string[];
  };
};
