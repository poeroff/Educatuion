import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L01C04A03 = atom<TCardType>({
  key: 'L01C04A03',
  default: {
    p01: {
      contents: [
        'What are you worried about as a newcomer?',
        'How can you overcome these concerns? Write 2 solutions.',
        'What would you say to encourage other newcomers?',
      ],
      answer: ['', '', ''],
      isSubmitted: false,
    },
    p03: {
      answer: ['', '', '', '', ''],
      isSubmitted: false,
      audioData: {},
    },
    p04: {
      answer: ['', '', '', ''],
      isSubmitted: false,
    },
  },
});

type TCardType = {
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    answer?: string[];
    contents?: string[];
  };
};
