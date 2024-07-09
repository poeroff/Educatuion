import { IChipButtonInfo } from '@maidt-cntn/ui/en';
import { atom } from 'recoil';

export const L02SP01_2 = atom({
  key: 'L02SP01_2',
  default: {
    p05: {
      answer: -1,
      solution: 3,
      isCorrect: false,
      isSubmitted: false,
      words: ['개인의', '합리적인', '경솔하게'],
    },
    p06: {
      answer: -1,
      solution: 1,
      isCorrect: false,
      isSubmitted: false,
      words: ['~을 신청하다', '경솔하게', '전체의'],
    },
    p09: {
      answer: '',
      solution: 'private',
      isCorrect: false,
      isSubmitted: false,
    },
    p10: {
      answer: '',
      solution: 'ingredient',
      isCorrect: false,
      isSubmitted: false,
    },
    p15: {
      answers: ['', '', ''],
      solutions: ['carelessly', 'manage', 'reasonable'],
      dropdownList: [
        ['carelessly', 'carefully'],
        ['make', 'manage'],
        ['remarkable', 'reasonable'],
      ],
      isCorrect: false,
      isSubmitted: false,
    },

    p16: {
      answers: ['', '', ''],
      solutions: ['popular', 'reputation', 'challenging'],
      dropdownList: [
        ['particular', 'popular'],
        ['reputation', 'reliability'],
        ['challenging', 'difficult'],
      ],
      isCorrect: false,
      isSubmitted: false,
    },

    p19: {
      answer: [] as number[],
      solution: [
        {
          text: 'not happy',
          answer: 0,
          isError: false,
        },
        {
          text: 'taking',
          answer: 4,
          isError: false,
        },
        {
          text: 'the one',
          answer: 2,
          isError: false,
        },
        {
          text: 'with',
          answer: 1,
          isError: false,
        },
        {
          text: 'I’m',
          answer: 3,
          isError: false,
        },
      ] as IChipButtonInfo[],
      isCorrect: false,
      isSubmitted: false,
    },

    p20: {
      answer: [] as number[],
      solution: [
        {
          text: 'you can',
          answer: 0,
          isError: false,
        },
        {
          text: 'for',
          answer: 3,
          isError: false,
        },
        {
          text: 'the entire set',
          answer: 2,
          isError: false,
        },
        {
          text: 'only 30 dollars',
          answer: 4,
          isError: false,
        },
        {
          text: 'receive',
          answer: 1,
          isError: false,
        },
      ] as IChipButtonInfo[],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
