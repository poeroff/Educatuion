import { atom } from 'recoil';
export const B03_0004_60 = atom({
  key: 'B03000460',
  default: {
    p01: {
      answer1: ['', '', '', '', '', ''],
      answer2: ['', '', '', '', '', ''],
      solution1: [
        ['6', '8', '48', '8', '6', '48'],
        ['8', '6', '48', '6', '8', '48'],
      ],
      solution2: [
        ['48', '6', '8', '48', '8', '6'],
        ['48', '8', '6', '48', '6', '8'],
      ],
      isCorrect1: false,
      isCorrect2: false,
      isAllCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer1: ['', '', '', '', '', ''],
      answer2: ['', '', '', '', '', ''],
      solution1: [
        ['24', '8', '3', '24', '3', '8'],
        ['24', '3', '8', '24', '8', '3'],
      ],
      solution2: [
        ['8', '7', '56', '7', '8', '56'],
        ['7', '8', '56', '8', '7', '56'],
      ],
      isCorrect1: false,
      isCorrect2: false,
      isAllCorrect: false,
      isSubmitted: false,
    },
  },
});

export default B03_0004_60;
