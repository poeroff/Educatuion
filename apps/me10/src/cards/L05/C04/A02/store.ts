import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L05C04A02 = atom<TAL05C04A02>({
  key: 'L05C04A02',
  default: {
    P01: {
      userInputNumber: -1,
      solutionNumber: 2,
      isSubmitted: false,
      isCorrect: false,
    },
    P02: {
      userInput1: '',
      userInput2: '',
      userInput3: '',
      userInput4: '',
      isSubmitted: false,
      solutions: ['Noeul Park', 'June 5th 10:00 a.m.', 'plant trees in the park', 'cool and clean the air give a home and food to animals'],
    },
    P03: {
      userInput1: '',
      userInput2: '',
      userInput3: '',
      userInput4: '',
      userInput5: '',
      solution:
        'I’m going to volunteer at Noeul Park on June 5 at 10. I’m going to plant trees there. It’ll cool and clean the air. It’ll also give a home and food to animals. Why don’t you join me?',
      isSubmitted: false,
      audioData: {},
    },
    P04: {
      userInput1: '',
      userInput2: '',
      isSubmitted: false,
    },
  },
});

type TAL05C04A02 = {
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    userInputNumber?: number;
    userInput1?: string;
    userInput2?: string;
    userInput3?: string;
    userInput4?: string;
    userInput5?: string;
    solutionNumber?: number;
    solutions?: string[];
    solution?: string;
    isCorrect?: boolean;
  };
};

type test = {
  P01: {
    userInput: number;
    solution: number;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
  P02: {
    userInput: string[];
    solution: string[];
    isSubmitted: boolean;
  };
  P03: {
    userInput: string[];
    audioData: { [key in string]: IAudioData | null };
    solution: string;
    isSubmitted: boolean;
  };
  P04: {
    userInput: string[];
    isSubmitted: boolean;
  };
};
