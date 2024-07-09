import { atom } from 'recoil';

export const L01C07A03 = atom<TL01C07A03>({
  key: 'L01C07A03',
  default: {
    p02: {
      dropArr: [['ability', 'friendliness']],
      answer: [''],
      solution: ['friendliness'],
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      dropArr: [['anthropologist', 'biologist']],
      answer: [''],
      solution: ['biologist'],
      isCorrect: false,
      isSubmitted: false,
    },
    p04: {
      dropArr: [
        ['different', 'common'],
        ['wolves', 'dogs'],
      ],
      answer: ['', ''],
      solution: ['common', 'dogs'],
      isCorrect: false,
      isSubmitted: false,
    },
    p05: {
      dropArr: [
        ['similar', 'different'],
        ['similar', 'different'],
      ],
      answer: ['', ''],
      solution: ['similar', 'different'],
      isCorrect: false,
      isSubmitted: false,
    },
    p06: {
      dropArr: [
        ['better', 'worse'],
        ['Neanderthals', 'Homosapiens'],
      ],
      answer: ['', ''],
      solution: ['better', 'Neanderthals'],
      isCorrect: false,
      isSubmitted: false,
    },
    p07: {
      dropArr: [['broadcast', 'lecture']],
      answer: [''],
      solution: ['lecture'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL01C07A03 = {
  p02: IL01C07A03;
  p03: IL01C07A03;
  p04: IL01C07A03;
  p05: IL01C07A03;
  p06: IL01C07A03;
  p07: IL01C07A03;
};

interface IL01C07A03 {
  dropArr: string[][];
  answer: (string | undefined)[];
  solution: string[];
  isCorrect: boolean;
  isSubmitted: boolean;
}
