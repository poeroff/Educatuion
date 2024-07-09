import { atom } from 'recoil';

export const A01_0006_04 = atom<TA01000604>({
  key: 'A01000604',
  default: {
    p01: {
      answer: '',
      solution: '317-172',
      commentary: '(도서관에 남은 책 수)=(도서관 전체 책 수)-(친구들이 빌려간 책 수)=317-172',
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      data: [
        { answer: '', solution: '1' },
        { answer: '', solution: '4' },
        { answer: '', solution: '5' },
      ],
      isSubmitted: false,
      disabled: true,
    },
    p03: {
      answer1: '',
      answer2: '',
      answer3: '',
      solution1: '317',
      solution2: '172',
      solution3: '145',
      commentary: '317-172=145이므로 도서관에 남은 책 수는 145권입니다.',
      isCorrect: false,
      isCorrect1: false,
      isCorrect2: false,
      isCorrect3: false,
      isSubmitted: false,
      disabled: true,
    },
  },
});

type TA01000604 = {
  p01: {
    answer: string;
    solution: string;
    commentary: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p02: {
    data: IP02Data[];
    isSubmitted: boolean;
    disabled: boolean;
  };
  p03: {
    answer1: string;
    answer2: string;
    answer3: string;
    solution1: string;
    solution2: string;
    solution3: string;
    commentary: string;
    isCorrect: boolean;
    isCorrect1: boolean;
    isCorrect2: boolean;
    isCorrect3: boolean;
    isSubmitted: boolean;
    disabled: boolean;
  };
};

interface IP02Data {
  answer: string;
  solution: string;
}
