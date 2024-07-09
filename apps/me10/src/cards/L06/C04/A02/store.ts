import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L06C04A02 = atom<TAL06C04A02>({
  key: 'L06C04A02',
  default: {
    P01: {
      userInput: '',
      isSubmitted: false,
    },
    P02: {
      userInput1: '',
      userInput2: '',
      userInput3: '',
      userInput4: '',
      isSubmitted: false,
      solutions: ['King Sejong', 'very smart and caring', 'invented Hangeul for his people', 'help people'],
    },
    P03: {
      userInput1: '',
      userInput2: '',
      userInput3: '',
      userInput4: '',
      solution: 'My role model is King Sejong. He was very smart and caring. He invented Hangeul for his people. I want to help people, too.',
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

type TAL06C04A02 = {
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    userInputNumber?: number;
    userInput?: string;
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
