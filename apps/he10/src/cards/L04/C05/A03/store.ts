import { atom } from 'recoil';

export const L04C05A03 = atom<TL04C05A03>({
  key: 'L04C05A03',
  default: {
    p01: {
      answer: 0,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
      data: [
        { text: 'an action or procedure that is taken to achieve a particular aim' },
        { text: 'the physical or chemical process of obtaining something from a source' },
        { text: 'able to be maintained for a long time without harming the environment' },
      ],
      context: 'The extraction of DNA from blood helps us study genetic diseases.',
      underlineText: 'extraction',
    },
    p02: {
      answer: 0,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
      data: [
        { text: 'to give attention or consideration to something' },
        { text: 'to use something, such as by eating or drinking it' },
        { text: 'to be maintained for a long time without harming the environment' },
      ],
      context: 'It is important to consume fruits and vegetables for a healthy diet.',
      underlineText: 'consume',
    },
    p03: {
      answer: 0,
      solution: 3,
      isCorrect: false,
      isSubmitted: false,
      data: [
        { text: 'an action or procedure that is taken to achieve a particular aim' },
        { text: 'the physical or chemical process of obtaining something from a source' },
        { text: 'able to be maintained for a long time without harming the environment' },
      ],
      context: 'Developing renewable energy sources is crucial for a sustainable future.',
      underlineText: 'sustainable',
    },
    p04: {
      answer: 0,
      solution: 1,
      isCorrect: false,
      isSubmitted: false,
      data: [
        { text: 'an action or procedure that is taken to achieve a particular aim' },
        { text: 'the physical or chemical process of obtaining something from a source' },
        { text: 'able to be maintained for a long time without harming the environment' },
      ],
      context: 'The community needs to install more security cameras as a safety measure.',
      underlineText: 'measure',
    },
    p05: {
      answer: 0,
      solution: 1,
      isCorrect: false,
      isSubmitted: false,
      data: [
        { text: 'to give attention or consideration to something' },
        { text: 'to use something, such as by eating or drinking it' },
        { text: 'to be maintained for a long time without harming the environment' },
      ],
      context: 'Take into account both positive and negative aspects before making a decision.',
      underlineText: 'Take into account',
    },
    p06: {
      answer: 0,
      solution: 1,
      isCorrect: false,
      isSubmitted: false,
      data: [
        { text: 'of considerable importance, size, or value' },
        { text: 'an action or procedure that is taken to achieve a particular aim' },
        { text: 'able to be maintained for a long time without harming the environment' },
      ],
      context: 'The heavy rain caused substantial damage to multiple sections of the highway.',
      underlineText: 'substantial',
    },
  },
});

type TL04C05A03 = {
  p01: IL04C05A03;
  p02: IL04C05A03;
  p03: IL04C05A03;
  p04: IL04C05A03;
  p05: IL04C05A03;
  p06: IL04C05A03;
};

interface IL04C05A03 {
  answer: number;
  solution: number;
  isCorrect: boolean;
  isSubmitted: boolean;
  data: { text: string }[];
  context: string;
  underlineText: string;
}
