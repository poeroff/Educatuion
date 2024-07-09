import { atom } from 'recoil';

export const A01_0002_04 = atom<TA01_0002_04>({
  key: 'A01000204',
  default: {
    p01: {
      answer: {
        value1: '',
      },
      solution: [{ value1: '351+246' }, { value1: '246+351' }],
      commentary:
        '$(드론이\\:배달한\\:물건\\:수)=(드론이\\:사랑\\:마을로\\:배달한\\:물건\\:수)+(드론이\\:행복\\:마을로\\:배달한\\:물건\\:수)=351+246$',
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer: {
        value1: '',
        value2: '',
        value3: '',
      },
      solution: [{ value1: '5', value2: '9', value3: '7' }],
      commentary:
        '- 백 모형은 3개와 2개이므로 모두 5개입니다.\n' +
        '- 십 모형은 5개와 4개이므로 모두 9개입니다.\n' +
        '- 일 모형은 1개와 6개이므로 모두 7개입니다.',
      isCorrect: [false, false, false],
      isSubmitted: false,
    },
    p03: {
      answer: {
        value1: '',
        value2: '',
        value3: '',
      },
      solution: [
        { value1: '351', value2: '246', value3: '597' },
        { value1: '246', value2: '351', value3: '597' },
      ],
      commentary: '$351+246=597$ 이므로 드론으로 배달한 물건 수는 597개입니다.',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TA01_0002_04 = {
  p01: {
    answer: { [key: string]: string };
    solution: { [key: string]: string }[];
    commentary: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p02: {
    answer: { [key: string]: string };
    solution: { [key: string]: string }[];
    commentary: string;
    isCorrect: boolean[];
    isSubmitted: boolean;
  };
  p03: {
    answer: { [key: string]: string };
    solution: { [key: string]: string }[];
    commentary: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
