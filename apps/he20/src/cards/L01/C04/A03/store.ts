import { userSubmissionType } from '@maidt-cntn/api';
import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L01C04A03 = atom<ICardType>({
  key: 'L01C04A03',
  default: {
    p01: {
      data: [
        { contents: '1. What kind of companion animal do you have or want to have?', userAnswer: '' },
        { contents: '2. What are they like, and what is important for raising them?', userAnswer: '' },
        { contents: '3. What else should you do for their well-being?', userAnswer: '' },
        { contents: '4. How should you manage their diet and why?', userAnswer: '' },
      ],
      solution: [
        '1. a Welsh Corgi',
        '2. Welsh Corgis are highly active, so it’s important to play with them a lot to keep them happy',
        '3. You should be careful when walking them on the hot summer days',
        '4. It is important to pay close attention to their food consumption since they tend to gain weight easily.',
      ],
      isSubmitted: false,
    },
    p03: {
      answer: ['', '', '', '', '', '', ''],
      isSubmitted: false,
      audioData: {},
    },
    p04: {
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
          type: 'TEXT',
          value: values[6],
        },
        {
          subKey: 8,
          type: 'AUDIO',
          value: {},
        },
      ],
    },
  ];
};

export const getUserSubmissionStore04 = (values: string[]): userSubmissionType[] => {
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
