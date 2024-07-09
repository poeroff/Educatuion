import { atom } from 'recoil';

export const A01_0006_04_store = atom({
  key: 'A01_0006_04',
  default: {
    p01: {
      data: [{ answer: '', solution: '325-168' }],
      commentary: '325 - 168 입니다.',
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      data: [
        { answer: '', solution: '1' },
        { answer: '', solution: '5' },
        { answer: '', solution: '7' },
      ],
      commentary: '',
      isCorrect: false,
      isSubmitted: false,
      disabled: true,
    },
    p03: {
      data: [
        { answer: '', solution: '325' },
        { answer: '', solution: '168' },
        { answer: '', solution: '157' },
      ],
      commentary: '',
      isCorrect: false,
      isSubmitted: false,
      disabled: true,
    },
  },
});
