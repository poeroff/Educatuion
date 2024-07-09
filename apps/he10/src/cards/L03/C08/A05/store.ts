import { atom } from 'recoil';

export const L03C08A05 = atom<TL03C08A05>({
  key: 'L03C08A05',
  default: {
    P01: {
      answer: '',
      solution: 'for us to feel',
      text: [
        '1.',
        'We can feel the popularity of Korean food around the world.',
        'It is possible',
        'the popularity of Korean food around the world.',
      ],
      isSubmitted: false,
      isCorrect: false,
    },
    P02: {
      answer: '',
      solution: 'for individuals to be aware of',
      text: [
        '2.',
        'Individuals should be aware of the impact of misinformation on public opinion.',
        'It is crucial',
        'the impact of misinformation on public opinion.',
      ],
      isSubmitted: false,
      isCorrect: false,
    },
    P03: {
      answer: '',
      solution: 'for teenagers to learn',
      text: [
        '3.',
        'Teenagers need to learn how to apologize properly when they do something wrong.',
        'It is necessary',
        'how to apologize properly when they do something wrong.',
      ],
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

type TL03C08A05 = {
  [key: string]: PageData;
};

type PageData = {
  answer: string;
  solution: string;
  text: string[];
  isSubmitted: boolean;
  isCorrect?: boolean;
  commentary?: string;
};
