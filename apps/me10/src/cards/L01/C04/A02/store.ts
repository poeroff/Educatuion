import { atom } from 'recoil';
import { IAudioData } from '@maidt-cntn/ui';

export const L01C04A02 = atom<{
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    answer?: number;
    solution?: number;
    isCorrect?: boolean;
    answerList?: string[];
    answer1?: string;
    answer2?: string;
    answer3?: string;
    answer4?: string;
    answer5?: string;
    answer6?: string;
  };
}>({
  key: 'TL01C04A02',
  default: {
    p01: {
      answer: 0,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      answer5: '',
      answer6: '',
      isSubmitted: false,
    },
    p04: {
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      answer5: '',
      answer6: '',
      isSubmitted: false,
      audioData: {},
    },
    p05: {
      answerList: ['', ''],
      isSubmitted: false,
    },
  },
});
