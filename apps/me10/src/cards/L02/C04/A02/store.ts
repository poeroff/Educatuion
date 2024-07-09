import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L02C04A02 = atom<TL02C04A02>({
  key: 'L02C04A02',
  default: {
    p01: {
      answer: -1,
      solution: 2,
      isSubmitted: false,
      isCorrect: false,
    },
    p03: {
      answer1: '',
      answer2: '',
      answer3: '',
      egSolution: [
        {
          question: `What is the city's name?`,
          solution: 'In Seoul, Korea.',
        },
        {
          question: 'What is the weather like?',
          solution: `It's warm and sunny.`,
        },
        {
          question: 'What are people doing there?',
          solution: 'People are jogging in the park.',
        },
      ],
      isSubmitted: false,
    },
    p04: {
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      audioData: {},
      egSolution: [
        {
          solution: `Good morning.\n Welcome to today’s weather report.\n I’m Jinju Hong in Seoul, Korea.\n It’s warm and sunny.\n People are running at the park.\n That’s the weather report for today.`,
        },
      ],
      isSubmitted: false,
    },
    p05: {
      answerList: ['', ''],
      isSubmitted: false,
    },
  },
});

type TL02C04A02 = {
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    answer?: number;
    solution?: number;
    egSolution?: { question?: string; solution: string }[];
    isCorrect?: boolean;
    answerList?: string[];
    answer1?: string;
    answer2?: string;
    answer3?: string;
    answer4?: string;
  };
};
