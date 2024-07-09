import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L03C04A03 = atom<TCardType>({
  key: 'L03C04A03',
  default: {
    p01: {
      answer: ['', '', '', ''],
      questions: [
        `What is the museum's main theme?`,
        'What exhibits can be found in the museum? Which one is the most famous?',
        'How have visitors responded to their museum experiences?',
        'What are some of the things that you are not allowed to do in the museum?',
      ],
      isSubmitted: false,
    },
    p03: {
      answer: ['', '', '', '', '', ''],
      audioData: {},
      isSubmitted: false,
    },
    p04: {
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
