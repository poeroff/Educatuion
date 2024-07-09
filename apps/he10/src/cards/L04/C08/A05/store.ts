import { atom } from 'recoil';
import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

export const L04_C08_A05 = atom<TL04C08A05>({
  key: 'L04C08A05',
  default: {
    common: {
      headerInfo: {
        headerText: 'Point 2 : Practice',
      },
      questionInfo: {
        text: 'Combine the two sentences using the given expressions.',
        size: 'medium',
      },
      imageSrc: '/L04/C08/A05/HE1-L04-C08-A05-P01.jpg',
      udl: [
        '이미지에는 문장이 퍼즐 조각처럼 나뉘어져 있다 :',
        '첫 번째 조각 : "Reusable cups"는 검은색으로 표시되어 있다.',
        '두 번째 조각 : "not only" 는 빨간색으로 강조되어 있다.',
        '세 번째 조각 : "have an appealing appearance" 는 "have" 가 파란색으로 강조되어 있으며 나머지는 검은색으로 표시되어 있다.',
        '네 번째 조각 : "but (also)" 는 빨간색으로 강조되어 있다.',
        '다섯 번째 조각 : "preserve the taste of the coffee." 는 "preserve" 가 파란색으로 강조되어 있으며 나머지는 검은색으로 표시되어 있다.',
      ],
    },
    p01: {
      answer: {
        value1: '',
      },
      solution: { value1: 'not a singer but an actor' },
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer: {
        value1: '',
      },
      solution: { value1: 'not only exercises regularly but also maintains a healthy diet' },
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer: {
        value1: '',
      },
      solution: { value1: 'either watching movies or playing games' },
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL04C08A05 = {
  common: {
    headerInfo: TMainHeaderInfoTypes;
    questionInfo: IQuestionProps;
    imageSrc: string;
    udl: string[];
  };
  p01: {
    answer: { [key: string]: string };
    solution: { [key: string]: string };
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p02: {
    answer: { [key: string]: string };
    solution: { [key: string]: string };
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p03: {
    answer: { [key: string]: string };
    solution: { [key: string]: string };
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
