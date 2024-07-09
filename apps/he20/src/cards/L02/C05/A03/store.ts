import { atom } from 'recoil';

export const L02C05A03 = atom<TL02C05A03>({
  key: 'L02C05A03',
  default: {
    p01: {
      answer: 0,
      solution: 1,
      isCorrect: false,
      isSubmitted: false,
      data: [
        { text: 'having or providing enough' },
        { text: 'on purpose; in a way that is intended or planned' },
        { text: 'controlling others for one’s own advantage, often unfairly' },
      ],
      context: 'Her explanation was sufficient for everyone to believe.',
      underlineText: 'sufficient',
    },
    p02: {
      answer: 0,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
      data: [
        { text: 'to officially prohibit something' },
        { text: 'to be harmed or affected in a negative way' },
        { text: 'controlling others for one’s own advantage, often unfairly' },
      ],
      context: 'You may fall prey to misinformation if you don’t check the facts.',
      underlineText: 'fall prey to',
    },
    p03: {
      answer: 0,
      solution: 3,
      isCorrect: false,
      isSubmitted: false,
      data: [
        { text: 'having or providing enough' },
        { text: 'on purpose; in a way that is intended or planned' },
        { text: 'controlling others for one’s own advantage, often unfairly' },
      ],
      context: 'The manipulative businessman knew exactly how to trick his customers.',
      underlineText: 'manipulative',
    },
    p04: {
      answer: 0,
      solution: 1,
      isCorrect: false,
      isSubmitted: false,
      data: [
        { text: 'to officially prohibit something' },
        { text: 'to be harmed or affected in a negative way' },
        { text: 'controlling others for one’s own advantage, often unfairly' },
      ],
      context: 'Some companies ban the use of personal digital devices to keep data secure.',
      underlineText: 'ban',
    },
    p05: {
      answer: 0,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
      data: [
        { text: 'commonly or widely accepted; widespread' },
        { text: 'on purpose; in a way that is intended or planned' },
        { text: 'controlling others for one’s own advantage, often unfairly' },
      ],
      context: 'She deliberately avoided mentioning the sensitive issue during the meeting.',
      underlineText: 'deliberately',
    },
    p06: {
      answer: 0,
      solution: 1,
      isCorrect: false,
      isSubmitted: false,
      data: [
        { text: 'commonly or widely accepted; widespread' },
        { text: 'on purpose; in a way that is intended or planned' },
        { text: 'controlling others for one’s own advantage, often unfairly' },
      ],
      context: 'English has become a prevalent second language in many countries, enabling global communication.',
      underlineText: 'prevalent',
    },
  },
});

type TL02C05A03 = {
  p01: IL02C05A03;
  p02: IL02C05A03;
  p03: IL02C05A03;
  p04: IL02C05A03;
  p05: IL02C05A03;
  p06: IL02C05A03;
};

interface IL02C05A03 {
  answer: number;
  solution: number;
  isCorrect: boolean;
  isSubmitted: boolean;
  data: { text: string }[];
  context: string;
  underlineText: string;
}
