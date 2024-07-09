import { atom } from 'recoil';
import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

export const L03_C08_A05b = atom<TL03C08A05b>({
  key: 'L03C08A05b',
  default: {
    common: {
      headerInfo: {
        headerText: 'Point 2 : Practice',
      },
      questionInfo: {
        text: 'Rewrite the sentences using the structure above.',
        size: 'medium',
      },
      imageSrc: '/L03/C08/A05/HE1-L03-C08-A05-P01.jpg',
      udl: [
        '이미지에는 문장이 퍼즐 조각처럼 나뉘어져 있다 :',
        '첫 번째 조각 : "It" 는 빨간색으로 강조되어 있다.',
        '두 번째 조각 : "is possible" 는 검은색으로 표시되어 있다.',
        '세 번째 조각 : "for drivers" 는 파란색으로 강조되어 있다.',
        '네 번째 조각 : "to focus on driving without being disturbed." 는 빨간색으로 강조된 부분 (“to focus”) 과 검은색으로 표시된 부분이 있다',
      ],
    },
    p01: {
      answer: {
        value1: '',
        value2: '',
      },
      solution: { value1: 'us', value2: 'feel' },
      isCorrect: {
        value1: false,
        value2: false,
      },
      isSubmitted: false,
    },
    p02: {
      answer: {
        value1: '',
        value2: '',
      },
      solution: { value1: 'individuals', value2: 'be aware of' },
      isCorrect: {
        value1: false,
        value2: false,
      },
      isSubmitted: false,
    },
    p03: {
      answer: {
        value1: '',
        value2: '',
      },
      solution: { value1: 'teenagers', value2: 'learn' },
      isCorrect: {
        value1: false,
        value2: false,
      },
      isSubmitted: false,
    },
  },
});

type TL03C08A05b = {
  common: {
    headerInfo: TMainHeaderInfoTypes;
    questionInfo: IQuestionProps;
    imageSrc: string;
    udl: string[];
  };
  p01: {
    answer: { [key: string]: string };
    solution: { [key: string]: string };
    isCorrect: { [key: string]: boolean };
    isSubmitted: boolean;
  };
  p02: {
    answer: { [key: string]: string };
    solution: { [key: string]: string };
    isCorrect: { [key: string]: boolean };
    isSubmitted: boolean;
  };
  p03: {
    answer: { [key: string]: string };
    solution: { [key: string]: string };
    isCorrect: { [key: string]: boolean };
    isSubmitted: boolean;
  };
};
