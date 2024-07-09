import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L03C04A03 = atom<TL03C04A03>({
  key: 'L03C04A03',
  default: {
    p01: {
      contents: [
        '1. What is an example of a nature-inspired invention?',
        `2. What inspired the invention?`,
        '3. What is the main feature of that natural element?',
        '4. What products or areas can this feature be applied to?',
      ],
      answer: ['', '', '', ''],
      solutions: [
        'the concept of hexagonal structures\n',
        'the hexagonal shape found in beehives\n',
        `The structure is strong and resistant to weight because hexagonally shaped cells are tightly connected.\n`,
        'the construction industry',
      ],
      isSubmitted: false,
    },
    p03: {
      answer: ['', '', '', '', '', ''],
      isSubmitted: false,
      audioData: {},
    },
    p04: {
      answer: ['', '', '', ''],
      isSubmitted: false,
    },
  },
});

type TL03C04A03 = {
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    answer?: string[];
    contents?: string[];
    solutions?: string[];
  };
};
