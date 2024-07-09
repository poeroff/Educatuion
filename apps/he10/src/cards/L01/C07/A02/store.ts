import { atom } from 'recoil';

export const L01C07A02 = atom<TL01C07A02>({
  key: 'L01C07A02',
  default: {
    p02: {
      dropArr: ['failed', 'smaller', 'ignoring', 'success'],
      dropArr2: ['adapted', 'exchanging', 'cooperative', 'communicative'],
      answer: ['', ''],
      solution: ['ignoring', 'communicative'],
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      dropArr: ['failed', 'smaller', 'ignoring', 'success'],
      dropArr2: ['adapted', 'exchanging', 'cooperative', 'communicative'],
      answer: ['', ''],
      solution: ['failed', 'cooperative'],
      isCorrect: false,
      isSubmitted: false,
    },
    p04: {
      dropArr: ['failed', 'smaller', 'ignoring', 'success'],
      dropArr2: ['adapted', 'exchanging', 'cooperative', 'communicative'],
      dropArr3: ['adapted', 'exchanging', 'cooperative', 'communicative'],
      answer: ['', '', ''],
      solution: ['smaller', 'exchanging', 'adapted'],
      isCorrect: false,
      isSubmitted: false,
    },
    p05: {
      dropArr: ['failed', 'smaller', 'ignoring', 'success'],
      answer: [''],
      solution: ['success'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL01C07A02 = {
  p02: IL01C07A02;
  p03: IL01C07A02;
  p04: IL01C07A02;
  p05: IL01C07A02;
};

interface IL01C07A02 {
  dropArr: string[];
  dropArr2?: string[];
  dropArr3?: string[];
  answer: (string | undefined)[];
  solution: string[];
  isCorrect: boolean;
  isSubmitted: boolean;
}
