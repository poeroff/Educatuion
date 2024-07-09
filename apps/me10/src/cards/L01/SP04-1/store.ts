import { atom } from 'recoil';

export const L01SCP0401 = atom<TL01SCP0401>({
  key: 'L01SCP0401',
  default: {
    P13: {
      answer: '',
      solution: 'am',
      isCorrect: false,
      isSubmitted: false,
    },
    P14: {
      answer: '',
      solution: 'does',
      isCorrect: false,
      isSubmitted: false,
    },
    P15: {
      answer: '',
      solution: 'They are not sweet.',
      isCorrect: false,
      isSubmitted: false,
    },
    p16: {
      chipButtonInfo: [
        {
          text: 'His',
        },
        {
          text: 'are',
        },
        {
          text: 'ears',
        },
        {
          text: 'big',
        },
        {
          text: 'not',
        },
      ],
      answer: [
        {
          text: 'His',
        },
        {
          text: 'ears',
        },
        {
          text: 'are',
        },
        {
          text: 'not',
        },
        {
          text: 'big',
        },
      ],
      clickedChipButtons: [] as number[],
      isSubmitted: false,
    },
    p19: {
      answer: -1,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL01SCP0401 = {
  P13: IL01SCP0401P13;
  P14: IL01SCP0401P13;
  P15: IL01SCP0401P13;
  p16: {
    [key: string]: any;
  };
  p19: IL01SCP0401P19;
};
interface IL01SCP0401P19 {
  answer: number;
  solution: number;
  isCorrect: boolean;
  isSubmitted: boolean;
}

interface IL01SCP0401P13 {
  answer: string;
  solution: string;
  isCorrect: boolean;
  isSubmitted: boolean;
}
