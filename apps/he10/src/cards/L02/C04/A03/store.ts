import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L02C04A03 = atom<TL02C04A03>({
  key: 'L02C04A03',
  default: {
    p01: {
      contents: [
        '1. Who is your favorite author?',
        `2. What is the author's most famous book?`,
        '3. What kind of book is it, and what is it about?',
        '4. What message does the author have for readers?',
      ],
      answer: ['', '', '', ''],
      solutions: [
        'Barbara O’Connor\n',
        'How to Steal a Dog\n',
        `It is a fictional story about a girl who tries to steal a dog to get the reward money and support her family.\n`,
        'The author told people to make sure to consider what is right and wrong even in difficult situations.',
      ],
      isSubmitted: false,
    },
    p03: {
      answer: ['', '', '', '', '', ''],
      isSubmitted: false,
      audioData: {},
    },
    p05: {
      answer: ['', '', '', ''],
      isSubmitted: false,
    },
  },
});

type TL02C04A03 = {
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    answer?: string[];
    contents?: string[];
    solutions?: string[];
  };
};
