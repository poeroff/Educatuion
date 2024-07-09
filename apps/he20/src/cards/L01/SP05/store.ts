import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L01SP05 = atom<{
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    answer?: string;
    exampleAnswerEng?: string;
  };
}>({
  key: 'L01SP05',
  default: {
    p01: {
      isSubmitted: false,
      exampleAnswerEng:
        'I think it is important to cooperate with other volunteers. Working as a team will help the volunteers achieve the common goal.',
      audioData: {},
    },
    p02: {
      answer: '',
      isSubmitted: false,
      exampleAnswerEng:
        'I want to advise you to figure out the unique characteristics of the animal you want to adopt. Each animal has different needs, so it is crucial to understand what is necessary for your companion animal. You should also check in advance if you can provide an appropriate environment for it.',
    },
  },
});
