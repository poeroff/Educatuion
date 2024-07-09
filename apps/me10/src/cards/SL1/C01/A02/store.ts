import { atom } from 'recoil';

export const SL1C01A02 = atom({
  key: 'SL1C01A02',
  default: {
    p01: [
      { id: 1, word: 'be born', meaning: '태어나다', isMemorized: false },
      { id: 2, word: 'real', meaning: '진짜의, 실제의', isMemorized: false },
      { id: 3, word: 'period', meaning: '시대, 시기', isMemorized: false },
      { id: 4, word: 'lonely', meaning: '외로운', isMemorized: false },
      { id: 5, word: 'poor', meaning: '가난한, 불쌍한', isMemorized: false },
      { id: 6, word: 'happiness', meaning: '행복', isMemorized: false },
      { id: 7, word: 'rose', meaning: '장밋빛의, 장미', isMemorized: false },
      { id: 8, word: 'a few', meaning: '몇몇의, 약간의', isMemorized: false },
      { id: 9, word: 'begin', meaning: '시작하다', isMemorized: false },
      { id: 10, word: 'front', meaning: '정면', isMemorized: false },
      { id: 11, word: 'side', meaning: '옆면', isMemorized: false },
      { id: 12, word: 'fat', meaning: '뚱뚱한', isMemorized: false },
      { id: 13, word: 'order', meaning: '주문', isMemorized: false },
      { id: 14, word: 'until', meaning: '~까지', isMemorized: false },
    ],
    p02: [
      { id: 1, word: 'be born', meaning: '태어나다', meaningOrder: 5, isCorrect: false },
      { id: 2, word: 'happiness', meaning: '행복', meaningOrder: 6, isCorrect: false },
      { id: 3, word: 'order', meaning: '주문', meaningOrder: 2, isCorrect: false },
      { id: 4, word: 'side', meaning: '옆면', meaningOrder: 10, isCorrect: false },
      { id: 5, word: 'period', meaning: '시대, 시기', meaningOrder: 7, isCorrect: false },
      { id: 6, word: 'fat', meaning: '뚱뚱한', meaningOrder: 4, isCorrect: false },
      { id: 7, word: 'lonely', meaning: '외로운', meaningOrder: 1, isCorrect: false },
      { id: 8, word: 'begin', meaning: '시작하다', meaningOrder: 9, isCorrect: false },
      { id: 9, word: 'until', meaning: '~까지', meaningOrder: 3, isCorrect: false },
      { id: 10, word: 'front', meaning: '정면', meaningOrder: 8, isCorrect: false },
    ],
  },
});
