import { userSubmissionType } from '@maidt-cntn/api';
import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L01C05A02 = atom<TCardType>({
  key: 'L01C05A02',
  default: {
    p02: {
      answer: '',
      isSubmitted: false,
      audioData: {},
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
        },
        {
          subKey: 2,
          type: 'AUDIO',
          value: {},
        },
      ],
    },
  ];
};

type TCardType = {
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    answer?: string;
  };
};
