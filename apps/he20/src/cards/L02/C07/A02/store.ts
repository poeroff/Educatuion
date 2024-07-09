import { atom } from 'recoil';

export const L02C07A02 = atom<TL02C07A02>({
  key: 'L02C07A02',
  default: {
    p02: {
      dropArr1: ['ban', 'conditions', 'unintended', 'competition'],
      answer: [''],
      solution: ['competition'],
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      dropArr1: ['cautious', 'awareness', 'manipulate', 'documenting'],
      dropArr2: ['ban', 'conditions', 'unintended', 'competition'],
      answer: ['', ''],
      solution: ['manipulate', 'unintended'],
      isCorrect: false,
      isSubmitted: false,
    },
    p04: {
      dropArr1: ['cautious', 'awareness', 'manipulate', 'documenting'],
      dropArr2: ['ban', 'conditions', 'unintended', 'competition'],
      answer: ['', ''],
      solution: ['documenting', 'ban'],
      isCorrect: false,
      isSubmitted: false,
    },
    p05: {
      dropArr1: ['cautious', 'awareness', 'manipulate', 'documenting'],
      dropArr2: ['ban', 'conditions', 'unintended', 'competition'],
      dropArr3: ['cautious', 'awareness', 'manipulate', 'documenting'],
      answer: ['', '', ''],
      solution: ['cautious', 'conditions', 'awareness'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL02C07A02 = {
  p02: IL02C07A02;
  p03: IL02C07A02;
  p04: IL02C07A02;
  p05: IL02C07A02;
};

interface IL02C07A02 {
  dropArr1: string[];
  dropArr2?: string[];
  dropArr3?: string[];
  answer: (string | undefined)[];
  solution: string[];
  isCorrect: boolean;
  isSubmitted: boolean;
}
