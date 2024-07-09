import { userSubmissionType } from '@maidt-cntn/api';
import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L04C04A03 = atom<ICardType>({
  key: 'L04C04A03',
  default: {
    p01: {
      data: [
        { contents: '1. What is some positive news about our environment?', userAnswer: '' },
        { contents: '2. Why is it a positive sign for our environment?', userAnswer: '' },
        { contents: '3. What effect will it have in the future?', userAnswer: '' },
      ],
      solution: [
        '1. Sales of electric cars are on the rise.',
        '2. harmful gases emitted by gasoline-powered cars are being reduced.',
        '3. It’ll help reduce global warming significantly in the future.',
      ],
      isSubmitted: false,
    },
    p03: {
      answer: ['', '', '', '', '', ''],
      isSubmitted: false,
      audioData: {},
    },
    p05: {
      answer: ['', '', '', ''],
      isSubmitted: false,
    },
  },
});

export const getUserSubmissionStore01 = (values: string[]): userSubmissionType[] => {
  return [
    {
      mainKey: 1,
      inputData: values.map((value, index) => ({
        subKey: index + 1,
        type: 'TEXT',
        value: value,
        isAnswer: true,
      })),
    },
  ];
};

export const getUserSubmissionStore03 = (values: string[]): userSubmissionType[] => {
  return [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: values[0],
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: values[1],
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: values[2],
        },
        {
          subKey: 4,
          type: 'TEXT',
          value: values[3],
        },
        {
          subKey: 5,
          type: 'TEXT',
          value: values[4],
        },
        {
          subKey: 6,
          type: 'TEXT',
          value: values[5],
        },
        {
          subKey: 7,
          type: 'AUDIO',
          value: {},
        },
      ],
    },
  ];
};

export const getUserSubmissionStore05 = (values: string[]): userSubmissionType[] => {
  return [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: values,
          isAnswer: true,
        },
      ],
    },
  ];
};

interface ICardType {
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    answer?: string[];
    solution?: string[];
    data?: Array<IP01Data>;
  };
}

interface IP01Data {
  contents: string;
  userAnswer: string;
}
