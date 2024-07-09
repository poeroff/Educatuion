import { userSubmissionType } from '@maidt-cntn/api';
import { atom } from 'recoil';

export const L01C06A04a = atom({
  key: 'L01C06A04a',
  default: {
    p02: {
      answer: '',
      solution: 'They chopped bananas instead of the sugarcane for the elephants with weak teeth.',
      isSubmitted: false,
    },
  },
});

export const getUserSubmissionStore = (value: string): userSubmissionType[] => {
  return [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: value,
          isAnswer: true,
        },
      ],
    },
  ];
};
