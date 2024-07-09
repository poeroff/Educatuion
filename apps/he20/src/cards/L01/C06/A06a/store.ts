import { atom } from 'recoil';
import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

export const L01_C06_A06a = atom<TL01C06A06a>({
  key: 'L01C06A06a',
  default: {
    common: {
      headerInfo: {
        headerText: 'Volunteering at an Animal Sanctuary(4)',
      },
      questionInfo: {
        text: 'Q4. How are desirable behaviors encouraged in positive reinforcement training?',
        size: 'medium',
      },
      imageSrc: '/L03/C08/A05/HE1-L03-C08-A05-P01.jpg',
    },
    p02: {
      answer: {
        value1: '',
      },
      solution: { value1: 'They are encouraged using rewards.' },
      isSubmitted: false,
    },
  },
});

type TL01C06A06a = {
  common: {
    headerInfo: TMainHeaderInfoTypes;
    questionInfo: IQuestionProps;
    imageSrc: string;
  };
  p02: {
    answer: { [key: string]: string };
    solution: { [key: string]: string };
    isSubmitted: boolean;
  };
};
