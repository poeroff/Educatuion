import { IChipButtonInfo } from '@maidt-cntn/ui/en';
import { atom } from 'recoil';

export const L03SP01_2 = atom({
  key: 'L03SP01_2',
  default: {
    p05: {
      answer: -1,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
      words: ['산만하게 하다', '깊은 인상을 주다', '생각나게 하다'],
    },
    p06: {
      answer: -1,
      solution: 1,
      isCorrect: false,
      isSubmitted: false,
      words: ['~을 생각나게 하다', '산만하게 하다', '마음을 사로잡다'],
    },
    p09: {
      answer: '',
      solution: 'captivate',
      isCorrect: false,
      isSubmitted: false,
    },
    p10: {
      answer: '',
      solution: 'magnificent',
      isCorrect: false,
      isSubmitted: false,
    },
    p15: {
      answers: ['', '', ''],
      solutions: ['wrist', 'safety', 'entrance'],
      dropdownList: [
        ['hand', 'wrist'],
        ['safety', 'security'],
        ['entrance', 'food stands'],
      ],
      isCorrect: false,
      isSubmitted: false,
    },

    p16: {
      answers: ['', '', ''],
      solutions: ['enjoyable', 'silence', 'distract'],
      dropdownList: [
        ['amazing', 'enjoyable'],
        ['show', 'silence'],
        ['disturb', 'distract'],
      ],
      isCorrect: false,
      isSubmitted: false,
    },

    p19: {
      answer: [] as number[],
      solution: [
        {
          text: 'to check',
          answer: 2,
          isError: false,
        },
        {
          text: 'the nearest',
          answer: 3,
          isError: false,
        },
        {
          text: 'a moment',
          answer: 1,
          isError: false,
        },
        {
          text: 'take',
          answer: 0,
          isError: false,
        },
        {
          text: 'emergency exits',
          answer: 4,
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
          text: 'made',
          answer: 3,
          isError: false,
        },
        {
          text: 'outside',
          answer: 4,
          isError: false,
        },
        {
          text: 'any',
          answer: 0,
          isError: false,
        },
        {
          text: 'be',
          answer: 2,
          isError: false,
        },
        {
          text: 'phone calls',
          answer: 1,
          isError: false,
        },
      ] as IChipButtonInfo[],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
