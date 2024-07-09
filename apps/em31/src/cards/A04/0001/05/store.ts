import { atom } from 'recoil';

export const A04000105_store = atom<TA04000105>({
  key: 'A04000105',
  default: {
    P02: {
      answer1: '',
      answer2: '',
      solution1: '3',
      solution2: '6',
      isCorrect: false,
      isSubmitted: false,
    },
    P03: {
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      solution1: '3',
      solution2_1: '3',
      solution2_2: '6',
      solution3_1: '6',
      solution3_2: '3',
      solution4: '18',
      isCorrect: false,
      isSubmitted: false,
    },
    P04: {
      answer1: [
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
      ],
      answer2: [
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
      ],
      solution1: [
        ['3', '6', '12', '24'],
        ['5', '10', '20', '40'],
        ['6', '12', '24', '48'],
      ],
      solution2: [
        ['0', '10', '14', '18'],
        ['0', '25', '35', '45'],
        ['0', '40', '56', '72'],
      ],
      isCorrect: false,
      isSubmitted: false,
    },
    P05: {
      answer1: '',
      answer2: '',
      solution1_1: '8×4=32',
      solution1_2: '4×8=32',
      solution1_3: '4×8',
      solution1_4: '8×4',
      solution2: '32',
      isSubmitted: false,
      isCorrect: false,
    },
    P06: {
      answer1: '',
      answer2: '',
      answer3: '',
      solution1: '4×5',
      solution2: '5×3',
      solution3: '3×4',
      isCorrect: false,
      isSubmitted: false,
    },
    P07: {
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      partCorrect: false,
      solution1: '4',
      solution2: '7',
      solution3: '4',
      solution4: '28',
      isCorrect: false,
      isSubmitted: false,
    },
    P08: {
      answer1: ['', '', '', '', '', '', '', '', ''],
      answer2: ['', '', '', '', '', '', '', '', ''],
      solution1: ['0', '6', '12', '0', '12', '24', '0', '24', '48'],
      solution2: ['3', '15', '27', '6', '30', '54', '7', '35', '63'],
      isCorrect: false,
      isSubmitted: false,
    },
    P09: {
      answer1: '',
      answer2: '',
      solution1: ['9×5=45', '5×9=45', '5×9', '9×5'],
      solution2: '45',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TA04000105 = {
  P02: {
    answer1: string;
    answer2: string;
    solution1: string;
    solution2: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  P03: {
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
    solution1: string;
    solution2_1: string;
    solution2_2: string;
    solution3_1: string;
    solution3_2: string;
    solution4: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  P04: {
    answer1: string[][];
    answer2: string[][];
    solution1: string[][];
    solution2: string[][];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  P05: {
    answer1: string;
    answer2: string;
    solution1_1: string;
    solution1_2: string;
    solution1_3: string;
    solution1_4: string;
    solution2: string;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
  P06: {
    answer1: string;
    answer2: string;
    answer3: string;
    solution1: string;
    solution2: string;
    solution3: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  P07: {
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
    partCorrect: boolean;
    solution1: string;
    solution2: string;
    solution3: string;
    solution4: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  P08: {
    answer1: string[];
    answer2: string[];
    solution1: string[];
    solution2: string[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  P09: {
    answer1: string;
    answer2: string;
    solution1: string[];
    solution2: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
