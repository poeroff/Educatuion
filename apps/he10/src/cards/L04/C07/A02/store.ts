import { atom } from 'recoil';

export const L04C07A02 = atom<TL04C07A02>({
  key: 'L04C07A02',
  default: {
    p02: {
      dropArr1: ['fabrics', 'circular', 'incinerated', 'disposed of'],
      answer: [''],
      solution: ['disposed of'],
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      dropArr1: ['fabrics', 'circular', 'incinerated', 'disposed of'],
      dropArr2: ['reuse', 'fertilizer', 'methane', 'governments'],
      answer: ['', ''],
      solution: ['incinerated', 'methane'],
      isCorrect: false,
      isSubmitted: false,
    },
    p04: {
      dropArr1: ['fabrics', 'circular', 'incinerated', 'disposed of'],
      dropArr2: ['reuse', 'fertilizer', 'methane', 'governments'],
      answer: ['', '', ''],
      solution: ['circular', 'reuse', 'governments'],
      isCorrect: false,
      isSubmitted: false,
    },
    p05: {
      dropArr1: ['fabrics', 'circular', 'incinerated', 'disposed of'],
      dropArr2: ['reuse', 'fertilizer', 'methane', 'governments'],
      answer: ['', ''],
      solution: ['fertilizer', 'fabrics'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL04C07A02 = {
  p02: IL04C07A02;
  p03: IL04C07A02;
  p04: IL04C07A02;
  p05: IL04C07A02;
};

interface IL04C07A02 {
  dropArr1: string[];
  dropArr2?: string[];
  answer: (string | undefined)[];
  solution: string[];
  isCorrect: boolean;
  isSubmitted: boolean;
}
