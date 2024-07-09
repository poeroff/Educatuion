import { atom } from 'recoil';

const L04SP041State = atom<TL04SP0401>({
  key: 'L04SP041State',
  default: {
    p05: {
      answer: 0,
      isSubmitted: false,
      solution : 3,
      isCorrect: false,
    },
    p06: {
      answer: 0,
      isSubmitted: false,
      solution : 2,
      isCorrect: false,
    },
    p07: {
      answer: '',
      isSubmitted: false,
      solution: [
        'This technology is not only used in mobile devices but also applied to medical field.',
      ],
      isCorrect: false,

    },
    p08: {
      answer: '',
      isSubmitted: false,
      solution: [
        'She told her grandson to eat neither cookies nor chocolate before lunch.',
      ],
      isCorrect: false,
    },
    p09: {
      answer: 0,
      solution: 3,
      isCorrect: false,
      isSubmitted: false,
    },
    p10: {
      answer: 0,
      solution: 4,
      isCorrect: false,
      isSubmitted: false,
    },
    p11: {
      answer: 0,
      solution: 1,
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL04SP0401 = {
  [key: string]: any;
  p05: {
    answer: number;
    isSubmitted: boolean;
    solution: number
    isCorrect: boolean,

  };
  p06: {
    answer: number;
    isSubmitted: boolean;
    solution: number
    isCorrect: boolean,

  };
  p07: {
    answer: string;
    isSubmitted: boolean;
    isCorrect: boolean,
    solution: string[]
  };
  p08: {
    answer: string;
    isSubmitted: boolean;
    isCorrect: boolean,
    solution: string[]
  };
  p09: {
    answer: number;
    isSubmitted: boolean;
    solution: number;
    isCorrect: boolean,
  };
  p10: {
    answer: number;
    isSubmitted: boolean;
    solution: number
    isCorrect: boolean,
  };
  p11: {
    answer: number;
    isSubmitted: boolean;
    solution: number
    isCorrect: boolean,
  };

};

export default L04SP041State;
