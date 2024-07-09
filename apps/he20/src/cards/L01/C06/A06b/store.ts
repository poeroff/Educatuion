import { atom } from 'recoil';
import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

export const L01_C06_A06b = atom<TL01C06A06b>({
  key: 'L01C06A06b',
  default: {
    common: {
      headerInfo: {
        headerText: 'Volunteering at an Animal Sanctuary(4)',
      },
      questionInfo: {
        text: 'Q4. Fill in the blank to complete the sentences.',
        size: 'medium',
      },
      imageSrc: '/L03/C08/A05/HE1-L03-C08-A05-P01.jpg',
    },
    p02: {
      answer: {
        value1: '',
      },
      solution: { value1: 'rewards' },
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL01C06A06b = {
  common: {
    headerInfo: TMainHeaderInfoTypes;
    questionInfo: IQuestionProps;
    imageSrc: string;
  };
  p02: {
    answer: { [key: string]: string };
    solution: { [key: string]: string };
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
