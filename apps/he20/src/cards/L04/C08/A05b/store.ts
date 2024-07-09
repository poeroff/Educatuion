import { atom } from 'recoil';
import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

export const L04C08A05b = atom<TL04C08A05b>({
  key: 'L04C08A05b',
  default: {
    common: {
      headerInfo: {
        headerText: 'Point 2 : Practice',
      },
      questionInfo: {
        text: 'Combine the two sentences using the structure above.',
      },
      imageSrc: '/L04/C08/A05/HE2-L04-C08-A05-P01.jpg',
      udl: [
        '이미지에는 두 개의 문장이 퍼즐 조각처럼 나뉘어져 있다 :',
        `첫 번째 조각 : "There's a risk" 는 "a risk" 가 파란색으로 강조되어 있으며 나머지는 검은색으로 표시되어 있다.`,
        '두 번째 조각 : "that" 는 빨간색으로 강조되어 있다.',
        '세 번째 조각 : "organizations could access personal data without permission." 는 "organizations could access personal data without permission." 가 파란색으로 강조되어 있으며 나머지는 검은색으로 표시되어 있다.',
      ],
    },
    p01: {
      answer: {
        value1: '',
      },
      solution: { value1: 'the opinion that' },
      isSubmitted: false,
    },
    p02: {
      answer: {
        value1: '',
      },
      solution: { value1: 'a dream that' },
      isSubmitted: false,
    },
    p03: {
      answer: {
        value1: '',
      },
      solution: { value1: 'The belief that' },
      isSubmitted: false,
    },
  },
});

type TL04C08A05b = {
  common: {
    headerInfo: TMainHeaderInfoTypes;
    questionInfo: IQuestionProps;
    imageSrc: string;
    udl: string[];
  };
  p01: {
    answer: { [key: string]: string };
    solution: { [key: string]: string };
    isSubmitted: boolean;
  };
  p02: {
    answer: { [key: string]: string };
    solution: { [key: string]: string };
    isSubmitted: boolean;
  };
  p03: {
    answer: { [key: string]: string };
    solution: { [key: string]: string };
    isSubmitted: boolean;
  };
};
